// ============================================
// BeatForge AI - Seekable Music Player v3.0
// Uses pre-rendered AudioBuffer for real seeking
// ============================================

import { ProceduralMusicGenerator, GENRE_CONFIGS, MUSIC_THEORY } from './music-engine.js';
import { AudioRenderer } from './audio-renderer.js';

/**
 * SeekableMusicPlayer - Professional player with real seek capability
 */
export class SeekableMusicPlayer {
    constructor(options = {}) {
        this.options = {
            genre: options.genre || 'Lo-Fi Hip Hop',
            onTimeUpdate: options.onTimeUpdate || null,
            onEnded: options.onEnded || null,
            onError: options.onError || null,
            onLoading: options.onLoading || null,
            onReady: options.onReady || null,
            ...options
        };

        // Audio context
        this.ctx = null;
        this.masterGain = null;
        this.analyser = null;

        // Current playback
        this.source = null;
        this.audioBuffer = null;
        this.currentTrack = null;

        // State
        this.isPlaying = false;
        this.isPaused = false;
        this.isLoading = false;
        this.startTime = 0;
        this.pauseTime = 0;
        this.playbackOffset = 0;

        // Timing
        this.duration = 0;
        this.volume = 0.7;
        this.updateInterval = null;

        // Engines
        this.generator = new ProceduralMusicGenerator();
        this.renderer = new AudioRenderer();

        // Variation seeds for unique tracks
        this.variationSeeds = new Map();

        this.initialized = false;
    }

    /**
     * Initialize audio context and engines
     */
    async init() {
        if (this.initialized) return;

        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();

            // Master gain
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = this.volume;

            // Analyser for visualizations
            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 256;
            this.analyser.smoothingTimeConstant = 0.8;

            // Connect chain
            this.masterGain.connect(this.analyser);
            this.analyser.connect(this.ctx.destination);

            // Initialize renderer
            await this.renderer.init();

            this.initialized = true;
            console.log('🎵 SeekableMusicPlayer ready');

        } catch (error) {
            console.error('Player init failed:', error);
            if (this.options.onError) {
                this.options.onError(error);
            }
            throw error;
        }
    }

    /**
     * Generate unique variation seed for a track
     */
    getVariationSeed(trackId) {
        if (!this.variationSeeds.has(trackId)) {
            const seed = this.createVariationSeed();
            this.variationSeeds.set(trackId, seed);
        }
        return this.variationSeeds.get(trackId);
    }

    createVariationSeed() {
        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
            const arr = new Uint32Array(2);
            window.crypto.getRandomValues(arr);
            return `${arr[0].toString(16)}-${arr[1].toString(16)}`;
        }
        return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    /**
     * Normalize genre name
     */
    normalizeGenre(genre) {
        const genreMap = {
            'lo-fi hip hop': 'Lo-Fi Hip Hop',
            'lofi': 'Lo-Fi Hip Hop',
            'lo-fi': 'Lo-Fi Hip Hop',
            'synthwave': 'Synthwave',
            'retrowave': 'Synthwave',
            'trap': 'Trap',
            'ambient': 'Ambient',
            'techno': 'Techno',
            'reggaeton': 'Reggaeton',
            'indie': 'Indie Electronic',
            'indie electronic': 'Indie Electronic',
            'cyberpunk': 'Cyberpunk',
            'jazz hop': 'Jazz Hop',
            'jazzhop': 'Jazz Hop',
            'cinematic': 'Cinematic',
            'house': 'House',
            'drum and bass': 'Drum and Bass',
            'dnb': 'Drum and Bass'
        };

        const normalized = genre.toLowerCase();
        return genreMap[normalized] || (GENRE_CONFIGS[genre] ? genre : 'Lo-Fi Hip Hop');
    }

    /**
     * Play a track
     */
    async play(track) {
        if (!this.initialized) {
            await this.init();
        }

        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

        // Stop current playback
        this.stop();

        this.isLoading = true;
        if (this.options.onLoading) {
            this.options.onLoading(true);
        }

        try {
            // Normalize genre
            const genre = this.normalizeGenre(this.options.genre);

            // Get or create variation seed
            const songId = track.title.toLowerCase().replace(/\s+/g, '-');
            const variationSeed = this.getVariationSeed(songId);

            // Generate song data
            const songData = this.generator.generateSong(songId, genre, track.title, {
                variationSeed,
                humanize: 0.015
            });

            // Add pad patterns for ambient sections
            songData.patterns.pads = this.generatePadPattern(songData);

            // Render to AudioBuffer
            this.audioBuffer = await this.renderer.renderSong(songData);
            this.duration = this.audioBuffer.duration;
            this.currentTrack = track;
            this.playbackOffset = 0;

            // Start playback
            this.startPlayback(0);

            this.isLoading = false;
            if (this.options.onLoading) {
                this.options.onLoading(false);
            }
            if (this.options.onReady) {
                this.options.onReady(songData);
            }

            console.log(`▶️ Playing: ${track.title} (${genre}, ${songData.bpm} BPM, ${this.duration.toFixed(1)}s)`);

        } catch (error) {
            this.isLoading = false;
            console.error('Play failed:', error);
            if (this.options.onError) {
                this.options.onError(error);
            }
            throw error;
        }
    }

    /**
     * Generate pad patterns for ambient sections
     */
    generatePadPattern(song) {
        const pattern = [];
        const keyFreq = 440 * Math.pow(2, (MUSIC_THEORY?.notes?.indexOf(song.key) || 0 - 9) / 12);
        const baseOctave = 3;
        const frequencies = [
            keyFreq * Math.pow(2, (baseOctave - 4)),
            keyFreq * Math.pow(2, (baseOctave - 4)) * 1.5,
            keyFreq * Math.pow(2, (baseOctave - 3))
        ];

        // One pad per 2 bars
        for (let bar = 0; bar < 4; bar += 2) {
            pattern.push({
                beat: bar * 8,
                frequencies,
                duration: 4 * (60 / song.bpm) // 4 beats duration
            });
        }

        return pattern;
    }

    /**
     * Start playback from offset
     */
    startPlayback(offset = 0) {
        if (!this.audioBuffer) return;

        // Disconnect previous source
        if (this.source) {
            try {
                this.source.stop();
                this.source.disconnect();
            } catch (e) {}
        }

        // Create new source
        this.source = this.ctx.createBufferSource();
        this.source.buffer = this.audioBuffer;
        this.source.connect(this.masterGain);

        // Handle track end
        this.source.onended = () => {
            if (this.isPlaying && !this.isPaused) {
                this.handleEnded();
            }
        };

        // Start from offset
        this.playbackOffset = Math.max(0, Math.min(offset, this.duration));
        this.startTime = this.ctx.currentTime - this.playbackOffset;
        this.source.start(0, this.playbackOffset);

        this.isPlaying = true;
        this.isPaused = false;

        // Start time updates
        this.startTimeUpdates();
    }

    /**
     * Start periodic time updates
     */
    startTimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        this.updateInterval = setInterval(() => {
            if (!this.isPlaying || this.isPaused) return;

            const currentTime = this.getCurrentTime();
            if (this.options.onTimeUpdate) {
                this.options.onTimeUpdate(currentTime, this.duration);
            }
        }, 50); // 20 FPS updates
    }

    /**
     * Handle track end
     */
    handleEnded() {
        this.isPlaying = false;
        this.isPaused = false;
        this.playbackOffset = 0;

        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }

        if (this.options.onEnded) {
            this.options.onEnded();
        }
    }

    /**
     * Pause playback
     */
    pause() {
        if (!this.isPlaying || this.isPaused) return;

        // Store current position
        this.pauseTime = this.getCurrentTime();

        // Stop source
        if (this.source) {
            try {
                this.source.stop();
                this.source.disconnect();
            } catch (e) {}
        }

        this.isPaused = true;
        this.isPlaying = false;

        console.log('⏸️ Paused at', this.pauseTime.toFixed(2) + 's');
    }

    /**
     * Resume playback
     */
    resume() {
        if (!this.isPaused || !this.audioBuffer) return;

        // Resume from pause position
        this.startPlayback(this.pauseTime);
        
        console.log('▶️ Resumed from', this.pauseTime.toFixed(2) + 's');
    }

    /**
     * Stop playback
     */
    stop() {
        this.isPlaying = false;
        this.isPaused = false;
        this.playbackOffset = 0;
        this.pauseTime = 0;

        if (this.source) {
            try {
                this.source.stop();
                this.source.disconnect();
            } catch (e) {}
            this.source = null;
        }

        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    /**
     * Seek to position
     * @param {number} position - Position in seconds, or ratio (0-1) if <= 1
     */
    seek(position) {
        if (!this.audioBuffer) return;

        // Convert ratio to seconds if needed
        const targetTime = position <= 1 ? position * this.duration : position;
        const clampedTime = Math.max(0, Math.min(targetTime, this.duration - 0.1));

        console.log(`⏩ Seeking to ${clampedTime.toFixed(2)}s`);

        // Restart playback from new position
        this.startPlayback(clampedTime);

        // Immediate time update
        if (this.options.onTimeUpdate) {
            this.options.onTimeUpdate(clampedTime, this.duration);
        }
    }

    /**
     * Skip forward/backward
     */
    skip(seconds) {
        const current = this.getCurrentTime();
        const newTime = Math.max(0, Math.min(current + seconds, this.duration - 0.1));
        this.seek(newTime);
    }

    /**
     * Get current playback time
     */
    getCurrentTime() {
        if (this.isPaused) {
            return this.pauseTime;
        }
        if (!this.isPlaying) {
            return 0;
        }
        return Math.min(this.ctx.currentTime - this.startTime, this.duration);
    }

    /**
     * Get duration
     */
    getDuration() {
        return this.duration;
    }

    /**
     * Set volume (0-1)
     */
    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        if (this.masterGain) {
            this.masterGain.gain.value = this.volume;
        }
    }

    /**
     * Get volume
     */
    getVolume() {
        return this.volume;
    }

    /**
     * Get analyser data for visualizations
     */
    getAnalyserData() {
        if (!this.analyser) return null;

        const data = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(data);
        return data;
    }

    /**
     * Get playing state
     */
    getIsPlaying() {
        return this.isPlaying;
    }

    /**
     * Get paused state
     */
    getIsPaused() {
        return this.isPaused;
    }

    /**
     * Get loading state
     */
    getIsLoading() {
        return this.isLoading;
    }

    /**
     * Get current track
     */
    getCurrentTrack() {
        return this.currentTrack;
    }

    /**
     * Force regenerate a track (new variation)
     */
    regenerateTrack(track) {
        const songId = track.title.toLowerCase().replace(/\s+/g, '-');
        // Create new seed
        this.variationSeeds.set(songId, this.createVariationSeed());
        // Clear cache for this track
        return this.play(track);
    }

    /**
     * Clean up resources
     */
    destroy() {
        this.stop();
        this.renderer.clearCache();

        if (this.ctx) {
            this.ctx.close();
            this.ctx = null;
        }

        this.initialized = false;
    }
}

// Also export the old name for backwards compatibility
export { SeekableMusicPlayer as MusicPlayer };

/**
 * Format time as MM:SS
 */
export function formatTime(seconds) {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default SeekableMusicPlayer;

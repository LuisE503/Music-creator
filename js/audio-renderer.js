// ============================================
// BeatForge AI - Offline Audio Renderer v4.0
// Professional-grade synthesis with authentic sounds
// Pre-renders songs to AudioBuffer for real seek
// ============================================

import { MUSIC_THEORY, GENRE_CONFIGS, SeededRandom, noteToFrequency } from './music-engine.js';
import { 
    AUTHENTIC_DRUM_PATTERNS, 
    INSTRUMENT_PRESETS,
    FAMOUS_PROGRESSIONS 
} from './music-theory-advanced.js';

/**
 * AudioRenderer - Pre-renders procedural music to AudioBuffer
 * Allows real seeking, scrubbing, and consistent playback
 */
export class AudioRenderer {
    constructor() {
        this.ctx = null;
        this.offlineCtx = null;
        this.sampleRate = 44100;
        this.channels = 2;
        
        // Cached rendered songs
        this.cache = new Map();
        this.maxCacheSize = 5;
        
        // Progress callback
        this.onRenderProgress = null;
    }

    /**
     * Initialize the live audio context
     */
    async init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        console.log('🎵 AudioRenderer initialized');
    }

    /**
     * Create unique cache key for a song
     */
    getCacheKey(songId, genre, variationSeed) {
        return `${songId}-${genre}-${variationSeed}`;
    }

    /**
     * Render a song to AudioBuffer (offline)
     */
    async renderSong(songData, options = {}) {
        const cacheKey = this.getCacheKey(songData.id, songData.genre, songData.variationSeed);
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            console.log(`📀 Using cached audio for: ${songData.title}`);
            return this.cache.get(cacheKey);
        }

        console.log(`🎼 Rendering: ${songData.title} (${songData.duration.toFixed(1)}s)`);
        const startTime = performance.now();

        // Create offline context
        const length = Math.ceil(this.sampleRate * songData.duration);
        this.offlineCtx = new OfflineAudioContext(this.channels, length, this.sampleRate);

        // Create audio graph
        const masterGain = this.offlineCtx.createGain();
        masterGain.gain.value = 0.7;

        const compressor = this.offlineCtx.createDynamicsCompressor();
        compressor.threshold.value = -18;
        compressor.knee.value = 20;
        compressor.ratio.value = 6;
        compressor.attack.value = 0.003;
        compressor.release.value = 0.15;

        // Reverb
        const convolver = await this.createReverb(this.offlineCtx, 2.5, 2);
        const reverbGain = this.offlineCtx.createGain();
        reverbGain.gain.value = songData.config.reverb || 0.3;

        // Delay
        const delayNode = this.offlineCtx.createDelay(1);
        delayNode.delayTime.value = 60 / songData.bpm / 2; // 8th note delay
        const delayGain = this.offlineCtx.createGain();
        delayGain.gain.value = songData.config.delay || 0.2;
        const delayFeedback = this.offlineCtx.createGain();
        delayFeedback.gain.value = 0.3;

        // Connect effects chain
        convolver.connect(reverbGain);
        reverbGain.connect(compressor);
        
        delayNode.connect(delayGain);
        delayGain.connect(delayNode); // Feedback loop
        delayGain.connect(compressor);

        compressor.connect(masterGain);
        masterGain.connect(this.offlineCtx.destination);

        // Create noise buffer for drums
        const noiseBuffer = this.createNoiseBuffer(this.offlineCtx, 2);

        // Schedule all notes
        await this.scheduleAllNotes(songData, {
            ctx: this.offlineCtx,
            compressor,
            convolver,
            delayNode,
            noiseBuffer
        });

        // Render
        const renderedBuffer = await this.offlineCtx.startRendering();
        
        const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
        console.log(`✅ Rendered ${songData.title} in ${elapsed}s`);

        // Cache management
        if (this.cache.size >= this.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(cacheKey, renderedBuffer);

        return renderedBuffer;
    }

    /**
     * Schedule all notes for the song
     */
    async scheduleAllNotes(song, nodes) {
        const { ctx, compressor, convolver, delayNode, noiseBuffer } = nodes;
        const stepsPerBeat = 2;
        const stepDuration = 60 / song.bpm / stepsPerBeat;
        const totalSteps = song.structure.reduce((acc, s) => acc + s.bars * 8, 0);
        
        let currentSectionIndex = 0;
        let sectionStartStep = 0;
        let section = song.structure[0];

        for (let step = 0; step < totalSteps; step++) {
            // Update section
            while (currentSectionIndex < song.structure.length - 1) {
                const nextSectionStart = sectionStartStep + song.structure[currentSectionIndex].bars * 8;
                if (step >= nextSectionStart) {
                    sectionStartStep = nextSectionStart;
                    currentSectionIndex++;
                    section = song.structure[currentSectionIndex];
                } else break;
            }

            // Calculate time with swing
            let time = step * stepDuration;
            if (step % 2 === 1 && song.swing > 0) {
                time += stepDuration * song.swing * 0.5;
            }

            // Humanize
            if (song.humanize) {
                time += (Math.random() - 0.5) * song.humanize * 2;
                time = Math.max(0, time);
            }

            const intensity = section.intensity;
            const patternBeat = step % 32;

            // Drums
            const drums = song.patterns.drums;
            if (drums.kick[patternBeat] > 0) {
                this.renderKick(ctx, compressor, time, drums.kick[patternBeat] * intensity, song.config);
            }
            if (drums.snare[patternBeat] > 0) {
                this.renderSnare(ctx, compressor, convolver, noiseBuffer, time, drums.snare[patternBeat] * intensity, song.config);
            }
            if (drums.hihat[patternBeat] > 0 && section.type !== 'intro') {
                this.renderHiHat(ctx, compressor, noiseBuffer, time, drums.hihat[patternBeat] * intensity, song.config);
            }
            if (drums.perc[patternBeat] > 0) {
                this.renderPerc(ctx, compressor, convolver, noiseBuffer, time, drums.perc[patternBeat] * intensity);
            }

            // Fill at end of section
            if (this.shouldPlayFill(step, section, sectionStartStep, song)) {
                this.renderDrumFill(ctx, compressor, noiseBuffer, time, intensity, song);
            }

            // Bass
            if (['verse', 'chorus', 'bridge'].includes(section.type)) {
                song.patterns.bass.forEach(note => {
                    if (note.beat === patternBeat) {
                        this.renderBass(ctx, compressor, time, note.freq, note.duration, note.velocity * intensity, song.config);
                    }
                });
            }

            // Melody
            if (['chorus', 'bridge', 'verse'].includes(section.type)) {
                const melodyIntensity = section.type === 'verse' ? 0.5 : 1;
                song.patterns.melody.forEach(note => {
                    if (note.beat === patternBeat) {
                        this.renderMelody(ctx, compressor, convolver, delayNode, time, note.freq, note.duration, note.velocity * intensity * melodyIntensity, song.config);
                    }
                });
            }

            // Chords
            song.patterns.chords.forEach(chord => {
                if (chord.beat === patternBeat) {
                    this.renderChord(ctx, compressor, convolver, time, chord, intensity * 0.7, song.config);
                }
            });

            // Pads (ambient sections)
            if (['intro', 'bridge', 'outro'].includes(section.type) && song.patterns.pads) {
                song.patterns.pads.forEach(pad => {
                    if (pad.beat === patternBeat) {
                        this.renderPad(ctx, compressor, convolver, time, pad, intensity * 0.4, song.config);
                    }
                });
            }

            // Report progress
            if (this.onRenderProgress && step % 32 === 0) {
                this.onRenderProgress(step / totalSteps);
            }
        }
    }

    shouldPlayFill(step, section, sectionStartStep, song) {
        const sectionSteps = section.bars * 8;
        const positionInSection = step - sectionStartStep;
        // Play fill in last 4 steps of section
        return positionInSection >= sectionSteps - 4 && positionInSection < sectionSteps;
    }

    // ==========================================
    // Instrument Renderers
    // ==========================================

    renderKick(ctx, destination, time, velocity, config) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Genre-specific kick
        let startFreq = 150;
        let endFreq = 40;
        let decay = 0.4;

        if (config.mood === 'aggressive') {
            startFreq = 180;
            endFreq = 35;
            decay = 0.5;
        } else if (config.mood === 'chill') {
            startFreq = 120;
            endFreq = 45;
            decay = 0.35;
        }

        osc.connect(gain);
        gain.connect(destination);

        osc.frequency.setValueAtTime(startFreq, time);
        osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.08);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.9, time + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

        osc.start(time);
        osc.stop(time + decay);

        // Click transient for punch
        if (config.mood === 'aggressive' || config.mood === 'driving') {
            const click = ctx.createOscillator();
            const clickGain = ctx.createGain();
            click.type = 'square';
            click.frequency.value = 1500;
            click.connect(clickGain);
            clickGain.connect(destination);
            clickGain.gain.setValueAtTime(velocity * 0.2, time);
            clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.015);
            click.start(time);
            click.stop(time + 0.015);
        }
    }

    renderSnare(ctx, destination, reverb, noiseBuffer, time, velocity, config) {
        // Noise component
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = config.mood === 'chill' ? 3000 : 5000;
        noiseFilter.Q.value = 0.5;

        const noiseGain = ctx.createGain();
        const decay = config.mood === 'chill' ? 0.25 : 0.18;

        noiseGain.gain.setValueAtTime(0, time);
        noiseGain.gain.linearRampToValueAtTime(velocity * 0.55, time + 0.003);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + decay);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(destination);
        noiseGain.connect(reverb);

        noise.start(time);
        noise.stop(time + decay);

        // Body tone
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, time);
        osc.frequency.exponentialRampToValueAtTime(120, time + 0.04);

        oscGain.gain.setValueAtTime(velocity * 0.4, time);
        oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

        osc.connect(oscGain);
        oscGain.connect(destination);

        osc.start(time);
        osc.stop(time + 0.08);
    }

    renderHiHat(ctx, destination, noiseBuffer, time, velocity, config) {
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = config.mood === 'aggressive' ? 9000 : 7500;

        const gain = ctx.createGain();
        const decay = config.mood === 'chill' ? 0.06 : 0.04;

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.22, time + 0.001);
        gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(destination);

        noise.start(time);
        noise.stop(time + decay);
    }

    renderOpenHiHat(ctx, destination, noiseBuffer, time, velocity) {
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 6000;

        const gain = ctx.createGain();

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.25, time + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(destination);

        noise.start(time);
        noise.stop(time + 0.3);
    }

    renderPerc(ctx, destination, reverb, noiseBuffer, time, velocity) {
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2500;
        filter.Q.value = 2;

        const gain = ctx.createGain();

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.3, time + 0.001);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(destination);
        gain.connect(reverb);

        noise.start(time);
        noise.stop(time + 0.1);
    }

    renderDrumFill(ctx, destination, noiseBuffer, time, intensity, song) {
        const stepDuration = 60 / song.bpm / 4; // 16th notes
        
        for (let i = 0; i < 4; i++) {
            const fillTime = time + i * stepDuration;
            const vel = intensity * (0.5 + i * 0.15);
            
            if (i % 2 === 0) {
                this.renderHiHat(ctx, destination, noiseBuffer, fillTime, vel, song.config);
            } else {
                // Tom-like sound
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200 - i * 20, fillTime);
                osc.frequency.exponentialRampToValueAtTime(80, fillTime + 0.15);
                
                gain.gain.setValueAtTime(vel * 0.4, fillTime);
                gain.gain.exponentialRampToValueAtTime(0.001, fillTime + 0.15);
                
                osc.connect(gain);
                gain.connect(destination);
                osc.start(fillTime);
                osc.stop(fillTime + 0.15);
            }
        }
    }

    renderBass(ctx, destination, time, freq, duration, velocity, config) {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Genre-specific bass
        if (config.instruments?.bass === '808') {
            osc1.type = 'sine';
            osc2.type = 'sine';
            osc1.frequency.setValueAtTime(freq, time);
            osc1.frequency.exponentialRampToValueAtTime(freq * 0.5, time + duration * 0.8);
        } else if (config.instruments?.bass === 'reese') {
            osc1.type = 'sawtooth';
            osc2.type = 'sawtooth';
            osc2.detune.value = 10;
            osc1.frequency.value = freq;
            osc2.frequency.value = freq;
        } else {
            osc1.type = 'sawtooth';
            osc2.type = 'sine';
            osc1.frequency.value = freq;
            osc2.frequency.value = freq * 0.5;
        }

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, time);
        filter.frequency.exponentialRampToValueAtTime(200, time + duration);
        filter.Q.value = 2;

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(destination);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.55, time + 0.01);
        gain.gain.setValueAtTime(velocity * 0.5, time + duration * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + duration);
        osc2.stop(time + duration);
    }

    renderMelody(ctx, destination, reverb, delay, time, freq, duration, velocity, config) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Instrument selection based on genre
        switch (config.instruments?.lead) {
            case 'rhodes':
            case 'piano':
                osc.type = 'sine';
                break;
            case 'synth':
            case 'acid':
                osc.type = 'sawtooth';
                break;
            case 'pad':
            case 'strings':
                osc.type = 'triangle';
                break;
            default:
                osc.type = config.mood === 'chill' ? 'sine' : 'triangle';
        }

        osc.frequency.value = freq;

        // Slight vibrato for expressiveness
        if (duration > 0.3) {
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.value = 5;
            lfoGain.gain.value = 3;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start(time + 0.1);
            lfo.stop(time + duration);
        }

        filter.type = 'lowpass';
        filter.frequency.value = 4000;
        filter.Q.value = 0.5;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(destination);
        gain.connect(reverb);
        if (config.delay) {
            gain.connect(delay);
        }

        const attack = config.mood === 'chill' ? 0.05 : 0.02;
        const release = 0.12;

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.4, time + attack);
        gain.gain.setValueAtTime(velocity * 0.35, time + duration * 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration + release);

        osc.start(time);
        osc.stop(time + duration + release);
    }

    renderChord(ctx, destination, reverb, time, chord, intensity, config) {
        const { frequencies, duration, velocity, arpeggio } = chord;

        if (arpeggio) {
            const noteSpacing = 60 / 120 / 4; // Approx 16th note
            frequencies.forEach((freq, i) => {
                this.renderChordNote(ctx, destination, reverb, time + i * noteSpacing, freq, duration * 0.5, velocity * intensity, config);
            });
        } else {
            frequencies.forEach(freq => {
                this.renderChordNote(ctx, destination, reverb, time, freq, duration, velocity * intensity, config);
            });
        }
    }

    renderChordNote(ctx, destination, reverb, time, freq, duration, velocity, config) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = config.mood === 'chill' || config.mood === 'ethereal' ? 'sine' : 'triangle';
        osc.frequency.value = freq;

        osc.connect(gain);
        gain.connect(destination);
        gain.connect(reverb);

        const attack = 0.06;

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.18, time + attack);
        gain.gain.setValueAtTime(velocity * 0.14, time + duration * 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.start(time);
        osc.stop(time + duration);
    }

    renderPad(ctx, destination, reverb, time, pad, intensity, config) {
        const { frequencies, duration } = pad;

        frequencies.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.value = freq;

            // Slow LFO for movement
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.value = 0.2 + i * 0.1;
            lfoGain.gain.value = freq * 0.01;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start(time);
            lfo.stop(time + duration);

            filter.type = 'lowpass';
            filter.frequency.value = 2000;

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(reverb);

            const attack = duration * 0.3;
            const release = duration * 0.4;

            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(intensity * 0.12, time + attack);
            gain.gain.setValueAtTime(intensity * 0.1, time + duration - release);
            gain.gain.linearRampToValueAtTime(0, time + duration);

            osc.start(time);
            osc.stop(time + duration);
        });
    }

    // ==========================================
    // Utilities
    // ==========================================

    async createReverb(ctx, duration, decay) {
        const length = ctx.sampleRate * duration;
        const impulse = ctx.createBuffer(2, length, ctx.sampleRate);

        for (let channel = 0; channel < 2; channel++) {
            const data = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                const t = i / length;
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
            }
        }

        const convolver = ctx.createConvolver();
        convolver.buffer = impulse;
        return convolver;
    }

    createNoiseBuffer(ctx, duration) {
        const length = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < length; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        return buffer;
    }

    clearCache() {
        this.cache.clear();
        console.log('🗑️ Audio cache cleared');
    }
}

export default AudioRenderer;

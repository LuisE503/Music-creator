// ============================================
// BeatForge AI - Professional Music Engine v3.0
// Advanced music theory with authentic genre sounds
// Inspired by iconic albums and production techniques
// Uses Web Audio API with efficient scheduling
// ============================================

import {
    ADVANCED_SCALES,
    FAMOUS_PROGRESSIONS,
    AUTHENTIC_DRUM_PATTERNS,
    AUTHENTIC_BASS_PATTERNS,
    INSTRUMENT_PRESETS,
    SONG_STRUCTURES,
    SECTION_INTENSITIES,
    GENRE_PRODUCTION_SETTINGS,
    getChordVoicing,
    generateMelodicPhrase
} from './music-theory-advanced.js';

/**
 * Musical Theory Constants - Enhanced with real music theory
 * Based on famous songs, albums, and production techniques
 */
const MUSIC_THEORY = {
    notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    
    // Enhanced scales from music-theory-advanced.js
    scales: {
        // Traditional modes
        major: [0, 2, 4, 5, 7, 9, 11],          // Ionian - bright, happy
        minor: [0, 2, 3, 5, 7, 8, 10],          // Aeolian - sad, melancholic  
        dorian: [0, 2, 3, 5, 7, 9, 10],         // Jazz, funk, R&B (Daft Punk "Get Lucky")
        phrygian: [0, 1, 3, 5, 7, 8, 10],       // Spanish, flamenco, metal
        lydian: [0, 2, 4, 6, 7, 9, 11],         // Dreamy, floating (Film scores)
        mixolydian: [0, 2, 4, 5, 7, 9, 10],     // Blues rock (Hendrix)
        
        // Pentatonic (universally pleasing)
        pentatonic: [0, 2, 4, 7, 9],            // Major pentatonic
        minorPentatonic: [0, 3, 5, 7, 10],      // Minor pentatonic (Lo-Fi, Hip-Hop)
        
        // Blues & Jazz
        blues: [0, 3, 5, 6, 7, 10],             // Classic blues
        bebop: [0, 2, 4, 5, 7, 9, 10, 11],      // Jazz bebop
        
        // Exotic
        harmonicMinor: [0, 2, 3, 5, 7, 8, 11],  // Classical, Middle Eastern
        japanese: [0, 1, 5, 7, 8],              // Traditional Japanese
        arabic: [0, 1, 4, 5, 7, 8, 11],         // Middle Eastern
        gypsy: [0, 2, 3, 6, 7, 8, 10],          // Romani/Hungarian
        
        // Electronic
        wholetone: [0, 2, 4, 6, 8, 10],         // Dreamy, impressionistic
        chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    
    // Famous chord progressions from real songs
    chordProgressions: {
        // Pop/Rock - "Let It Be", "No Woman No Cry", "Someone Like You"
        pop: [[0, 4, 5, 3], [0, 5, 3, 4], [0, 3, 4, 4]],
        fourChords: [[0, 4, 5, 3]],  // I-V-vi-IV (most popular)
        
        // Jazz - "Autumn Leaves", "Fly Me to the Moon"
        jazz: [[1, 4, 0, 0], [1, 4, 3, 6], [2, 5, 1, 4]],
        jazzTwoFive: [[1, 4, 0]],    // ii-V-I
        
        // Blues - "Sweet Home Chicago", "Pride and Joy"
        blues: [[0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4]],
        bluesShort: [[0, 3, 4, 0]],
        
        // Lo-Fi Hip Hop - Nujabes, J Dilla style
        lofi: [[1, 4, 0, 5], [1, 4, 2, 5], [0, 3, 1, 4]],
        lofiNeoSoul: [[1, 4, 2, 5]],
        
        // Trap/Hip-Hop - Metro Boomin, 21 Savage style
        trap: [[0, 0, 5, 6], [0, 5, 3, 4], [0, 6, 5, 4]],
        trapDark: [[0, 0, 5, 6]],
        
        // Electronic/House - Daft Punk, Disclosure
        electronic: [[0, 0, 3, 3], [0, 5, 3, 4], [0, 0, 0, 5]],
        house: [[0, 0, 3, 4], [0, 3, 0, 4]],
        
        // Ambient - Brian Eno, Sigur Rós
        ambient: [[0, 2, 4, 6], [0, 4, 0, 4], [0, 0, 3, 3]],
        ambientSuspended: [[0, 4, 5, 3]],
        
        // Latin/Reggaeton - Bad Bunny, J Balvin
        latin: [[0, 3, 4, 4], [0, 4, 0, 5], [0, 3, 0, 4]],
        dembow: [[0, 3, 6, 2]],
        
        // Synthwave - Kavinsky, The Midnight
        synthwave: [[0, 5, 6, 0], [0, 3, 4, 5]],
        
        // Cinematic - Hans Zimmer style
        cinematic: [[0, 5, 2, 6], [0, 4, 5, 2]]
    },
    
    // Chord types for richer harmonies
    chordTypes: {
        major: [0, 4, 7],
        minor: [0, 3, 7],
        major7: [0, 4, 7, 11],
        minor7: [0, 3, 7, 10],
        dominant7: [0, 4, 7, 10],
        diminished: [0, 3, 6],
        augmented: [0, 4, 8],
        sus2: [0, 2, 7],
        sus4: [0, 5, 7],
        add9: [0, 4, 7, 14]
    }
};

/**
 * Genre Configurations - Extended with authentic production settings
 * Inspired by famous artists and albums in each genre
 */
const GENRE_CONFIGS = {
    'Lo-Fi Hip Hop': {
        bpm: [70, 85],
        key: ['C', 'D', 'E', 'F', 'G', 'A'],
        scale: 'minorPentatonic',  // Lo-Fi uses minor pentatonic for that mellow vibe
        progression: 'lofi',       // Neo-soul jazz progressions
        swing: 0.18,               // J Dilla style swing
        vinylCrackle: true,
        tapeWobble: true,          // Tape saturation effect
        reverb: 0.5,
        warmth: 0.8,               // Warm low-pass filter
        lowpassFreq: 3000,         // Cut highs for lofi sound
        instruments: {
            lead: 'rhodes',        // Electric piano (Fender Rhodes style)
            bass: 'warm',          // Warm analog bass
            drums: 'lofiSwung',    // Swung boom bap drums
            pad: 'vinyl'           // Warm pad with vinyl texture
        },
        mood: 'chill',
        reference: 'Nujabes, J Dilla, ChilledCow'
    },
    'Synthwave': {
        bpm: [100, 120],
        key: ['A', 'E', 'D', 'F#'],
        scale: 'minor',            // Minor for that 80s moody feel
        progression: 'synthwave',  // Retro progressions
        swing: 0,
        arpeggio: true,            // Classic synth arpeggios
        gatedReverb: true,         // 80s gated reverb on drums
        reverb: 0.45,
        delay: 0.35,
        chorus: 0.4,               // Chorus for width
        instruments: {
            lead: 'synthLead',     // Classic analog synth lead
            bass: 'synthBass',     // Punchy synth bass
            drums: 'synthwave80s',
            pad: 'analogPad'       // Lush analog pads
        },
        mood: 'nostalgic',
        reference: 'Kavinsky, The Midnight, FM-84'
    },
    'Trap': {
        bpm: [130, 160],
        key: ['C', 'D', 'F', 'G'],
        scale: 'minor',            // Dark minor scales
        progression: 'trap',       // Dark trap progressions
        swing: 0,                  // Trap is straight, not swung
        hiHatRolls: true,          // Signature hi-hat rolls
        tripletHats: true,         // Triplet hi-hats
        reverb: 0.25,
        distortion: 0.1,
        sidechain: true,           // Sidechaining for pump effect
        instruments: {
            lead: 'darkSynth',     // Dark atmospheric synths
            bass: '808',           // Iconic 808 bass
            drums: 'trapHiHatRolls',
            pad: 'darkPad'
        },
        mood: 'aggressive',
        reference: 'Metro Boomin, 808 Mafia, Southside'
    },
    'Ambient': {
        bpm: [60, 80],
        key: ['C', 'D', 'E', 'G', 'A'],
        scale: 'lydian',           // Lydian for dreamy floating feel
        progression: 'ambient',
        swing: 0,
        reverb: 0.85,              // Lots of reverb
        delay: 0.5,
        shimmer: true,             // Shimmer reverb effect
        granular: true,            // Granular textures
        instruments: {
            lead: 'shimmerPad',
            bass: 'subBass',
            drums: 'ambientMinimal',
            pad: 'atmosphericPad'
        },
        mood: 'ethereal',
        reference: 'Brian Eno, Aphex Twin, Tycho'
    },
    'Techno': {
        bpm: [128, 140],
        key: ['A', 'D', 'E', 'G'],
        scale: 'phrygian',         // Dark phrygian mode
        progression: 'electronic',
        swing: 0,
        acidBass: true,            // TB-303 style acid
        reverb: 0.35,
        delay: 0.4,
        distortion: 0.15,
        instruments: {
            lead: 'acidLead',      // Acid synth lead
            bass: 'technoBass',
            drums: 'technoDriving',
            pad: 'industrialPad'
        },
        mood: 'driving',
        reference: 'Charlotte de Witte, Amelie Lens, Richie Hawtin'
    },
    'Reggaeton': {
        bpm: [90, 100],
        key: ['C', 'D', 'G', 'A'],
        scale: 'minor',
        progression: 'dembow',     // Classic reggaeton progression
        swing: 0,
        dembow: true,              // Dembow rhythm pattern
        reverb: 0.3,
        delay: 0.15,
        instruments: {
            lead: 'latinSynth',    // Bright latin synths
            bass: 'punchyBass',    // Punchy bass
            drums: 'dembowClassic',
            perc: 'latinPerc'      // Bongos, congas
        },
        mood: 'party',
        reference: 'Daddy Yankee, Bad Bunny, J Balvin'
    },
    'Indie Electronic': {
        bpm: [100, 130],
        key: ['C', 'D', 'E', 'F', 'G'],
        scale: 'major',
        progression: 'pop',
        swing: 0.08,
        reverb: 0.45,
        delay: 0.3,
        chorus: 0.3,
        instruments: {
            lead: 'indieSynth',
            bass: 'warmBass',
            drums: 'indieDrums',
            pad: 'dreamyPad'
        },
        mood: 'dreamy',
        reference: 'M83, CHVRCHES, Washed Out'
    },
    'Cyberpunk': {
        bpm: [110, 140],
        key: ['A', 'D', 'E'],
        scale: 'phrygian',
        progression: 'electronic',
        swing: 0,
        distortion: 0.35,
        reverb: 0.35,
        glitch: true,
        bitcrush: true,
        instruments: {
            lead: 'distortedLead',
            bass: 'wobbleBass',
            drums: 'industrialDrums',
            pad: 'digitalPad'
        },
        mood: 'dark',
        reference: 'Perturbator, Carpenter Brut, HEALTH'
    },
    'Jazz Hop': {
        bpm: [80, 95],
        key: ['C', 'F', 'Bb', 'Eb'],
        scale: 'dorian',
        progression: 'jazz',
        swing: 0.22,
        reverb: 0.45,
        warmth: 0.7,
        instruments: {
            lead: 'electricPiano',
            bass: 'uprightBass',
            drums: 'jazzDrums',
            pad: 'jazzPad'
        },
        mood: 'smooth',
        reference: 'Robert Glasper, Nujabes, Alfa Mist'
    },
    'Cinematic': {
        bpm: [70, 100],
        key: ['C', 'D', 'E', 'G'],
        scale: 'harmonicMinor',
        progression: 'cinematic',
        swing: 0,
        reverb: 0.75,
        delay: 0.4,
        instruments: {
            lead: 'orchestralStrings',
            bass: 'orchestralBass',
            drums: 'epicDrums',
            pad: 'cinematicPad'
        },
        mood: 'epic',
        reference: 'Hans Zimmer, Ramin Djawadi, Thomas Newman'
    },
    'House': {
        bpm: [120, 128],
        key: ['C', 'G', 'D', 'A'],
        scale: 'dorian',
        progression: 'house',
        swing: 0.05,
        reverb: 0.4,
        sidechain: true,
        instruments: {
            lead: 'houseSynth',
            bass: 'houseBass',
            drums: 'houseFourOnFloor',
            pad: 'housePad'
        },
        mood: 'groovy',
        reference: 'Disclosure, Duke Dumont, MK'
    },
    'Drum and Bass': {
        bpm: [170, 180],
        key: ['D', 'E', 'A', 'B'],
        scale: 'minor',
        progression: 'trap',
        swing: 0,
        reverb: 0.3,
        distortion: 0.2,
        instruments: {
            lead: 'reeseLead',
            bass: 'reeseBass',
            drums: 'dnbFast',
            pad: 'dnbPad'
        },
        mood: 'intense',
        reference: 'Noisia, Netsky, Andy C'
    },
    'UK Drill': {
        bpm: [140, 145],
        key: ['C', 'D', 'F', 'G'],
        scale: 'phrygian',
        progression: 'trap',
        swing: 0,
        reverb: 0.2,
        delay: 0.15,
        instruments: {
            lead: 'darkSynth',
            bass: '808',
            drums: 'ukDrill',
            pad: 'darkPad'
        },
        mood: 'menacing',
        reference: 'Pop Smoke, Headie One, Central Cee'
    },
    'Vaporwave': {
        bpm: [70, 90],
        key: ['C', 'F', 'G', 'A'],
        scale: 'major',
        progression: 'pop',
        swing: 0.1,
        reverb: 0.6,
        delay: 0.4,
        pitchShift: -0.5,
        instruments: {
            lead: 'chorusSynth',
            bass: 'deepBass',
            drums: 'vaporDrums',
            pad: 'vaporPad'
        },
        mood: 'nostalgic',
        reference: 'Macintosh Plus, Saint Pepsi'
    }
};

/**
 * Seeded Random for reproducible generation
 */
class SeededRandom {
    constructor(seed) {
        this.seed = this.hashCode(String(seed));
    }
    
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash) || 1;
    }
    
    next() {
        this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
        return this.seed / 0x7fffffff;
    }
    
    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
    
    nextFloat(min, max) {
        return this.next() * (max - min) + min;
    }
    
    pick(array) {
        return array[this.nextInt(0, array.length - 1)];
    }
    
    shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = this.nextInt(0, i);
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
    
    chance(probability) {
        return this.next() < probability;
    }
}

/**
 * Note frequency calculator
 */
function noteToFrequency(note, octave = 4) {
    const noteIndex = MUSIC_THEORY.notes.indexOf(
        note.replace('b', '#').replace('Bb', 'A#').replace('Eb', 'D#').replace('Db', 'C#').replace('Gb', 'F#').replace('Ab', 'G#')
    );
    const a4 = 440;
    const a4Index = 9; // A is at index 9
    const semitones = (octave - 4) * 12 + (noteIndex - a4Index);
    return a4 * Math.pow(2, semitones / 12);
}

function createRandomSeed() {
    if (window.crypto && window.crypto.getRandomValues) {
        const array = new Uint32Array(2);
        window.crypto.getRandomValues(array);
        return `${array[0].toString(16)}-${array[1].toString(16)}`;
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function humanizeOffset(maxSeconds = 0.012) {
    return (Math.random() - 0.5) * maxSeconds * 2;
}

/**
 * Main Music Generator - Optimized Version
 * Uses lookahead scheduling to prevent audio glitches
 */
class ProceduralMusicGenerator {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.compressor = null;
        this.convolver = null;
        this.analyser = null;
        
        this.isPlaying = false;
        this.isPaused = false;
        this.currentSong = null;
        
        // Timing
        this.startTime = 0;
        this.pauseTime = 0;
        this.currentBeat = 0;
        this.nextBeatTime = 0;
        
        // Lookahead scheduling (prevents freezing)
        this.lookahead = 0.1; // How far ahead to schedule (seconds)
        this.scheduleInterval = 25; // How often to call scheduler (ms)
        this.schedulerTimer = null;
        
        // Callbacks
        this.onProgress = null;
        this.onEnd = null;
        this.onBeat = null;
        
        // Noise buffer (reused for efficiency)
        this.noiseBuffer = null;
        
        // Active nodes tracking
        this.activeNodes = new Set();
    }
    
    async init() {
        if (this.ctx) return;
        
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create master chain
            this.compressor = this.ctx.createDynamicsCompressor();
            this.compressor.threshold.value = -18;
            this.compressor.knee.value = 20;
            this.compressor.ratio.value = 8;
            this.compressor.attack.value = 0.005;
            this.compressor.release.value = 0.1;
            
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.7;
            
            // Analyser for visualizations
            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 256;
            this.analyser.smoothingTimeConstant = 0.8;
            
            // Create reverb
            this.convolver = await this.createReverb(2, 1.5);
            this.reverbGain = this.ctx.createGain();
            this.reverbGain.gain.value = 0.3;
            
            // Connect chain
            this.convolver.connect(this.reverbGain);
            this.reverbGain.connect(this.compressor);
            this.compressor.connect(this.masterGain);
            this.masterGain.connect(this.analyser);
            this.analyser.connect(this.ctx.destination);
            
            // Pre-generate noise buffer
            this.noiseBuffer = this.createNoiseBuffer(2);
            
            console.log('🎵 BeatForge AI Music Engine initialized');
        } catch (error) {
            console.error('Failed to initialize audio:', error);
            throw error;
        }
    }
    
    async createReverb(duration = 2, decay = 1.5) {
        const sampleRate = this.ctx.sampleRate;
        const length = sampleRate * duration;
        const impulse = this.ctx.createBuffer(2, length, sampleRate);
        
        for (let channel = 0; channel < 2; channel++) {
            const channelData = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                const t = i / length;
                channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
            }
        }
        
        const convolver = this.ctx.createConvolver();
        convolver.buffer = impulse;
        return convolver;
    }
    
    createNoiseBuffer(duration = 2) {
        const sampleRate = this.ctx.sampleRate;
        const length = sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        return buffer;
    }
    
    /**
     * Generate song data (doesn't play, just creates the structure)
     */
    generateSong(songId, genre, songTitle, options = {}) {
        const variationSeed = options.variationSeed || createRandomSeed();
        const rng = new SeededRandom(`${songId}-${songTitle}-${genre}-${variationSeed}`);
        const config = GENRE_CONFIGS[genre] || GENRE_CONFIGS['Lo-Fi Hip Hop'];
        
        const bpm = rng.nextInt(config.bpm[0], config.bpm[1]);
        const key = rng.pick(config.key);
        const scale = MUSIC_THEORY.scales[config.scale];
        const progression = rng.pick(MUSIC_THEORY.chordProgressions[config.progression]);
        
        // Generate song structure
        const structure = this.generateStructure(rng, config);
        
        // Generate patterns
        const patterns = {
            drums: this.generateDrumPattern(rng, config),
            bass: this.generateBassPattern(rng, config, key, scale, progression),
            melody: this.generateMelodyPattern(rng, config, key, scale, progression),
            chords: this.generateChordPattern(rng, config, key, scale, progression)
        };
        
        const duration = this.calculateDuration(structure, bpm);
        
        return {
            id: songId,
            title: songTitle,
            genre,
            bpm,
            key,
            scale: config.scale,
            swing: config.swing || 0,
            humanize: options.humanize ?? 0.012,
            variationSeed,
            reverb: config.reverb || 0.3,
            structure,
            patterns,
            config,
            duration,
            rng,
            progression
        };
    }
    
    generateStructure(rng, config) {
        const sections = [];
        let patterns;
        
        if (config.mood === 'chill' || config.mood === 'ethereal') {
            patterns = ['intro', 'verse', 'verse', 'chorus', 'verse', 'outro'];
        } else if (config.mood === 'aggressive' || config.mood === 'intense') {
            patterns = ['intro', 'verse', 'chorus', 'verse', 'chorus', 'breakdown', 'chorus', 'outro'];
        } else {
            patterns = ['intro', 'verse', 'chorus', 'verse', 'chorus', 'bridge', 'chorus', 'outro'];
        }
        
        let currentBar = 0;
        patterns.forEach(type => {
            const bars = (type === 'intro' || type === 'outro') ? 4 : 
                         (type === 'breakdown') ? 4 : 8;
            sections.push({
                type,
                bars,
                intensity: this.getSectionIntensity(type),
                startBar: currentBar
            });
            currentBar += bars;
        });
        
        return sections;
    }
    
    getSectionIntensity(type) {
        const map = {
            intro: 0.4,
            verse: 0.7,
            chorus: 1.0,
            bridge: 0.6,
            breakdown: 0.3,
            outro: 0.5
        };
        return map[type] || 0.6;
    }
    
    generateDrumPattern(rng, config) {
        const pattern = {
            kick: new Array(32).fill(0),
            snare: new Array(32).fill(0),
            hihat: new Array(32).fill(0),
            perc: new Array(32).fill(0)
        };
        
        // Genre-specific patterns
        if (config.dembow) {
            // Reggaeton dembow
            [0, 6, 8, 14, 16, 22, 24, 30].forEach(i => {
                if (i < 32) pattern.kick[i] = rng.nextFloat(0.7, 1);
            });
            [3, 7, 11, 15, 19, 23, 27, 31].forEach(i => {
                if (i < 32) pattern.snare[i] = rng.nextFloat(0.8, 1);
            });
        } else if (config.hiHatRolls) {
            // Trap
            [0, 14, 16, 30].forEach(i => {
                if (i < 32) pattern.kick[i] = rng.nextFloat(0.8, 1);
            });
            [8, 24].forEach(i => pattern.snare[i] = 1);
            for (let i = 0; i < 32; i++) {
                pattern.hihat[i] = rng.chance(0.7) ? rng.nextFloat(0.3, 0.8) : 0;
            }
        } else {
            // Standard 4/4
            [0, 8, 16, 24].forEach(i => pattern.kick[i] = rng.nextFloat(0.8, 1));
            [8, 24].forEach(i => pattern.snare[i] = 1);
            for (let i = 0; i < 32; i += 2) {
                pattern.hihat[i] = rng.nextFloat(0.4, 0.7);
            }
        }
        
        // Add variation
        if (rng.chance(0.3)) {
            const extraKick = rng.nextInt(0, 31);
            pattern.kick[extraKick] = rng.nextFloat(0.5, 0.7);
        }
        
        return pattern;
    }
    
    generateBassPattern(rng, config, key, scale, progression) {
        const pattern = [];
        const baseOctave = config.mood === 'aggressive' ? 1 : 2;
        const keyFreq = noteToFrequency(key, baseOctave);
        
        for (let bar = 0; bar < 4; bar++) {
            const chordRoot = progression[bar % progression.length];
            const noteIndex = scale[chordRoot % scale.length];
            const freq = keyFreq * Math.pow(2, noteIndex / 12);
            
            // Main bass hit on beat 1
            pattern.push({
                beat: bar * 8,
                freq,
                duration: 0.3,
                velocity: rng.nextFloat(0.7, 1)
            });
            
            // Optional additional hits
            if (rng.chance(0.5)) {
                pattern.push({
                    beat: bar * 8 + 4,
                    freq: freq * (rng.chance(0.3) ? 1.5 : 1),
                    duration: 0.2,
                    velocity: rng.nextFloat(0.5, 0.8)
                });
            }
        }
        
        return pattern;
    }
    
    generateMelodyPattern(rng, config, key, scale, progression) {
        const pattern = [];
        const baseOctave = 4;
        const keyFreq = noteToFrequency(key, baseOctave);
        
        let lastNote = rng.nextInt(0, scale.length - 1);
        
        for (let bar = 0; bar < 4; bar++) {
            const chordRoot = progression[bar % progression.length];
            const chordTones = [
                scale[chordRoot % scale.length],
                scale[(chordRoot + 2) % scale.length],
                scale[(chordRoot + 4) % scale.length]
            ];
            const notesInBar = rng.nextInt(3, 6);
            const usedPositions = new Set();
            
            for (let n = 0; n < notesInBar; n++) {
                let position;
                do {
                    position = rng.nextInt(0, 7);
                } while (usedPositions.has(position) && usedPositions.size < 8);
                usedPositions.add(position);
                
                // Prefer chord tones on strong beats
                const useChordTone = position % 2 === 0 || rng.chance(0.6);
                let noteIndex;
                if (useChordTone) {
                    noteIndex = chordTones[rng.nextInt(0, chordTones.length - 1)];
                } else {
                    const movement = rng.nextInt(-2, 2);
                    lastNote = Math.max(0, Math.min(scale.length - 1, lastNote + movement));
                    noteIndex = scale[lastNote];
                }
                
                const octaveShift = rng.chance(0.15) ? 12 : 0;
                const freq = keyFreq * Math.pow(2, (noteIndex + octaveShift) / 12);
                
                pattern.push({
                    beat: bar * 8 + position,
                    freq,
                    duration: rng.nextFloat(0.12, 0.45),
                    velocity: rng.nextFloat(0.35, 0.75)
                });
            }
        }
        
        return pattern.sort((a, b) => a.beat - b.beat);
    }
    
    generateChordPattern(rng, config, key, scale, progression) {
        const pattern = [];
        const baseOctave = 3;
        const keyFreq = noteToFrequency(key, baseOctave);
        
        for (let bar = 0; bar < 4; bar++) {
            const chordRoot = progression[bar % progression.length];
            
            const chordNotes = [
                scale[chordRoot % scale.length],
                scale[(chordRoot + 2) % scale.length],
                scale[(chordRoot + 4) % scale.length]
            ];
            
            if (rng.chance(0.4)) {
                chordNotes.push(scale[(chordRoot + 6) % scale.length]);
            }
            
            const frequencies = chordNotes.map(note => 
                keyFreq * Math.pow(2, note / 12)
            );
            
            pattern.push({
                beat: bar * 8,
                frequencies,
                duration: 0.8,
                velocity: rng.nextFloat(0.2, 0.4),
                arpeggio: config.arpeggio || false
            });
            
            if (rng.chance(0.3)) {
                pattern.push({
                    beat: bar * 8 + 4,
                    frequencies,
                    duration: 0.4,
                    velocity: rng.nextFloat(0.15, 0.3),
                    arpeggio: config.arpeggio || false
                });
            }
        }
        
        return pattern;
    }
    
    calculateDuration(structure, bpm) {
        const totalBars = structure.reduce((acc, s) => acc + s.bars, 0);
        const beatsPerBar = 4;
        const totalBeats = totalBars * beatsPerBar;
        return (totalBeats / bpm) * 60;
    }
    
    /**
     * Play a generated song with optimized scheduling
     */
    async play(song, startOffset = 0) {
        await this.init();
        
        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }
        
        this.stop();
        
        this.currentSong = song;
        this.isPlaying = true;
        this.isPaused = false;
        
        // Set reverb level
        this.reverbGain.gain.value = song.config.reverb || 0.3;
        
        // Calculate timing
        const stepsPerBeat = 2; // 8th notes
        const stepDuration = 60 / song.bpm / stepsPerBeat;
        
        this.startTime = this.ctx.currentTime - startOffset;
        this.currentBeat = Math.floor(startOffset / stepDuration);
        this.nextBeatTime = this.ctx.currentTime;
        
        // Store song parameters for scheduler
        this.songParams = {
            stepDuration,
            totalSteps: song.structure.reduce((acc, s) => acc + s.bars * 8, 0),
            swing: song.swing
        };
        
        // Start scheduler loop
        this.startScheduler();
        
        // Start progress tracking
        this.startProgressTracking();
        
        console.log(`▶️ Playing: ${song.title} at ${song.bpm} BPM`);
    }
    
    startScheduler() {
        const schedule = () => {
            if (!this.isPlaying || this.isPaused) return;
            
            const { stepDuration, totalSteps, swing } = this.songParams;
            
            // Schedule notes slightly ahead
            while (this.nextBeatTime < this.ctx.currentTime + this.lookahead) {
                if (this.currentBeat >= totalSteps) {
                    this.handleSongEnd();
                    return;
                }
                
                // Apply swing to off-beats
                let adjustedTime = this.nextBeatTime;
                if (this.currentBeat % 2 === 1 && swing > 0) {
                    adjustedTime += stepDuration * swing * 0.5;
                }
                
                // Schedule sounds for this beat
                this.scheduleNotesForBeat(this.currentBeat, adjustedTime);
                
                // Move to next beat
                this.nextBeatTime += stepDuration;
                this.currentBeat++;
            }
        };
        
        this.schedulerTimer = setInterval(schedule, this.scheduleInterval);
        schedule(); // Run immediately
    }
    
    scheduleNotesForBeat(beat, time) {
        const song = this.currentSong;
        const section = this.getCurrentSection(beat);
        const intensity = section.intensity;
        const jitter = song.humanize ? humanizeOffset(song.humanize) : 0;
        const noteTime = Math.max(time + jitter, this.ctx.currentTime);
        
        const patternBeat = beat % 32; // 4 bar loop
        
        // Drums
        const drums = song.patterns.drums;
        if (drums.kick[patternBeat] > 0) {
            this.playKick(noteTime, drums.kick[patternBeat] * intensity);
        }
        if (drums.snare[patternBeat] > 0) {
            this.playSnare(noteTime, drums.snare[patternBeat] * intensity);
        }
        if (drums.hihat[patternBeat] > 0 && section.type !== 'intro') {
            this.playHiHat(noteTime, drums.hihat[patternBeat] * intensity);
        }
        
        // Bass (only in verse, chorus, bridge)
        if (['verse', 'chorus', 'bridge'].includes(section.type)) {
            song.patterns.bass.forEach(note => {
                if (note.beat === patternBeat % 32) {
                    this.playBass(noteTime, note.freq, note.duration, note.velocity * intensity);
                }
            });
        }
        
        // Melody (only in chorus and bridge)
        if (['chorus', 'bridge'].includes(section.type)) {
            song.patterns.melody.forEach(note => {
                if (note.beat === patternBeat % 32) {
                    this.playMelody(noteTime, note.freq, note.duration, note.velocity * intensity, song.config);
                }
            });
        }
        
        // Chords
        song.patterns.chords.forEach(chord => {
            if (chord.beat === patternBeat % 32) {
                this.playChord(noteTime, chord, intensity * 0.7, song.config);
            }
        });
        
        // Beat callback
        if (this.onBeat) {
            this.onBeat(beat, section);
        }
    }
    
    getCurrentSection(beat) {
        const song = this.currentSong;
        let currentBeat = 0;
        
        for (const section of song.structure) {
            const sectionBeats = section.bars * 8;
            if (beat < currentBeat + sectionBeats) {
                return section;
            }
            currentBeat += sectionBeats;
        }
        
        return song.structure[song.structure.length - 1];
    }
    
    handleSongEnd() {
        this.stop();
        if (this.onEnd) {
            this.onEnd();
        }
    }
    
    startProgressTracking() {
        const update = () => {
            if (!this.isPlaying) return;
            
            const elapsed = this.ctx.currentTime - this.startTime;
            const duration = this.currentSong.duration;
            const progress = Math.min(elapsed / duration, 1);
            
            if (this.onProgress) {
                this.onProgress(progress, elapsed, duration);
            }
            
            if (this.isPlaying) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }
    
    // ==========================================
    // Sound Synthesis Methods (Optimized)
    // ==========================================
    
    playKick(time, velocity = 1) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.compressor);
        
        // Pitch envelope for punch
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.08);
        
        // Amplitude envelope
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.9, time + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
        
        osc.start(time);
        osc.stop(time + 0.4);
        
        this.trackNode(osc, time + 0.4);
    }
    
    playSnare(time, velocity = 1) {
        // Noise component
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        
        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 2000;
        
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0, time);
        noiseGain.gain.linearRampToValueAtTime(velocity * 0.5, time + 0.002);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.compressor);
        noiseGain.connect(this.convolver);
        
        noise.start(time);
        noise.stop(time + 0.2);
        
        // Body component
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, time);
        osc.frequency.exponentialRampToValueAtTime(100, time + 0.05);
        
        oscGain.gain.setValueAtTime(velocity * 0.4, time);
        oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        
        osc.connect(oscGain);
        oscGain.connect(this.compressor);
        
        osc.start(time);
        osc.stop(time + 0.1);
        
        this.trackNode(noise, time + 0.2);
        this.trackNode(osc, time + 0.1);
    }
    
    playHiHat(time, velocity = 1) {
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 8000;
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.2, time + 0.001);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.compressor);
        
        noise.start(time);
        noise.stop(time + 0.05);
        
        this.trackNode(noise, time + 0.05);
    }
    
    playBass(time, freq, duration, velocity) {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();
        
        osc1.type = 'sawtooth';
        osc2.type = 'sine';
        osc1.frequency.value = freq;
        osc2.frequency.value = freq * 0.5;
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, time);
        filter.frequency.exponentialRampToValueAtTime(200, time + duration);
        filter.Q.value = 2;
        
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.compressor);
        
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.5, time + 0.01);
        gain.gain.setValueAtTime(velocity * 0.45, time + duration * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + duration);
        osc2.stop(time + duration);
        
        this.trackNode(osc1, time + duration);
        this.trackNode(osc2, time + duration);
    }
    
    playMelody(time, freq, duration, velocity, config) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        
        // Choose waveform based on mood
        switch (config.mood) {
            case 'chill':
            case 'smooth':
                osc.type = 'sine';
                break;
            case 'energetic':
            case 'dark':
                osc.type = 'sawtooth';
                break;
            default:
                osc.type = 'triangle';
        }
        
        osc.frequency.value = freq;
        
        filter.type = 'lowpass';
        filter.frequency.value = 3000;
        filter.Q.value = 1;
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.compressor);
        gain.connect(this.convolver);
        
        const attackTime = 0.03;
        const releaseTime = 0.1;
        
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.35, time + attackTime);
        gain.gain.setValueAtTime(velocity * 0.3, time + duration);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration + releaseTime);
        
        osc.start(time);
        osc.stop(time + duration + releaseTime);
        
        this.trackNode(osc, time + duration + releaseTime);
    }
    
    playChord(time, chord, intensity, config) {
        const { frequencies, duration, velocity, arpeggio } = chord;
        
        if (arpeggio) {
            frequencies.forEach((freq, i) => {
                const noteTime = time + i * 0.08;
                this.playChordNote(noteTime, freq, duration * 0.6, velocity * intensity, config);
            });
        } else {
            frequencies.forEach(freq => {
                this.playChordNote(time, freq, duration, velocity * intensity, config);
            });
        }
    }
    
    playChordNote(time, freq, duration, velocity, config) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = config.mood === 'chill' ? 'sine' : 'triangle';
        osc.frequency.value = freq;
        
        osc.connect(gain);
        gain.connect(this.compressor);
        gain.connect(this.convolver);
        
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.15, time + 0.05);
        gain.gain.setValueAtTime(velocity * 0.12, time + duration * 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        osc.start(time);
        osc.stop(time + duration);
        
        this.trackNode(osc, time + duration);
    }
    
    trackNode(node, endTime) {
        this.activeNodes.add(node);
        
        const cleanup = () => {
            this.activeNodes.delete(node);
        };
        
        // Schedule cleanup
        const delay = Math.max(0, (endTime - this.ctx.currentTime) * 1000 + 100);
        setTimeout(cleanup, delay);
    }
    
    // ==========================================
    // Playback Control
    // ==========================================
    
    stop() {
        this.isPlaying = false;
        this.isPaused = false;
        
        if (this.schedulerTimer) {
            clearInterval(this.schedulerTimer);
            this.schedulerTimer = null;
        }
        
        // Clean up active nodes
        this.activeNodes.forEach(node => {
            try {
                node.stop();
                node.disconnect();
            } catch (e) {}
        });
        this.activeNodes.clear();
    }
    
    pause() {
        if (!this.isPlaying || this.isPaused) return;
        
        this.isPaused = true;
        this.pauseTime = this.ctx.currentTime;
        
        if (this.ctx.state === 'running') {
            this.ctx.suspend();
        }
    }
    
    resume() {
        if (!this.isPaused) return;
        
        this.isPaused = false;
        
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        
        // Adjust start time to account for pause
        this.startTime += this.ctx.currentTime - this.pauseTime;
        
        // Restart scheduler
        this.startScheduler();
        this.startProgressTracking();
    }
    
    setVolume(value) {
        if (this.masterGain) {
            this.masterGain.gain.value = Math.max(0, Math.min(1, value));
        }
    }
    
    getVolume() {
        return this.masterGain ? this.masterGain.gain.value : 0.7;
    }
    
    getAnalyserData() {
        if (!this.analyser) return null;
        
        const data = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(data);
        return data;
    }
    
    destroy() {
        this.stop();
        
        if (this.ctx) {
            this.ctx.close();
            this.ctx = null;
        }
    }
}

// Export for ES6 modules
export { ProceduralMusicGenerator, GENRE_CONFIGS, MUSIC_THEORY, SeededRandom, noteToFrequency };

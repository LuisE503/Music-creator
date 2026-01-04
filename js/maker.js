// ============================================
// BeatForge Studio - Professional Music Creation Engine v4.0
// Full DAW with 50+ Instruments, AI Generation, and Advanced Features
// ============================================

console.log('%c🎵 BeatForge Studio v4.0 Loading...', 'color: #6366f1; font-size: 16px; font-weight: bold;');

// ============================================
// CONSTANTS & UTILITIES
// ============================================

const SCALES = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    phrygian: [0, 1, 3, 5, 7, 8, 10],
    lydian: [0, 2, 4, 6, 7, 9, 11],
    mixolydian: [0, 2, 4, 5, 7, 9, 10],
    locrian: [0, 1, 3, 5, 6, 8, 10],
    pentatonic: [0, 2, 4, 7, 9],
    blues: [0, 3, 5, 6, 7, 10],
    chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
    melodic_minor: [0, 2, 3, 5, 7, 9, 11]
};

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const CHORD_TYPES = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7],
    maj7: [0, 4, 7, 11],
    min7: [0, 3, 7, 10],
    dom7: [0, 4, 7, 10]
};

// Utility Functions
const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
const freqToMidi = (freq) => Math.round(69 + 12 * Math.log2(freq / 440));
const dbToGain = (db) => Math.pow(10, db / 20);
const gainToDb = (gain) => 20 * Math.log10(gain);
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const lerp = (a, b, t) => a + (b - a) * t;

// Note name to MIDI
const noteToMidi = (noteName) => {
    const match = noteName.match(/([A-G]#?)(\d+)/);
    if (!match) return 60;
    const [, note, octave] = match;
    const noteIndex = NOTE_NAMES.indexOf(note);
    return (parseInt(octave) + 1) * 12 + noteIndex;
};

// MIDI to note name
const midiToNote = (midi) => {
    const octave = Math.floor(midi / 12) - 1;
    const note = NOTE_NAMES[midi % 12];
    return `${note}${octave}`;
};

// ============================================
// INSTRUMENT LIBRARY (50+ INSTRUMENTS)
// ============================================

const INSTRUMENT_LIBRARY = {
    // === KEYBOARDS ===
    'grand-piano': {
        name: 'Grand Piano',
        category: 'Keyboards',
        icon: '🎹',
        type: 'sampled',
        params: { attack: 0.01, decay: 0.3, sustain: 0.4, release: 1.2, brightness: 0.7 }
    },
    'electric-piano': {
        name: 'Electric Piano',
        category: 'Keyboards',
        icon: '🎹',
        type: 'synthesized',
        waveform: 'sine',
        params: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.8, chorus: 0.3 }
    },
    'rhodes': {
        name: 'Rhodes EP',
        category: 'Keyboards',
        icon: '🎹',
        type: 'synthesized',
        params: { attack: 0.005, decay: 0.15, sustain: 0.6, release: 0.6, warmth: 0.8 }
    },
    'synth-lead': {
        name: 'Synth Lead',
        category: 'Synthesizers',
        icon: '🎛️',
        type: 'synthesized',
        waveform: 'sawtooth',
        params: { attack: 0.01, decay: 0.1, sustain: 0.7, release: 0.3, filter: 3000, resonance: 5 }
    },
    'synth-pad': {
        name: 'Synth Pad',
        category: 'Synthesizers',
        icon: '🎛️',
        type: 'synthesized',
        waveform: 'triangle',
        params: { attack: 0.8, decay: 0.5, sustain: 0.9, release: 2.0, filter: 1500, chorus: 0.5 }
    },
    'synth-bass': {
        name: 'Synth Bass',
        category: 'Bass',
        icon: '🔊',
        type: 'synthesized',
        waveform: 'sawtooth',
        params: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 0.3, filter: 800, resonance: 10 }
    },
    'sub-bass': {
        name: 'Sub Bass',
        category: 'Bass',
        icon: '🔊',
        type: 'synthesized',
        waveform: 'sine',
        params: { attack: 0.01, decay: 0.1, sustain: 0.8, release: 0.2 }
    },
    'fm-bass': {
        name: 'FM Bass',
        category: 'Bass',
        icon: '🔊',
        type: 'fm',
        params: { attack: 0.01, decay: 0.15, sustain: 0.5, release: 0.25, modIndex: 5 }
    },
    'acid-bass': {
        name: 'Acid Bass (303)',
        category: 'Bass',
        icon: '🔊',
        type: 'synthesized',
        waveform: 'square',
        params: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1, filter: 400, resonance: 15 }
    },
    
    // === GUITARS ===
    'acoustic-guitar': {
        name: 'Acoustic Guitar',
        category: 'Guitars',
        icon: '🎸',
        type: 'pluck',
        params: { attack: 0.005, decay: 0.4, sustain: 0.3, release: 0.8, brightness: 0.8 }
    },
    'electric-guitar-clean': {
        name: 'Electric Guitar (Clean)',
        category: 'Guitars',
        icon: '🎸',
        type: 'pluck',
        params: { attack: 0.005, decay: 0.3, sustain: 0.5, release: 0.6, tone: 0.7 }
    },
    'electric-guitar-distorted': {
        name: 'Electric Guitar (Distorted)',
        category: 'Guitars',
        icon: '🎸',
        type: 'pluck',
        params: { attack: 0.01, decay: 0.2, sustain: 0.7, release: 0.5, distortion: 0.8, tone: 0.6 }
    },
    'bass-guitar': {
        name: 'Bass Guitar',
        category: 'Bass',
        icon: '🎸',
        type: 'pluck',
        params: { attack: 0.01, decay: 0.3, sustain: 0.4, release: 0.5, tone: 0.5 }
    },
    
    // === DRUMS ===
    'kick-808': {
        name: '808 Kick',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'kick',
        params: { pitch: 60, decay: 0.5, punch: 0.8 }
    },
    'kick-acoustic': {
        name: 'Acoustic Kick',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'kick',
        params: { pitch: 50, decay: 0.3, punch: 0.6 }
    },
    'snare-acoustic': {
        name: 'Acoustic Snare',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'snare',
        params: { pitch: 200, tone: 0.6, snap: 0.7 }
    },
    'snare-electronic': {
        name: 'Electronic Snare',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'snare',
        params: { pitch: 250, tone: 0.5, snap: 0.9 }
    },
    'hihat-closed': {
        name: 'Hi-Hat Closed',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'hihat',
        params: { pitch: 8000, decay: 0.05, brightness: 0.8 }
    },
    'hihat-open': {
        name: 'Hi-Hat Open',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'hihat',
        params: { pitch: 7500, decay: 0.3, brightness: 0.7 }
    },
    'clap': {
        name: 'Clap',
        category: 'Drums',
        icon: '👏',
        type: 'drum',
        drumType: 'clap',
        params: { spread: 0.012, brightness: 0.8 }
    },
    'tom-high': {
        name: 'Tom High',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'tom',
        params: { pitch: 400, decay: 0.3 }
    },
    'tom-mid': {
        name: 'Tom Mid',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'tom',
        params: { pitch: 300, decay: 0.4 }
    },
    'tom-low': {
        name: 'Tom Low',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'tom',
        params: { pitch: 200, decay: 0.5 }
    },
    'crash-cymbal': {
        name: 'Crash Cymbal',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'cymbal',
        params: { decay: 2.0, brightness: 0.9 }
    },
    'ride-cymbal': {
        name: 'Ride Cymbal',
        category: 'Drums',
        icon: '🥁',
        type: 'drum',
        drumType: 'cymbal',
        params: { decay: 1.5, brightness: 0.7 }
    },
    
    // === BRASS ===
    'trumpet': {
        name: 'Trumpet',
        category: 'Brass',
        icon: '🎺',
        type: 'brass',
        params: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 0.3, brightness: 0.8 }
    },
    'trombone': {
        name: 'Trombone',
        category: 'Brass',
        icon: '🎺',
        type: 'brass',
        params: { attack: 0.15, decay: 0.2, sustain: 0.8, release: 0.4, brightness: 0.6 }
    },
    'french-horn': {
        name: 'French Horn',
        category: 'Brass',
        icon: '🎺',
        type: 'brass',
        params: { attack: 0.2, decay: 0.3, sustain: 0.7, release: 0.5, brightness: 0.5 }
    },
    
    // === WOODWINDS ===
    'flute': {
        name: 'Flute',
        category: 'Woodwinds',
        icon: '🎵',
        type: 'woodwind',
        params: { attack: 0.05, decay: 0.1, sustain: 0.8, release: 0.3, breathiness: 0.3 }
    },
    'clarinet': {
        name: 'Clarinet',
        category: 'Woodwinds',
        icon: '🎵',
        type: 'woodwind',
        params: { attack: 0.08, decay: 0.15, sustain: 0.8, release: 0.4, warmth: 0.7 }
    },
    'saxophone': {
        name: 'Saxophone',
        category: 'Woodwinds',
        icon: '🎷',
        type: 'woodwind',
        params: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 0.4, breathiness: 0.5 }
    },
    
    // === STRINGS ===
    'violin': {
        name: 'Violin',
        category: 'Strings',
        icon: '🎻',
        type: 'string',
        params: { attack: 0.1, decay: 0.2, sustain: 0.9, release: 0.5, vibrato: 0.4 }
    },
    'cello': {
        name: 'Cello',
        category: 'Strings',
        icon: '🎻',
        type: 'string',
        params: { attack: 0.15, decay: 0.3, sustain: 0.9, release: 0.6, vibrato: 0.3, warmth: 0.8 }
    },
    'string-ensemble': {
        name: 'String Ensemble',
        category: 'Strings',
        icon: '🎻',
        type: 'string',
        params: { attack: 0.3, decay: 0.4, sustain: 0.9, release: 1.0, chorus: 0.6 }
    },
    
    // === ELECTRONIC / HYPERPOP ===
    'hyperpop-lead': {
        name: 'Hyperpop Lead',
        category: 'Electronic',
        icon: '⚡',
        type: 'synthesized',
        waveform: 'square',
        params: { attack: 0.001, decay: 0.05, sustain: 0.8, release: 0.1, filter: 5000, resonance: 20, distortion: 0.5 }
    },
    'hyperpop-bass': {
        name: 'Hyperpop Bass',
        category: 'Electronic',
        icon: '⚡',
        type: 'synthesized',
        waveform: 'sawtooth',
        params: { attack: 0.001, decay: 0.1, sustain: 0.7, release: 0.15, filter: 1000, resonance: 15, distortion: 0.7 }
    },
    'glitch-synth': {
        name: 'Glitch Synth',
        category: 'Electronic',
        icon: '⚡',
        type: 'synthesized',
        waveform: 'square',
        params: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05, bitcrush: 0.6 }
    },
    'supersaw': {
        name: 'Supersaw',
        category: 'Electronic',
        icon: '⚡',
        type: 'synthesized',
        waveform: 'sawtooth',
        params: { attack: 0.01, decay: 0.2, sustain: 0.8, release: 0.5, detune: 7, voices: 7 }
    },
    'pluck-synth': {
        name: 'Pluck Synth',
        category: 'Electronic',
        icon: '⚡',
        type: 'synthesized',
        waveform: 'square',
        params: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.2, filter: 4000 }
    },
    'bell-synth': {
        name: 'Bell Synth',
        category: 'Electronic',
        icon: '🔔',
        type: 'fm',
        params: { attack: 0.001, decay: 0.5, sustain: 0.3, release: 1.0, modIndex: 10 }
    },
    
    // === PERCUSSION ===
    'bongo': {
        name: 'Bongo',
        category: 'Percussion',
        icon: '🥁',
        type: 'drum',
        drumType: 'perc',
        params: { pitch: 400, decay: 0.15 }
    },
    'conga': {
        name: 'Conga',
        category: 'Percussion',
        icon: '🥁',
        type: 'drum',
        drumType: 'perc',
        params: { pitch: 300, decay: 0.25 }
    },
    'cowbell': {
        name: 'Cowbell',
        category: 'Percussion',
        icon: '🔔',
        type: 'drum',
        drumType: 'perc',
        params: { pitch: 800, decay: 0.2 }
    },
    'shaker': {
        name: 'Shaker',
        category: 'Percussion',
        icon: '🥁',
        type: 'drum',
        drumType: 'noise',
        params: { decay: 0.08, brightness: 0.9 }
    },
    'tambourine': {
        name: 'Tambourine',
        category: 'Percussion',
        icon: '🥁',
        type: 'drum',
        drumType: 'noise',
        params: { decay: 0.3, brightness: 0.95 }
    },
    
    // === ORGANS & KEYS ===
    'hammond-organ': {
        name: 'Hammond Organ',
        category: 'Keyboards',
        icon: '🎹',
        type: 'organ',
        params: { attack: 0.01, decay: 0.1, sustain: 0.9, release: 0.2, drawbars: [8,8,6,0,0,0,0,0,0] }
    },
    'church-organ': {
        name: 'Church Organ',
        category: 'Keyboards',
        icon: '🎹',
        type: 'organ',
        params: { attack: 0.1, decay: 0.2, sustain: 0.9, release: 0.5, reverb: 0.8 }
    },
    'harpsichord': {
        name: 'Harpsichord',
        category: 'Keyboards',
        icon: '🎹',
        type: 'pluck',
        params: { attack: 0.001, decay: 0.4, sustain: 0, release: 0.4, brightness: 0.9 }
    },
    
    // === VOCALS & CHOIR ===
    'choir-ahh': {
        name: 'Choir Ahh',
        category: 'Vocals',
        icon: '👥',
        type: 'vocal',
        params: { attack: 0.3, decay: 0.2, sustain: 0.9, release: 0.8, formant: 'ahh' }
    },
    'choir-ooh': {
        name: 'Choir Ooh',
        category: 'Vocals',
        icon: '👥',
        type: 'vocal',
        params: { attack: 0.3, decay: 0.2, sustain: 0.9, release: 0.8, formant: 'ooh' }
    }
};

// ============================================
// AUDIO ENGINE CORE
// ============================================

class AudioEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.compressor = null;
        this.limiter = null;
        this.analyser = null;
        this.isInitialized = false;
        
        // Effects buses
        this.reverbSend = null;
        this.delaySend = null;
        this.chorusSend = null;
        
        this.reverb = null;
        this.delay = null;
        this.chorus = null;
        
        // Sample cache
        this.sampleCache = new Map();
        
        // Active voices for polyphony management
        this.activeVoices = [];
        this.maxPolyphony = 64;
    }

    async init() {
        if (this.isInitialized) return;
        
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Master chain
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.value = -24;
        this.compressor.knee.value = 30;
        this.compressor.ratio.value = 12;
        this.compressor.attack.value = 0.003;
        this.compressor.release.value = 0.25;
        
        this.limiter = this.ctx.createDynamicsCompressor();
        this.limiter.threshold.value = -1;
        this.limiter.knee.value = 0;
        this.limiter.ratio.value = 20;
        this.limiter.attack.value = 0.001;
        this.limiter.release.value = 0.1;
        
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.8;
        
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 4096;
        this.analyser.smoothingTimeConstant = 0.8;
        
        // Create effects
        this.reverb = await this.createConvolutionReverb();
        this.delay = this.createDelay();
        this.chorus = this.createChorus();
        
        // Effect sends
        this.reverbSend = this.ctx.createGain();
        this.reverbSend.gain.value = 1.0;
        
        this.delaySend = this.ctx.createGain();
        this.delaySend.gain.value = 1.0;
        
        this.chorusSend = this.ctx.createGain();
        this.chorusSend.gain.value = 1.0;
        
        // Routing
        this.reverbSend.connect(this.reverb.input);
        this.reverb.output.connect(this.masterGain);
        
        this.delaySend.connect(this.delay.input);
        this.delay.output.connect(this.masterGain);
        
        this.chorusSend.connect(this.chorus.input);
        this.chorus.output.connect(this.masterGain);
        
        this.compressor.connect(this.limiter);
        this.limiter.connect(this.masterGain);
        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
        
        this.isInitialized = true;
        console.log('%c✓ Audio Engine Initialized', 'color: #10b981; font-weight: bold');
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            return this.ctx.resume();
        }
    }

    async createConvolutionReverb() {
        const duration = 2;
        const decay = 2.5;
        const sampleRate = this.ctx.sampleRate;
        const length = sampleRate * duration;
        const impulse = this.ctx.createBuffer(2, length, sampleRate);
        
        for (let channel = 0; channel < 2; channel++) {
            const data = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                const t = i / length;
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
            }
        }
        
        const convolver = this.ctx.createConvolver();
        convolver.buffer = impulse;
        
        const wetGain = this.ctx.createGain();
        wetGain.gain.value = 0.6;
        
        convolver.connect(wetGain);
        
        return { input: convolver, output: wetGain };
    }

    createDelay() {
        const delay = this.ctx.createDelay(2);
        delay.delayTime.value = 0.375; // dotted 8th at 120bpm
        
        const feedback = this.ctx.createGain();
        feedback.gain.value = 0.35;
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 4000;
        
        const wetGain = this.ctx.createGain();
        wetGain.gain.value = 0.4;
        
        delay.connect(filter);
        filter.connect(feedback);
        feedback.connect(delay);
        delay.connect(wetGain);
        
        return { input: delay, output: wetGain, feedback, filter };
    }

    createChorus() {
        const input = this.ctx.createGain();
        const output = this.ctx.createGain();
        const dry = this.ctx.createGain();
        dry.gain.value = 0.7;
        
        const voices = [];
        const numVoices = 3;
        
        for (let i = 0; i < numVoices; i++) {
            const delay = this.ctx.createDelay(0.1);
            delay.delayTime.value = 0.02 + i * 0.008;
            
            const lfo = this.ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = 1.5 + i * 0.2;
            
            const lfoGain = this.ctx.createGain();
            lfoGain.gain.value = 0.003;
            
            const wet = this.ctx.createGain();
            wet.gain.value = 0.15;
            
            lfo.connect(lfoGain);
            lfoGain.connect(delay.delayTime);
            input.connect(delay);
            delay.connect(wet);
            wet.connect(output);
            
            lfo.start();
            voices.push({ delay, lfo, lfoGain, wet });
        }
        
        input.connect(dry);
        dry.connect(output);
        
        return { input, output, voices };
    }

    createNoise(duration) {
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }

    // Voice management
    addVoice(voice) {
        this.activeVoices.push(voice);
        if (this.activeVoices.length > this.maxPolyphony) {
            const oldest = this.activeVoices.shift();
            if (oldest && oldest.stop) oldest.stop();
        }
    }

    removeVoice(voice) {
        const index = this.activeVoices.indexOf(voice);
        if (index > -1) this.activeVoices.splice(index, 1);
    }

    // Main playback method
    playNote(instrumentId, note, time, duration, velocity = 1.0, trackParams = {}) {
        const instrument = INSTRUMENT_LIBRARY[instrumentId];
        if (!instrument) {
            console.warn(`Instrument ${instrumentId} not found`);
            return;
        }

        const midi = typeof note === 'number' ? note : noteToMidi(note);
        const freq = midiToFreq(midi);

        switch (instrument.type) {
            case 'drum':
                this.playDrum(instrument, time, velocity, trackParams);
                break;
            case 'synthesized':
                this.playSynth(instrument, freq, time, duration, velocity, trackParams);
                break;
            case 'pluck':
                this.playPluck(instrument, freq, time, duration, velocity, trackParams);
                break;
            case 'fm':
                this.playFM(instrument, freq, time, duration, velocity, trackParams);
                break;
            case 'organ':
                this.playOrgan(instrument, freq, time, duration, velocity, trackParams);
                break;
            case 'brass':
            case 'woodwind':
            case 'string':
            case 'vocal':
                this.playSampledInstrument(instrument, freq, time, duration, velocity, trackParams);
                break;
            default:
                this.playSynth(instrument, freq, time, duration, velocity, trackParams);
        }
    }

    playSynth(instrument, freq, time, duration, velocity, trackParams) {
        const params = { ...instrument.params, ...trackParams };
        const waveform = instrument.waveform || 'triangle';
        
        // Create oscillator
        const osc = this.ctx.createOscillator();
        osc.type = waveform;
        osc.frequency.value = freq;
        
        // Detune for supersaw effect
        const voices = [];
        if (params.voices && params.voices > 1) {
            for (let i = 1; i < params.voices; i++) {
                const voice = this.ctx.createOscillator();
                voice.type = waveform;
                voice.frequency.value = freq;
                voice.detune.value = (Math.random() - 0.5) * (params.detune || 10);
                voices.push(voice);
            }
        }
        
        // Filter
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = params.filter || 2000;
        filter.Q.value = params.resonance || 1;
        
        // ADSR Envelope
        const envelope = this.ctx.createGain();
        envelope.gain.setValueAtTime(0, time);
        envelope.gain.linearRampToValueAtTime(velocity * 0.5, time + params.attack);
        envelope.gain.linearRampToValueAtTime(velocity * 0.5 * params.sustain, time + params.attack + params.decay);
        envelope.gain.setValueAtTime(velocity * 0.5 * params.sustain, time + duration - params.release);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        // Routing
        osc.connect(filter);
        voices.forEach(v => v.connect(filter));
        filter.connect(envelope);
        
        this.connectToMaster(envelope, trackParams);
        
        // Start/Stop
        const startTime = time;
        const stopTime = time + duration;
        osc.start(startTime);
        osc.stop(stopTime);
        voices.forEach(v => {
            v.start(startTime);
            v.stop(stopTime);
        });
        
        this.addVoice({ stop: () => { osc.stop(); voices.forEach(v => v.stop()); } });
    }

    playDrum(instrument, time, velocity, trackParams) {
        const params = { ...instrument.params, ...trackParams };
        
        switch (instrument.drumType) {
            case 'kick':
                this.playKick(time, params, velocity);
                break;
            case 'snare':
                this.playSnare(time, params, velocity);
                break;
            case 'hihat':
                this.playHiHat(time, params, velocity);
                break;
            case 'clap':
                this.playClap(time, params, velocity);
                break;
            case 'tom':
                this.playTom(time, params, velocity);
                break;
            case 'cymbal':
                this.playCymbal(time, params, velocity);
                break;
            case 'perc':
                this.playPerc(time, params, velocity);
                break;
            case 'noise':
                this.playNoiseHit(time, params, velocity);
                break;
        }
    }

    playKick(time, params, velocity) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        const pitch = params.pitch || 60;
        osc.frequency.setValueAtTime(pitch, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + 0.05);
        
        const decay = params.decay || 0.5;
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.9 * (params.punch || 1), time + 0.001);
        gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
        
        osc.connect(gain);
        this.connectToMaster(gain, params);
        
        osc.start(time);
        osc.stop(time + decay);
    }

    playSnare(time, params, velocity) {
        // Noise component
        const noiseBuffer = this.createNoise(0.2);
        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        
        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 2000;
        
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(velocity * 0.5, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        
        // Tone component
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        const pitch = params.pitch || 200;
        osc.frequency.setValueAtTime(pitch, time);
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, time + 0.1);
        
        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(velocity * 0.5, time);
        oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        
        osc.connect(oscGain);
        
        const mixer = this.ctx.createGain();
        noiseGain.connect(mixer);
        oscGain.connect(mixer);
        
        this.connectToMaster(mixer, params);
        
        noise.start(time);
        noise.stop(time + 0.2);
        osc.start(time);
        osc.stop(time + 0.15);
    }

    playHiHat(time, params, velocity) {
        const duration = params.decay || 0.05;
        const noiseBuffer = this.createNoise(duration);
        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 7000;
        
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = params.pitch || 8000;
        bp.Q.value = 2;
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(velocity * 0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        noise.connect(hp);
        hp.connect(bp);
        bp.connect(gain);
        
        this.connectToMaster(gain, params);
        
        noise.start(time);
        noise.stop(time + duration);
    }

    playClap(time, params, velocity) {
        const spread = params.spread || 0.012;
        const mixer = this.ctx.createGain();
        
        for (let i = 0; i < 3; i++) {
            const delay = i * spread;
            const noiseBuffer = this.createNoise(0.1);
            const noise = this.ctx.createBufferSource();
            noise.buffer = noiseBuffer;
            
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1500;
            filter.Q.value = 2;
            
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(velocity * 0.2, time + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.08);
            
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(mixer);
            
            noise.start(time + delay);
            noise.stop(time + delay + 0.1);
        }
        
        this.connectToMaster(mixer, params);
    }

    playTom(time, params, velocity) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        const pitch = params.pitch || 300;
        osc.frequency.setValueAtTime(pitch, time);
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, time + 0.1);
        
        const decay = params.decay || 0.4;
        gain.gain.setValueAtTime(velocity * 0.7, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
        
        osc.connect(gain);
        this.connectToMaster(gain, params);
        
        osc.start(time);
        osc.stop(time + decay);
    }

    playCymbal(time, params, velocity) {
        const duration = params.decay || 2.0;
        const noiseBuffer = this.createNoise(duration);
        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 5000;
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(velocity * 0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        noise.connect(hp);
        hp.connect(gain);
        
        this.connectToMaster(gain, params);
        
        noise.start(time);
        noise.stop(time + duration);
    }

    playPerc(time, params, velocity) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        const pitch = params.pitch || 420;
        osc.frequency.setValueAtTime(pitch, time);
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, time + 0.1);
        
        const decay = params.decay || 0.15;
        gain.gain.setValueAtTime(velocity * 0.5, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
        
        osc.connect(gain);
        this.connectToMaster(gain, params);
        
        osc.start(time);
        osc.stop(time + decay);
    }

    playNoiseHit(time, params, velocity) {
        const duration = params.decay || 0.1;
        const noiseBuffer = this.createNoise(duration);
        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 5000;
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(velocity * 0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        noise.connect(filter);
        filter.connect(gain);
        
        this.connectToMaster(gain, params);
        
        noise.start(time);
        noise.stop(time + duration);
    }

    playPluck(instrument, freq, time, duration, velocity, trackParams) {
        const params = { ...instrument.params, ...trackParams };
        
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(freq * 4, time);
        filter.frequency.exponentialRampToValueAtTime(freq * 0.5, time + duration * 0.5);
        filter.Q.value = params.resonance || 2;
        
        const envelope = this.ctx.createGain();
        envelope.gain.setValueAtTime(0, time);
        envelope.gain.linearRampToValueAtTime(velocity * 0.4, time + (params.attack || 0.005));
        envelope.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        osc.connect(filter);
        filter.connect(envelope);
        
        this.connectToMaster(envelope, trackParams);
        
        osc.start(time);
        osc.stop(time + duration);
    }

    playFM(instrument, freq, time, duration, velocity, trackParams) {
        const params = { ...instrument.params, ...trackParams };
        
        const carrier = this.ctx.createOscillator();
        carrier.frequency.value = freq;
        
        const modulator = this.ctx.createOscillator();
        modulator.frequency.value = freq * 2;
        
        const modGain = this.ctx.createGain();
        modGain.gain.value = freq * (params.modIndex || 5);
        
        const envelope = this.ctx.createGain();
        envelope.gain.setValueAtTime(0, time);
        envelope.gain.linearRampToValueAtTime(velocity * 0.4, time + params.attack);
        envelope.gain.linearRampToValueAtTime(velocity * 0.4 * params.sustain, time + params.attack + params.decay);
        envelope.gain.setValueAtTime(velocity * 0.4 * params.sustain, time + duration - params.release);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        modulator.connect(modGain);
        modGain.connect(carrier.frequency);
        carrier.connect(envelope);
        
        this.connectToMaster(envelope, trackParams);
        
        carrier.start(time);
        modulator.start(time);
        carrier.stop(time + duration);
        modulator.stop(time + duration);
    }

    playOrgan(instrument, freq, time, duration, velocity, trackParams) {
        const params = { ...instrument.params, ...trackParams };
        const drawbars = params.drawbars || [8,8,8,0,0,0,0,0,0];
        
        const harmonics = [0.5, 1, 2, 3, 4, 5, 6, 8, 10.67];
        const mixer = this.ctx.createGain();
        
        harmonics.forEach((harmonic, i) => {
            if (drawbars[i] > 0) {
                const osc = this.ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = freq * harmonic;
                
                const gain = this.ctx.createGain();
                gain.gain.value = (drawbars[i] / 9) * 0.15;
                
                osc.connect(gain);
                gain.connect(mixer);
                
                osc.start(time);
                osc.stop(time + duration);
            }
        });
        
        const envelope = this.ctx.createGain();
        envelope.gain.setValueAtTime(0, time);
        envelope.gain.linearRampToValueAtTime(velocity, time + params.attack);
        envelope.gain.setValueAtTime(velocity * params.sustain, time + duration - params.release);
        envelope.gain.linearRampToValueAtTime(0, time + duration);
        
        mixer.connect(envelope);
        this.connectToMaster(envelope, trackParams);
    }

    playSampledInstrument(instrument, freq, time, duration, velocity, trackParams) {
        // Fallback to synthesis for brass/woodwind/strings
        // In a real implementation, these would use samples
        this.playSynth(instrument, freq, time, duration, velocity, trackParams);
    }

    connectToMaster(source, trackParams = {}) {
        const vol = dbToGain(trackParams.vol || 0);
        const volGain = this.ctx.createGain();
        volGain.gain.value = vol;
        
        const panner = this.ctx.createStereoPanner();
        panner.pan.value = clamp(trackParams.pan || 0, -1, 1);
        
        source.connect(volGain);
        volGain.connect(panner);
        panner.connect(this.compressor);
        
        // Effects sends
        if (trackParams.reverb > 0) {
            const send = this.ctx.createGain();
            send.gain.value = trackParams.reverb;
            panner.connect(send);
            send.connect(this.reverbSend);
        }
        
        if (trackParams.delay > 0) {
            const send = this.ctx.createGain();
            send.gain.value = trackParams.delay;
            panner.connect(send);
            send.connect(this.delaySend);
        }
        
        if (trackParams.chorus > 0) {
            const send = this.ctx.createGain();
            send.gain.value = trackParams.chorus;
            panner.connect(send);
            send.connect(this.chorusSend);
        }
    }
}

// ============================================
// SEQUENCER & TRANSPORT
// ============================================

class Sequencer {
    constructor(audioEngine) {
        this.engine = audioEngine;
        this.bpm = 120;
        this.tracks = [];
        this.isPlaying = false;
        this.isRecording = false;
        this.currentBeat = 0;
        this.startTime = 0;
        this.loopStart = 0;
        this.loopEnd = 16;
        this.loopEnabled = false;
        this.nextNoteTime = 0;
        this.scheduleAheadTime = 0.1;
        this.lookahead = 25.0;
        this.timerID = null;
        this.key = 'C';
        this.scale = 'major';
        this.timeSignature = [4, 4];
    }

    createTrack(name, instrumentId) {
        const track = {
            id: Date.now() + Math.random(),
            name: name,
            instrument: instrumentId,
            volume: 0,
            pan: 0,
            mute: false,
            solo: false,
            notes: [],
            clips: [],
            effects: {
                reverb: 0,
                delay: 0,
                chorus: 0
            },
            automation: {
                volume: [],
                pan: [],
                filter: []
            }
        };
        this.tracks.push(track);
        return track;
    }

    deleteTrack(trackId) {
        const index = this.tracks.findIndex(t => t.id === trackId);
        if (index > -1) {
            this.tracks.splice(index, 1);
        }
    }

    addNote(trackId, note, start, duration, velocity = 0.8) {
        const track = this.tracks.find(t => t.id === trackId);
        if (!track) return;
        
        track.notes.push({
            id: Date.now() + Math.random(),
            note,
            start,
            duration,
            velocity
        });
        track.notes.sort((a, b) => a.start - b.start);
    }

    removeNote(trackId, noteId) {
        const track = this.tracks.find(t => t.id === trackId);
        if (!track) return;
        
        const index = track.notes.findIndex(n => n.id === noteId);
        if (index > -1) {
            track.notes.splice(index, 1);
        }
    }

    play() {
        if (this.isPlaying) return;
        
        this.engine.resume();
        this.isPlaying = true;
        this.currentBeat = 0;
        this.nextNoteTime = this.engine.ctx.currentTime;
        this.startTime = this.engine.ctx.currentTime;
        this.scheduler();
    }

    stop() {
        this.isPlaying = false;
        this.currentBeat = 0;
        if (this.timerID) {
            clearTimeout(this.timerID);
            this.timerID = null;
        }
    }

    pause() {
        this.isPlaying = false;
        if (this.timerID) {
            clearTimeout(this.timerID);
            this.timerID = null;
        }
    }

    toggleRecord() {
        this.isRecording = !this.isRecording;
        if (this.isRecording && !this.isPlaying) {
            this.play();
        }
    }

    scheduler() {
        while (this.nextNoteTime < this.engine.ctx.currentTime + this.scheduleAheadTime) {
            this.scheduleNotes(this.currentBeat, this.nextNoteTime);
            this.nextNote();
        }
        if (this.isPlaying) {
            this.timerID = setTimeout(() => this.scheduler(), this.lookahead);
        }
    }

    scheduleNotes(beat, time) {
        // Check all tracks for notes at this beat
        this.tracks.forEach(track => {
            if (track.mute) return;
            
            const soloTrack = this.tracks.find(t => t.solo);
            if (soloTrack && track.id !== soloTrack.id) return;
            
            track.notes.forEach(note => {
                const noteStart = note.start;
                const beatDiff = Math.abs(beat - noteStart);
                
                if (beatDiff < 0.01) { // Tolerance for floating point
                    const trackParams = {
                        vol: track.volume,
                        pan: track.pan,
                        reverb: track.effects.reverb,
                        delay: track.effects.delay,
                        chorus: track.effects.chorus
                    };
                    
                    this.engine.playNote(
                        track.instrument,
                        note.note,
                        time,
                        this.beatsToDuration(note.duration),
                        note.velocity,
                        trackParams
                    );
                }
            });
        });
    }

    nextNote() {
        const secondsPerBeat = 60.0 / this.bpm / (this.timeSignature[1] / 4);
        this.nextNoteTime += 0.25 * secondsPerBeat; // 16th note precision
        this.currentBeat += 0.25;
        
        if (this.loopEnabled) {
            if (this.currentBeat >= this.loopEnd) {
                this.currentBeat = this.loopStart;
            }
        }
    }

    beatsToDuration(beats) {
        return (beats * 60.0) / this.bpm;
    }

    setBPM(bpm) {
        this.bpm = clamp(bpm, 30, 300);
    }

    setLoop(start, end) {
        this.loopStart = start;
        this.loopEnd = end;
        this.loopEnabled = true;
    }

    getCurrentTime() {
        if (!this.isPlaying) return 0;
        return this.currentBeat;
    }
}

// ============================================
// NOTATION PARSER
// ============================================

class NotationParser {
    constructor() {
        this.defaultDuration = 1; // quarter note
        this.defaultOctave = 4;
    }

    // Parse simplified notation: "C4-q D4-q E4-h F4-q"
    // Format: NOTE[OCTAVE]-DURATION
    // Durations: w=whole, h=half, q=quarter, e=eighth, s=sixteenth
    parse(notationString) {
        const notes = [];
        const tokens = notationString.trim().split(/\s+/);
        let currentBeat = 0;
        
        const durationMap = {
            'w': 4,    // whole note
            'h': 2,    // half note
            'q': 1,    // quarter note
            'e': 0.5,  // eighth note
            's': 0.25, // sixteenth note
            't': 0.333 // triplet eighth
        };
        
        tokens.forEach(token => {
            // Match format: C4-q or C#4-q or rest-q
            const match = token.match(/^([A-G]#?)(\d+)?-([whqest])$/i);
            if (match) {
                const [, noteName, octave, durCode] = match;
                const duration = durationMap[durCode.toLowerCase()] || 1;
                
                if (noteName.toLowerCase() !== 'rest') {
                    const midiNote = noteToMidi(noteName + (octave || this.defaultOctave));
                    notes.push({
                        note: midiNote,
                        start: currentBeat,
                        duration: duration,
                        velocity: 0.8
                    });
                }
                
                currentBeat += duration;
            }
        });
        
        return notes;
    }

    // Parse chord notation: "Cmaj-q Dm7-h"
    parseChords(chordString) {
        const notes = [];
        const tokens = chordString.trim().split(/\s+/);
        let currentBeat = 0;
        
        const durationMap = {
            'w': 4, 'h': 2, 'q': 1, 'e': 0.5, 's': 0.25
        };
        
        tokens.forEach(token => {
            const match = token.match(/^([A-G]#?)(maj|min|dim|aug|sus2|sus4|maj7|min7|dom7)?(\d+)?-([whqes])$/i);
            if (match) {
                const [, root, quality, octave, durCode] = match;
                const duration = durationMap[durCode.toLowerCase()] || 1;
                const baseOctave = parseInt(octave) || 4;
                const rootMidi = noteToMidi(root + baseOctave);
                
                const chordType = CHORD_TYPES[quality?.toLowerCase() || 'major'] || CHORD_TYPES.major;
                
                chordType.forEach(interval => {
                    notes.push({
                        note: rootMidi + interval,
                        start: currentBeat,
                        duration: duration,
                        velocity: 0.7
                    });
                });
                
                currentBeat += duration;
            }
        });
        
        return notes;
    }

    // Generate melody from scale and pattern
    generateMelody(rootNote, scale, pattern, octave = 4) {
        const scaleIntervals = SCALES[scale] || SCALES.major;
        const rootMidi = noteToMidi(rootNote + octave);
        const notes = [];
        let currentBeat = 0;
        
        pattern.forEach(({ degree, duration, velocity }) => {
            const interval = scaleIntervals[degree % scaleIntervals.length];
            const octaveOffset = Math.floor(degree / scaleIntervals.length) * 12;
            const midiNote = rootMidi + interval + octaveOffset;
            
            notes.push({
                note: midiNote,
                start: currentBeat,
                duration: duration || 1,
                velocity: velocity || 0.8
            });
            
            currentBeat += duration || 1;
        });
        
        return notes;
    }
}

// ============================================
// AI COMPOSER (Music Generation)
// ============================================

class AIComposer {
    constructor(sequencer) {
        this.sequencer = sequencer;
        this.isGenerating = false;
        this.apiEndpoint = null; // Will implement with free API
    }

    async generateWithAI(options = {}) {
        // Placeholder for AI generation using free API
        // Options: artistStyle, mood, complexity, duration
        console.log('AI Generation requested:', options);
        
        // For now, use procedural generation
        // TODO: Integrate with Hugging Face Inference API or Replicate
        return this.proceduralGenerate(options);
    }

    proceduralGenerate(options = {}) {
        const {
            artistStyle = 'default',
            mood = 'happy',
            complexity = 0.5,
            bars = 8,
            trackId = null
        } = options;
        
        console.log(`Generating ${artistStyle} style composition...`);
        
        // Get active track or create new one
        let track = trackId ? this.sequencer.tracks.find(t => t.id === trackId) : null;
        if (!track && this.sequencer.tracks.length > 0) {
            track = this.sequencer.tracks[0];
        }
        if (!track) {
            track = this.sequencer.createTrack('AI Generated', 'synth-lead');
        }
        
        // Generate based on style
        const styleGenerators = {
            'edm': () => this.generateEDM(track, bars, complexity),
            'lofi': () => this.generateLofi(track, bars, complexity),
            'rock': () => this.generateRock(track, bars, complexity),
            'jazz': () => this.generateJazz(track, bars, complexity),
            'classical': () => this.generateClassical(track, bars, complexity),
            'hiphop': () => this.generateHipHop(track, bars, complexity),
            'hyperpop': () => this.generateHyperpop(track, bars, complexity),
            'default': () => this.generateGeneric(track, bars, complexity)
        };
        
        const generator = styleGenerators[artistStyle.toLowerCase()] || styleGenerators.default;
        generator();
        
        return { success: true, trackId: track.id };
    }

    generateEDM(track, bars, complexity) {
        const beatsPerBar = 4;
        const totalBeats = bars * beatsPerBar;
        
        // Kick pattern
        for (let i = 0; i < totalBeats; i += 1) {
            this.sequencer.addNote(track.id, 36, i, 0.5, 0.9); // C1 kick
        }
        
        // Clap on 2 and 4
        for (let bar = 0; bar < bars; bar++) {
            this.sequencer.addNote(track.id, 38, bar * 4 + 1, 0.25, 0.8); // Snare
            this.sequencer.addNote(track.id, 38, bar * 4 + 3, 0.25, 0.8);
        }
        
        // Hi-hats
        for (let i = 0; i < totalBeats * 2; i += 0.5) {
            const vel = (i % 1 === 0) ? 0.6 : 0.4;
            this.sequencer.addNote(track.id, 42, i, 0.25, vel); // Closed hat
        }
        
        // Bassline
        const bassNotes = [36, 36, 39, 36, 41, 36, 39, 36];
        bassNotes.forEach((note, i) => {
            if (i % 2 === 0) {
                this.sequencer.addNote(track.id, note, i, 0.75, 0.8);
            }
        });
    }

    generateLofi(track, bars, complexity) {
        const chords = [
            [60, 64, 67], // C major
            [57, 60, 64], // A minor
            [65, 69, 72], // F major
            [62, 65, 69]  // D minor
        ];
        
        chords.forEach((chord, i) => {
            const startBeat = i * 4;
            chord.forEach(note => {
                this.sequencer.addNote(track.id, note, startBeat, 3.5, 0.6);
            });
        });
        
        // Jazzy melody on top
        const melody = [72, 74, 76, 74, 72, 69, 67, 64];
        melody.forEach((note, i) => {
            this.sequencer.addNote(track.id, note, i * 2 + 0.5, 0.75, 0.5);
        });
    }

    generateHyperpop(track, bars, complexity) {
        // Rapid arpeggios
        const chord = [60, 64, 67, 72];
        for (let bar = 0; bar < bars; bar++) {
            chord.forEach((note, i) => {
                for (let j = 0; j < 4; j++) {
                    const beat = bar * 4 + j * 0.25 + i * 0.0625;
                    this.sequencer.addNote(track.id, note + 12, beat, 0.0625, 0.9);
                }
            });
        }
        
        // Glitchy high notes
        for (let i = 0; i < bars * 4; i += 0.5) {
            if (Math.random() > 0.6) {
                const note = 84 + Math.floor(Math.random() * 12);
                this.sequencer.addNote(track.id, note, i, 0.125, 1.0);
            }
        }
    }

    generateGeneric(track, bars, complexity) {
        const scale = SCALES.major;
        const rootNote = 60; // C4
        
        for (let i = 0; i < bars * 4; i++) {
            if (Math.random() < 0.5 + complexity * 0.5) {
                const degree = Math.floor(Math.random() * scale.length);
                const note = rootNote + scale[degree] + (Math.floor(Math.random() * 2) * 12);
                const duration = [0.25, 0.5, 1][Math.floor(Math.random() * 3)];
                this.sequencer.addNote(track.id, note, i, duration, 0.7);
            }
        }
    }

    generateRock(track, bars, complexity) {
        // Power chords
        const powerChords = [
            [40, 47], // E power chord
            [45, 52], // A power chord
            [38, 45], // D power chord
            [43, 50]  // G power chord
        ];
        
        powerChords.forEach((chord, i) => {
            const beat = i * 4;
            chord.forEach(note => {
                this.sequencer.addNote(track.id, note, beat, 3.5, 0.8);
            });
        });
    }

    generateJazz(track, bars, complexity) {
        // Jazz chord progression
        const jazzChords = [
            [60, 64, 67, 71], // Cmaj7
            [57, 60, 64, 67], // Am7
            [62, 65, 69, 72], // Dm7
            [55, 59, 62, 65]  // G7
        ];
        
        jazzChords.forEach((chord, i) => {
            const beat = i * 4;
            chord.forEach((note, j) => {
                this.sequencer.addNote(track.id, note, beat + j * 0.125, 3.5, 0.6);
            });
        });
    }

    generateClassical(track, bars, complexity) {
        // Arpeggiated classical pattern
        const arpeggio = [48, 52, 55, 60, 55, 52];
        for (let bar = 0; bar < bars; bar++) {
            arpeggio.forEach((note, i) => {
                const beat = bar * 4 + i * 0.667;
                this.sequencer.addNote(track.id, note, beat, 0.5, 0.7);
            });
        }
    }

    generateHipHop(track, bars, complexity) {
        // Trap-style hi-hats
        for (let i = 0; i < bars * 4 * 2; i += 0.25) {
            if (Math.random() > 0.3) {
                const vel = Math.random() * 0.3 + 0.5;
                this.sequencer.addNote(track.id, 42, i, 0.125, vel);
            }
        }
        
        // 808 kick
        for (let i = 0; i < bars * 4; i += 2) {
            this.sequencer.addNote(track.id, 36, i, 0.5, 0.9);
        }
        
        // Snare on 2 and 4
        for (let bar = 0; bar < bars; bar++) {
            this.sequencer.addNote(track.id, 38, bar * 4 + 1, 0.25, 0.8);
            this.sequencer.addNote(track.id, 38, bar * 4 + 3, 0.25, 0.8);
        }
    }
}

// ============================================
// UI CONTROLLER
// ============================================

class DAWController {
    constructor() {
        this.engine = null;
        this.sequencer = null;
        this.notation = null;
        this.aiComposer = null;
        this.currentTrack = null;
        this.currentView = 'sequencer';
        this.gridSize = 16; // 16th notes
        this.isInitialized = false;
        
        this.initPromise = this.init();
    }

    async init() {
        console.log('🎵 Initializing BeatForge Studio...');
        
        // Initialize audio
        this.engine = new AudioEngine();
        await this.engine.init();
        
        // Initialize systems
        this.sequencer = new Sequencer(this.engine);
        this.notation = new NotationParser();
        this.aiComposer = new AIComposer(this.sequencer);
        
        // Create default track
        this.currentTrack = this.sequencer.createTrack('Track 1', 'grand-piano');
        
        // Setup UI
        this.setupTransportControls();
        this.setupInstrumentBrowser();
        this.setupTrackControls();
        this.setupViewTabs();
        this.setupAIComposer();
        this.setupPresets();
        this.startVisualization();
        
        this.isInitialized = true;
        console.log('%c✓ BeatForge Studio Ready!', 'color: #10b981; font-size: 18px; font-weight: bold');
        
        this.updateUI();
    }

    setupTransportControls() {
        const playBtn = document.getElementById('play-btn');
        const stopBtn = document.getElementById('stop-btn');
        const recordBtn = document.getElementById('record-btn');
        const loopBtn = document.getElementById('loop-btn');
        const bpmInput = document.getElementById('bpm-input');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (!this.sequencer.isPlaying) {
                    this.sequencer.play();
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    this.startTimeUpdate();
                } else {
                    this.sequencer.pause();
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }
        
        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                this.sequencer.stop();
                if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
                this.updateTimeDisplay();
            });
        }
        
        if (recordBtn) {
            recordBtn.addEventListener('click', () => {
                this.sequencer.toggleRecord();
                recordBtn.classList.toggle('recording', this.sequencer.isRecording);
            });
        }
        
        if (loopBtn) {
            loopBtn.addEventListener('click', () => {
                this.sequencer.loopEnabled = !this.sequencer.loopEnabled;
                loopBtn.classList.toggle('active', this.sequencer.loopEnabled);
            });
        }
        
        if (bpmInput) {
            bpmInput.value = this.sequencer.bpm;
            bpmInput.addEventListener('change', (e) => {
                this.sequencer.setBPM(parseInt(e.target.value) || 120);
            });
        }
    }

    setupInstrumentBrowser() {
        const instrumentGrid = document.getElementById('instrument-grid');
        const searchInput = document.querySelector('#instrument-browser input');
        const addTrackBtn = document.getElementById('add-track-btn');
        
        if (instrumentGrid) {
            this.renderInstruments();
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterInstruments(e.target.value);
            });
        }
        
        if (addTrackBtn) {
            addTrackBtn.addEventListener('click', () => {
                const instrumentId = Object.keys(INSTRUMENT_LIBRARY)[0];
                const track = this.sequencer.createTrack(`Track ${this.sequencer.tracks.length + 1}`, instrumentId);
                this.currentTrack = track;
                this.updateUI();
            });
        }
    }

    renderInstruments(filter = '') {
        const grid = document.getElementById('instrument-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const filtered = Object.entries(INSTRUMENT_LIBRARY).filter(([id, inst]) => {
            if (!filter) return true;
            return inst.name.toLowerCase().includes(filter.toLowerCase()) ||
                   inst.category.toLowerCase().includes(filter.toLowerCase());
        });
        
        filtered.forEach(([id, instrument]) => {
            const div = document.createElement('div');
            div.className = 'p-2 rounded bg-gray-800/50 hover:bg-gray-700 cursor-pointer transition-colors flex items-center gap-2';
            div.innerHTML = `
                <span class="text-lg">${instrument.icon}</span>
                <div class="flex-1 min-w-0">
                    <div class="text-xs font-medium truncate">${instrument.name}</div>
                    <div class="text-[10px] text-gray-500">${instrument.category}</div>
                </div>
            `;
            div.addEventListener('click', () => {
                if (this.currentTrack) {
                    this.currentTrack.instrument = id;
                    this.updateTrackControls();
                }
            });
            grid.appendChild(div);
        });
    }

    filterInstruments(query) {
        this.renderInstruments(query);
    }

    setupTrackControls() {
        const trackName = document.getElementById('track-name');
        const trackInstrument = document.getElementById('track-instrument');
        const trackVol = document.getElementById('track-vol');
        const trackPan = document.getElementById('track-pan');
        
        if (trackName) {
            trackName.addEventListener('change', (e) => {
                if (this.currentTrack) {
                    this.currentTrack.name = e.target.value;
                }
            });
        }
        
        if (trackInstrument) {
            // Populate instrument select
            Object.entries(INSTRUMENT_LIBRARY).forEach(([id, inst]) => {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = `${inst.icon} ${inst.name}`;
                trackInstrument.appendChild(option);
            });
            
            trackInstrument.addEventListener('change', (e) => {
                if (this.currentTrack) {
                    this.currentTrack.instrument = e.target.value;
                }
            });
        }
        
        if (trackVol) {
            trackVol.addEventListener('input', (e) => {
                if (this.currentTrack) {
                    this.currentTrack.volume = parseFloat(e.target.value);
                }
            });
        }
        
        if (trackPan) {
            trackPan.addEventListener('input', (e) => {
                if (this.currentTrack) {
                    this.currentTrack.pan = parseFloat(e.target.value);
                }
            });
        }
        
        // Effect sends
        ['reverb', 'delay', 'chorus'].forEach(fx => {
            const el = document.getElementById(`send-${fx}`);
            if (el) {
                el.addEventListener('input', (e) => {
                    if (this.currentTrack) {
                        this.currentTrack.effects[fx] = parseFloat(e.target.value);
                    }
                });
            }
        });
    }

    setupViewTabs() {
        const tabs = document.querySelectorAll('[data-view]');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const view = tab.dataset.view;
                this.switchView(view);
            });
        });
    }

    switchView(view) {
        this.currentView = view;
        
        // Update active tab
        document.querySelectorAll('[data-view]').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === view);
        });
        
        // Show/hide view content
        ['sequencer-view', 'piano-roll-view', 'mixer-view', 'automation-view'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.toggle('hidden', !id.includes(view));
            }
        });
    }

    setupAIComposer() {
        const generateBtn = document.getElementById('generate-ai-music');
        const artistInput = document.getElementById('ai-artist-style');
        const moodSelect = document.getElementById('ai-mood');
        
        if (generateBtn) {
            generateBtn.addEventListener('click', async () => {
                const artistStyle = artistInput?.value || 'default';
                const mood = moodSelect?.value || 'happy';
                
                generateBtn.disabled = true;
                generateBtn.textContent = 'Generating...';
                
                // Show modal
                const modal = document.getElementById('ai-modal');
                if (modal) modal.classList.remove('hidden');
                
                try {
                    await this.aiComposer.generateWithAI({
                        artistStyle,
                        mood,
                        complexity: 0.7,
                        bars: 16,
                        trackId: this.currentTrack?.id
                    });
                    
                    this.updateUI();
                } catch (error) {
                    console.error('AI generation failed:', error);
                } finally {
                    generateBtn.disabled = false;
                    generateBtn.textContent = '✨ Generate with AI';
                    
                    setTimeout(() => {
                        if (modal) modal.classList.add('hidden');
                    }, 1000);
                }
            });
        }
    }

    setupPresets() {
        const presetButtons = document.querySelectorAll('.preset-btn');
        presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const genre = btn.dataset.genre;
                this.loadPreset(genre);
            });
        });
    }

    loadPreset(genre) {
        console.log(`Loading ${genre} preset...`);
        
        // Clear existing tracks
        this.sequencer.tracks = [];
        
        switch (genre.toLowerCase()) {
            case 'edm':
                this.sequencer.setBPM(128);
                this.currentTrack = this.sequencer.createTrack('Kick', 'kick-808');
                this.aiComposer.proceduralGenerate({ artistStyle: 'edm', bars: 8, trackId: this.currentTrack.id });
                break;
            case 'lofi':
                this.sequencer.setBPM(85);
                this.currentTrack = this.sequencer.createTrack('Rhodes', 'rhodes');
                this.aiComposer.proceduralGenerate({ artistStyle: 'lofi', bars: 8, trackId: this.currentTrack.id });
                break;
            case 'hyperpop':
                this.sequencer.setBPM(160);
                this.currentTrack = this.sequencer.createTrack('Hyperpop Lead', 'hyperpop-lead');
                this.aiComposer.proceduralGenerate({ artistStyle: 'hyperpop', bars: 8, trackId: this.currentTrack.id });
                break;
            case 'trap':
                this.sequencer.setBPM(140);
                this.currentTrack = this.sequencer.createTrack('808', 'sub-bass');
                this.aiComposer.proceduralGenerate({ artistStyle: 'hiphop', bars: 8, trackId: this.currentTrack.id });
                break;
            case 'rock':
                this.sequencer.setBPM(120);
                this.currentTrack = this.sequencer.createTrack('Guitar', 'electric-guitar-distorted');
                this.aiComposer.proceduralGenerate({ artistStyle: 'rock', bars: 8, trackId: this.currentTrack.id });
                break;
            case 'jazz':
                this.sequencer.setBPM(90);
                this.currentTrack = this.sequencer.createTrack('Piano', 'grand-piano');
                this.aiComposer.proceduralGenerate({ artistStyle: 'jazz', bars: 8, trackId: this.currentTrack.id });
                break;
            default:
                this.currentTrack = this.sequencer.createTrack('Track 1', 'grand-piano');
        }
        
        this.updateUI();
    }

    startVisualization() {
        const canvas = document.getElementById('visualizer');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const bufferLength = this.engine.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
            requestAnimationFrame(draw);
            
            this.engine.analyser.getByteFrequencyData(dataArray);
            
            ctx.fillStyle = 'rgba(7, 7, 20, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = canvas.width / bufferLength * 2.5;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
                
                const hue = (i / bufferLength) * 360;
                ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }
        };
        
        draw();
    }

    startTimeUpdate() {
        const update = () => {
            if (this.sequencer.isPlaying) {
                this.updateTimeDisplay();
                requestAnimationFrame(update);
            }
        };
        update();
    }

    updateTimeDisplay() {
        const timeDisplay = document.getElementById('time-display');
        if (!timeDisplay) return;
        
        const beat = this.sequencer.getCurrentTime();
        const bar = Math.floor(beat / 4) + 1;
        const beatInBar = Math.floor(beat % 4) + 1;
        
        timeDisplay.textContent = `${bar}:${beatInBar}`;
    }

    updateTrackControls() {
        if (!this.currentTrack) return;
        
        const trackName = document.getElementById('track-name');
        const trackInstrument = document.getElementById('track-instrument');
        const trackVol = document.getElementById('track-vol');
        const trackPan = document.getElementById('track-pan');
        
        if (trackName) trackName.value = this.currentTrack.name;
        if (trackInstrument) trackInstrument.value = this.currentTrack.instrument;
        if (trackVol) trackVol.value = this.currentTrack.volume;
        if (trackPan) trackPan.value = this.currentTrack.pan;
    }

    updateUI() {
        this.updateTrackControls();
        this.updateTimeDisplay();
        // TODO: Update sequencer grid, piano roll, mixer
    }
}

// ============================================
// INITIALIZE ON LOAD
// ============================================

let daw = null;

document.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🎵 BeatForge Studio v4.0', 'color: #6366f1; font-size: 20px; font-weight: bold');
    console.log('%cProfessional Music Creation DAW', 'color: #8b5cf6; font-size: 14px');
    
    daw = new DAWController();
    await daw.initPromise;
    
    // Make available globally for console debugging
    window.daw = daw;
});

// Export for use
window.AudioEngine = AudioEngine;
window.Sequencer = Sequencer;
window.NotationParser = NotationParser;
window.AIComposer = AIComposer;
window.DAWController = DAWController;
window.INSTRUMENT_LIBRARY = INSTRUMENT_LIBRARY;
window.noteToMidi = noteToMidi;
window.midiToNote = midiToNote;

console.log('%c✓ BeatForge Studio Engine Loaded', 'color: #10b981; font-weight: bold');
console.log(`%c${Object.keys(INSTRUMENT_LIBRARY).length} instruments available`, 'color: #6366f1');

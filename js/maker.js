// ============================================
// BeatForge AI - Professional Beat Maker Studio v3.0
// Advanced Synthesis, Effects, and Humanization
// ============================================

// ============================================
// Constants and Helpers
// ============================================

const SCALES = {
    minor: [0, 2, 3, 5, 7, 8, 10],
    major: [0, 2, 4, 5, 7, 9, 11],
    pentatonic: [0, 3, 5, 7, 10],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    phrygian: [0, 1, 3, 5, 7, 8, 10],
    blues: [0, 3, 5, 6, 7, 10],
    chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
};

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
const freqToMidi = (freq) => 69 + 12 * Math.log2(freq / 440);
const dbToGain = (db) => Math.pow(10, db / 20);

// ============================================
// Effects Chain Factory
// ============================================

class EffectsChain {
    constructor(ctx) {
        this.ctx = ctx;
    }

    createReverb(duration = 2, decay = 2) {
        const sampleRate = this.ctx.sampleRate;
        const length = sampleRate * duration;
        const impulse = this.ctx.createBuffer(2, length, sampleRate);
        
        for (let channel = 0; channel < 2; channel++) {
            const data = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
            }
        }
        
        const convolver = this.ctx.createConvolver();
        convolver.buffer = impulse;
        return convolver;
    }

    createDelay(time = 0.25, feedback = 0.3) {
        const delay = this.ctx.createDelay(2);
        delay.delayTime.value = time;
        
        const feedbackGain = this.ctx.createGain();
        feedbackGain.gain.value = feedback;
        
        const wetGain = this.ctx.createGain();
        wetGain.gain.value = 0.4;
        
        delay.connect(feedbackGain);
        feedbackGain.connect(delay);
        delay.connect(wetGain);
        
        return { input: delay, output: wetGain, feedbackGain };
    }

    createChorus(rate = 1.5, depth = 0.003, mix = 0.4) {
        const input = this.ctx.createGain();
        const output = this.ctx.createGain();
        const dry = this.ctx.createGain();
        dry.gain.value = 1 - mix * 0.5;
        
        const voices = [];
        
        for (let i = 0; i < 3; i++) {
            const delay = this.ctx.createDelay(0.1);
            delay.delayTime.value = 0.02 + i * 0.008;
            
            const lfo = this.ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = rate + i * 0.15;
            
            const lfoGain = this.ctx.createGain();
            lfoGain.gain.value = depth;
            
            const wet = this.ctx.createGain();
            wet.gain.value = mix / 3;
            
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

    createEQ(low = 0, mid = 0, high = 0) {
        const lowShelf = this.ctx.createBiquadFilter();
        lowShelf.type = 'lowshelf';
        lowShelf.frequency.value = 200;
        lowShelf.gain.value = low;
        
        const midPeak = this.ctx.createBiquadFilter();
        midPeak.type = 'peaking';
        midPeak.frequency.value = 1000;
        midPeak.Q.value = 1;
        midPeak.gain.value = mid;
        
        const highShelf = this.ctx.createBiquadFilter();
        highShelf.type = 'highshelf';
        highShelf.frequency.value = 4000;
        highShelf.gain.value = high;
        
        lowShelf.connect(midPeak);
        midPeak.connect(highShelf);
        
        return { input: lowShelf, output: highShelf, lowShelf, midPeak, highShelf };
    }
}

// ============================================
// Humanization Engine
// ============================================

class HumanizationEngine {
    constructor() {
        this.settings = {
            timingJitter: 0.008,
            velocityVariation: 0.12,
            swingAmount: 0,
            grooveTightness: 0.85
        };
    }

    setGenre(genre) {
        const presets = {
            'trap': { timingJitter: 0.004, velocityVariation: 0.08, swingAmount: 0, grooveTightness: 0.95 },
            'lofi': { timingJitter: 0.018, velocityVariation: 0.22, swingAmount: 35, grooveTightness: 0.55 },
            'house': { timingJitter: 0.006, velocityVariation: 0.1, swingAmount: 12, grooveTightness: 0.88 },
            'techno': { timingJitter: 0.002, velocityVariation: 0.04, swingAmount: 0, grooveTightness: 0.97 },
            'reggaeton': { timingJitter: 0.008, velocityVariation: 0.12, swingAmount: 18, grooveTightness: 0.82 },
            'drill': { timingJitter: 0.005, velocityVariation: 0.1, swingAmount: 5, grooveTightness: 0.9 },
            'jazz': { timingJitter: 0.022, velocityVariation: 0.28, swingAmount: 55, grooveTightness: 0.45 },
            'ambient': { timingJitter: 0.025, velocityVariation: 0.18, swingAmount: 0, grooveTightness: 0.65 },
            'dnb': { timingJitter: 0.004, velocityVariation: 0.12, swingAmount: 0, grooveTightness: 0.92 },
            'synthwave': { timingJitter: 0.006, velocityVariation: 0.08, swingAmount: 0, grooveTightness: 0.88 }
        };
        
        if (presets[genre]) {
            Object.assign(this.settings, presets[genre]);
        }
    }

    humanizeTime(time, stepIndex) {
        const jitter = (Math.random() - 0.5) * 2 * this.settings.timingJitter;
        let swing = 0;
        if (stepIndex % 2 === 1) {
            swing = (this.settings.swingAmount / 100) * 0.04;
        }
        return time + jitter * (1 - this.settings.grooveTightness) + swing;
    }

    humanizeVelocity(baseVelocity = 1, stepIndex = 0) {
        const variation = 1 + (Math.random() - 0.5) * 2 * this.settings.velocityVariation;
        let accent = 1;
        if (stepIndex % 4 === 0) accent = 1.1;
        else if (stepIndex % 2 === 0) accent = 1.0;
        else accent = 0.92;
        return Math.min(1, Math.max(0.25, baseVelocity * variation * accent));
    }
}

// ============================================
// Audio Engine
// ============================================

class AudioEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.compressor = null;
        this.analyser = null;
        this.isInitialized = false;
        this.effects = null;
        this.humanizer = new HumanizationEngine();
        
        this.reverbSend = null;
        this.delaySend = null;
        this.chorusSend = null;
        
        this.reverb = null;
        this.delay = null;
        this.chorus = null;
        this.eq = null;
    }

    init() {
        if (this.isInitialized) return;
        
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.effects = new EffectsChain(this.ctx);
        
        // Master Chain
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.value = -10;
        this.compressor.ratio.value = 8;
        
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.65;
        
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 2048;
        
        // Effects
        this.reverb = this.effects.createReverb(2.5, 2.5);
        this.delay = this.effects.createDelay(0.375, 0.35);
        this.chorus = this.effects.createChorus(1.5, 0.003, 0.35);
        this.eq = this.effects.createEQ(2, 0, 1);
        
        // Sends
        this.reverbSend = this.ctx.createGain();
        this.reverbSend.gain.value = 1.0; // Controlled per track
        
        this.delaySend = this.ctx.createGain();
        this.delaySend.gain.value = 1.0;
        
        this.chorusSend = this.ctx.createGain();
        this.chorusSend.gain.value = 1.0;
        
        // Routing
        this.reverbSend.connect(this.reverb);
        this.reverb.connect(this.masterGain);
        
        this.delaySend.connect(this.delay.input);
        this.delay.output.connect(this.masterGain);
        
        this.chorusSend.connect(this.chorus.input);
        this.chorus.output.connect(this.masterGain);
        
        this.compressor.connect(this.eq.input);
        this.eq.output.connect(this.masterGain);
        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
        
        this.isInitialized = true;
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setGenre(genre) {
        this.humanizer.setGenre(genre);
    }

    createNoiseBuffer(duration) {
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }

    // Helper to route track output to master and sends
    connectOutput(sourceNode, params) {
        const volGain = this.ctx.createGain();
        volGain.gain.value = dbToGain(params.vol || 0);
        
        const panner = this.ctx.createStereoPanner();
        panner.pan.value = params.pan || 0;
        
        sourceNode.connect(volGain);
        volGain.connect(panner);
        panner.connect(this.compressor);
        
        if (params.reverb > 0) {
            const send = this.ctx.createGain();
            send.gain.value = params.reverb;
            panner.connect(send);
            send.connect(this.reverbSend);
        }
        
        if (params.delay > 0) {
            const send = this.ctx.createGain();
            send.gain.value = params.delay;
            panner.connect(send);
            send.connect(this.delaySend);
        }
    }

    // ==========================================
    // Instruments
    // ==========================================

    playKick(time, params = {}, stepIndex = 0) {
        const { decay = 0.5, pitch = 150, click = 0.25 } = params;
        const humanTime = this.humanizer.humanizeTime(time, stepIndex);
        const velocity = this.humanizer.humanizeVelocity(0.9, stepIndex);
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, humanTime);
        osc.frequency.exponentialRampToValueAtTime(40, humanTime + 0.06);
        
        osc.connect(gain);
        
        gain.gain.setValueAtTime(0, humanTime);
        gain.gain.linearRampToValueAtTime(velocity * 0.85, humanTime + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.001, humanTime + decay);

        osc.start(humanTime);
        osc.stop(humanTime + decay);
        
        this.connectOutput(gain, params);
    }

    playSnare(time, params = {}, stepIndex = 0) {
        const { noise = 0.2, tone = 0.12, pitch = 200 } = params;
        const humanTime = this.humanizer.humanizeTime(time, stepIndex);
        const velocity = this.humanizer.humanizeVelocity(0.85, stepIndex);

        // Noise
        const noiseBuffer = this.createNoiseBuffer(noise);
        const noiseSrc = this.ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 2000;
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(velocity * 0.5, humanTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, humanTime + noise);
        
        noiseSrc.connect(hp);
        hp.connect(noiseGain);
        this.connectOutput(noiseGain, params);
        noiseSrc.start(humanTime);
        noiseSrc.stop(humanTime + noise);

        // Tone
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(pitch, humanTime);
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.65, humanTime + tone);
        oscGain.gain.setValueAtTime(velocity * 0.5, humanTime);
        oscGain.gain.exponentialRampToValueAtTime(0.001, humanTime + tone);
        
        osc.connect(oscGain);
        this.connectOutput(oscGain, params);
        osc.start(humanTime);
        osc.stop(humanTime + tone);
    }

    playHiHat(time, params = {}, stepIndex = 0) {
        const { open = false, pitch = 8500, decay = 0.05 } = params;
        const duration = open ? 0.3 : decay;
        const humanTime = this.humanizer.humanizeTime(time, stepIndex);
        const velocity = this.humanizer.humanizeVelocity(0.55, stepIndex);

        const buffer = this.createNoiseBuffer(duration);
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 6500;
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = pitch;
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(velocity * 0.35, humanTime);
        gain.gain.exponentialRampToValueAtTime(0.001, humanTime + duration);

        noise.connect(hp);
        hp.connect(bp);
        bp.connect(gain);
        
        this.connectOutput(gain, params);
        noise.start(humanTime);
        noise.stop(humanTime + duration);
    }

    playClap(time, params = {}, stepIndex = 0) {
        const { spread = 0.012, pitch = 1250 } = params;
        const humanTime = this.humanizer.humanizeTime(time, stepIndex);
        const velocity = this.humanizer.humanizeVelocity(0.7, stepIndex);
        
        const masterGain = this.ctx.createGain();
        this.connectOutput(masterGain, params);

        for (let i = 0; i < 3; i++) {
            const delay = i * spread;
            const buffer = this.createNoiseBuffer(0.12);
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = pitch;
            
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(velocity * 0.2, humanTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, humanTime + delay + 0.1);
            
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(masterGain);
            
            noise.start(humanTime + delay);
            noise.stop(humanTime + delay + 0.12);
        }
    }

    playPerc(time, params = {}, stepIndex = 0) {
        const { pitch = 420, decay = 0.12 } = params;
        const humanTime = this.humanizer.humanizeTime(time, stepIndex);
        const velocity = this.humanizer.humanizeVelocity(0.6, stepIndex);
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, humanTime);
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.6, humanTime + decay);
        
        gain.gain.setValueAtTime(velocity * 0.45, humanTime);
        gain.gain.exponentialRampToValueAtTime(0.001, humanTime + decay);
        
        osc.connect(gain);
        this.connectOutput(gain, params);
        
        osc.start(humanTime);
        osc.stop(humanTime + decay);
    }

    playBass(time, params = {}, stepIndex = 0) {
        const { note = 36, shape = 'sawtooth', filter = 450, attack = 0.01, release = 0.4 } = params;
        const humanTime = this.humanizer.humanizeTime(time, stepIndex);
        const velocity = this.humanizer.humanizeVelocity(0.85, stepIndex);
        const freq = midiToFreq(note);
        
        const osc = this.ctx.createOscillator();
        const sub = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const biquad = this.ctx.createBiquadFilter();
        
        osc.type = shape;
        osc.frequency.value = freq;
        sub.type = 'sine';
        sub.frequency.value = freq / 2;
        
        biquad.type = 'lowpass';
        biquad.frequency.setValueAtTime(filter, humanTime);
        biquad.frequency.exponentialRampToValueAtTime(100, humanTime + release);
        
        osc.connect(biquad);
        sub.connect(biquad);
        biquad.connect(gain);
        
        gain.gain.setValueAtTime(0, humanTime);
        gain.gain.linearRampToValueAtTime(velocity * 0.6, humanTime + attack);
        gain.gain.exponentialRampToValueAtTime(0.001, humanTime + attack + release);
        
        this.connectOutput(gain, params);
        
        osc.start(humanTime);
        sub.start(humanTime);
        osc.stop(humanTime + attack + release);
        sub.stop(humanTime + attack + release);
    }

    playSynth(time, params = {}, stepIndex = 0) {
        const { note = 72, shape = 'triangle', attack = 0.01, release = 0.25, filter = 3000 } = params;
        const humanTime = this.humanizer.humanizeTime(time, stepIndex);
        const velocity = this.humanizer.humanizeVelocity(0.6, stepIndex);
        const freq = midiToFreq(note);
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const biquad = this.ctx.createBiquadFilter();
        
        osc.type = shape;
        osc.frequency.value = freq;
        
        biquad.type = 'lowpass';
        biquad.frequency.value = filter;
        
        osc.connect(biquad);
        biquad.connect(gain);
        
        gain.gain.setValueAtTime(0, humanTime);
        gain.gain.linearRampToValueAtTime(velocity * 0.4, humanTime + attack);
        gain.gain.exponentialRampToValueAtTime(0.001, humanTime + attack + release);
        
        this.connectOutput(gain, params);
        
        osc.start(humanTime);
        osc.stop(humanTime + attack + release);
    }
}

// ============================================
// Genre Presets
// ============================================

const GenrePresets = {
    'trap': {
        bpm: 140,
        patterns: {
            kick: [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0],
            snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            hihat: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            bass: [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0]
        }
    },
    'lofi': {
        bpm: 85,
        patterns: {
            kick: [1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0],
            snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
            hihat: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            bass: [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0]
        }
    },
    'techno': {
        bpm: 135,
        patterns: {
            kick: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            snare: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            hihat: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
            bass: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0]
        }
    },
    'synthwave': {
        bpm: 118,
        patterns: {
            kick: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            hihat: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            bass: [1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0]
        }
    }
};

// ============================================
// Sequencer Logic
// ============================================

class Sequencer {
    constructor(audioEngine, ui) {
        this.audio = audioEngine;
        this.ui = ui;
        this.isPlaying = false;
        this.bpm = 120;
        this.currentStep = 0;
        this.nextNoteTime = 0;
        this.lookahead = 25.0;
        this.scheduleAheadTime = 0.1;
        this.timerID = null;
        
        // Default params
        const defaults = { vol: 0, pan: 0, reverb: 0, delay: 0, attack: 0.01, release: 0.2, filter: 2000, res: 1 };
        
        this.tracks = [
            { name: 'Kick', color: 'bg-blue-500', steps: new Array(16).fill(false), params: { ...defaults, decay: 0.5, pitch: 150 }, play: (t, p, s) => this.audio.playKick(t, p, s) },
            { name: 'Snare', color: 'bg-purple-500', steps: new Array(16).fill(false), params: { ...defaults, noise: 0.2, tone: 0.12 }, play: (t, p, s) => this.audio.playSnare(t, p, s) },
            { name: 'HiHat', color: 'bg-yellow-500', steps: new Array(16).fill(false), params: { ...defaults, pitch: 8500, decay: 0.05 }, play: (t, p, s) => this.audio.playHiHat(t, p, s) },
            { name: 'Clap', color: 'bg-pink-500', steps: new Array(16).fill(false), params: { ...defaults, spread: 0.012 }, play: (t, p, s) => this.audio.playClap(t, p, s) },
            { name: 'Perc', color: 'bg-orange-500', steps: new Array(16).fill(false), params: { ...defaults, pitch: 420 }, play: (t, p, s) => this.audio.playPerc(t, p, s) },
            { name: 'Bass', color: 'bg-red-500', steps: new Array(16).fill(false), params: { ...defaults, note: 36, filter: 450 }, play: (t, p, s) => this.audio.playBass(t, p, s) },
            { name: 'Synth', color: 'bg-green-500', steps: new Array(16).fill(false), params: { ...defaults, note: 60, shape: 'triangle' }, play: (t, p, s) => this.audio.playSynth(t, p, s) },
            { name: 'Lead', color: 'bg-cyan-500', steps: new Array(16).fill(false), params: { ...defaults, note: 72, shape: 'sawtooth' }, play: (t, p, s) => this.audio.playSynth(t, p, s) }
        ];
        
        this.selectedTrackIndex = 0;
    }

    start() {
        if (this.isPlaying) return;
        this.audio.init();
        this.audio.resume();
        this.isPlaying = true;
        this.currentStep = 0;
        this.nextNoteTime = this.audio.ctx.currentTime;
        this.scheduler();
        this.ui.togglePlayButton(true);
    }

    stop() {
        this.isPlaying = false;
        clearTimeout(this.timerID);
        this.ui.resetStepHighlight();
        this.ui.togglePlayButton(false);
    }

    scheduler() {
        while (this.nextNoteTime < this.audio.ctx.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.currentStep, this.nextNoteTime);
            this.nextNote();
        }
        if (this.isPlaying) {
            this.timerID = setTimeout(() => this.scheduler(), this.lookahead);
        }
    }

    nextNote() {
        const secondsPerBeat = 60.0 / this.bpm;
        this.nextNoteTime += 0.25 * secondsPerBeat;
        this.currentStep = (this.currentStep + 1) % 16;
    }

    scheduleNote(stepNumber, time) {
        requestAnimationFrame(() => this.ui.highlightStep(stepNumber));

        this.tracks.forEach(track => {
            if (track.steps[stepNumber]) {
                track.play(time, track.params, stepNumber);
            }
        });
    }

    toggleStep(trackIndex, stepIndex) {
        this.tracks[trackIndex].steps[stepIndex] = !this.tracks[trackIndex].steps[stepIndex];
        return this.tracks[trackIndex].steps[stepIndex];
    }

    clear() {
        this.tracks.forEach(t => t.steps.fill(false));
        this.ui.renderGrid();
    }

    generateAI(genre) {
        this.clear();
        this.audio.setGenre(genre);
        const preset = GenrePresets[genre];
        if (preset) {
            this.bpm = preset.bpm;
            document.getElementById('bpm-input').value = this.bpm;
            
            const map = { kick: 0, snare: 1, hihat: 2, bass: 5 };
            Object.keys(map).forEach(key => {
                if (preset.patterns[key]) {
                    this.tracks[map[key]].steps = [...preset.patterns[key]];
                }
            });
        }
        this.ui.renderGrid();
    }
    
    exportWAV() {
        alert('Export feature coming soon in v3.1!');
    }
}

// ============================================
// UI Controller
// ============================================

class UI {
    constructor() {
        this.sequencer = null;
        this.gridContainer = document.getElementById('sequencer-tracks');
    }

    init(sequencer) {
        this.sequencer = sequencer;
        this.renderGrid();
        this.setupControls();
        this.setupVisualizer();
        this.updateSidebar();
    }

    renderGrid() {
        this.gridContainer.innerHTML = '';
        
        this.sequencer.tracks.forEach((track, trackIndex) => {
            const row = document.createElement('div');
            row.className = `flex items-center gap-2 sm:gap-4 mb-2 p-2 rounded transition-colors ${trackIndex === this.sequencer.selectedTrackIndex ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5 border border-transparent'}`;
            
            // Track Label (Click to select)
            const label = document.createElement('div');
            label.className = 'w-24 text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer flex items-center gap-2';
            label.innerHTML = `<div class='w-2 h-2 rounded-full ${track.color}'></div> ${track.name}`;
            label.onclick = () => {
                this.sequencer.selectedTrackIndex = trackIndex;
                this.renderGrid(); // Re-render to show selection
                this.updateSidebar();
            };
            row.appendChild(label);

            // Steps
            const stepsContainer = document.createElement('div');
            stepsContainer.className = 'flex-1 grid grid-cols-16 gap-1';
            
            track.steps.forEach((isActive, stepIndex) => {
                const btn = document.createElement('button');
                btn.className = `
                    aspect-square rounded-sm transition-all duration-100 min-h-[20px]
                    ${isActive ? track.color : 'bg-white/5 hover:bg-white/10'}
                    ${stepIndex % 4 === 0 ? 'ring-1 ring-white/10' : ''}
                `;
                btn.id = `step-${trackIndex}-${stepIndex}`;
                
                btn.onclick = () => {
                    const active = this.sequencer.toggleStep(trackIndex, stepIndex);
                    btn.className = `
                        aspect-square rounded-sm transition-all duration-100 min-h-[20px]
                        ${active ? track.color : 'bg-white/5 hover:bg-white/10'}
                        ${stepIndex % 4 === 0 ? 'ring-1 ring-white/10' : ''}
                    `;
                };
                
                stepsContainer.appendChild(btn);
            });

            row.appendChild(stepsContainer);
            this.gridContainer.appendChild(row);
        });
    }

    updateSidebar() {
        const track = this.sequencer.tracks[this.sequencer.selectedTrackIndex];
        const p = track.params;
        
        // Update Inputs
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val;
        };
        
        setVal('track-vol', p.vol);
        setVal('track-pan', p.pan);
        setVal('send-reverb', p.reverb);
        setVal('send-delay', p.delay);
        setVal('param-attack', p.attack);
        setVal('param-release', p.release);
        setVal('param-filter', p.filter);
        setVal('param-res', p.res || 0);
        
        // Update Labels
        document.getElementById('vol-val').innerText = `${p.vol}dB`;
        document.getElementById('pan-val').innerText = p.pan;
        
        // Show/Hide Synth Params based on track type? 
        // For now, just show all.
    }

    setupControls() {
        // Transport
        document.getElementById('play-btn').onclick = () => this.sequencer.isPlaying ? this.sequencer.stop() : this.sequencer.start();
        document.getElementById('stop-btn').onclick = () => this.sequencer.stop();
        
        // BPM
        const bpmInput = document.getElementById('bpm-input');
        bpmInput.onchange = (e) => this.sequencer.bpm = parseInt(e.target.value);
        
        // AI Generation
        document.getElementById('generate-btn').onclick = () => {
            // Find active genre
            this.sequencer.generateAI('trap'); // Default for now
        };
        
        // Genre Buttons
        document.querySelectorAll('.genre-btn').forEach(btn => {
            btn.onclick = () => {
                this.sequencer.generateAI(btn.dataset.genre);
            };
        });

        // Sidebar Controls (Live Update)
        const bindParam = (id, paramKey, displayId = null, suffix = '') => {
            const el = document.getElementById(id);
            if (!el) return;
            el.oninput = (e) => {
                const val = parseFloat(e.target.value);
                this.sequencer.tracks[this.sequencer.selectedTrackIndex].params[paramKey] = val;
                if (displayId) document.getElementById(displayId).innerText = val + suffix;
            };
        };

        bindParam('track-vol', 'vol', 'vol-val', 'dB');
        bindParam('track-pan', 'pan', 'pan-val');
        bindParam('send-reverb', 'reverb');
        bindParam('send-delay', 'delay');
        bindParam('param-attack', 'attack');
        bindParam('param-release', 'release');
        bindParam('param-filter', 'filter');
        bindParam('param-res', 'res');
        
        // Master Vol
        document.getElementById('master-vol').oninput = (e) => {
            if (this.sequencer.audio.masterGain) {
                this.sequencer.audio.masterGain.gain.value = parseFloat(e.target.value);
            }
        };
    }

    togglePlayButton(isPlaying) {
        const btn = document.getElementById('play-btn');
        btn.innerHTML = isPlaying 
            ? '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
            : '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    }

    highlightStep(stepIndex) {
        document.querySelectorAll('.brightness-150').forEach(el => el.classList.remove('brightness-150'));
        
        this.sequencer.tracks.forEach((track, trackIndex) => {
            const el = document.getElementById(`step-${trackIndex}-${stepIndex}`);
            if (el) {
                el.classList.add('brightness-150');
            }
        });
    }

    resetStepHighlight() {
        document.querySelectorAll('.brightness-150').forEach(el => el.classList.remove('brightness-150'));
    }

    setupVisualizer() {
        const canvas = document.getElementById('visualizer');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            requestAnimationFrame(draw);
            if (!this.sequencer.audio.analyser) return;
            
            const bufferLength = this.sequencer.audio.analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            this.sequencer.audio.analyser.getByteFrequencyData(dataArray);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;
            
            for(let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height;
                ctx.fillStyle = `rgb(${barHeight + 100}, 50, 200)`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
        draw();
    }
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const audio = new AudioEngine();
    const ui = new UI();
    const sequencer = new Sequencer(audio, ui);
    ui.init(sequencer);
});

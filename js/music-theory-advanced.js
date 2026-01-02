// ============================================
// BeatForge AI - Advanced Music Theory v1.0
// Based on real music theory and famous song patterns
// Inspired by iconic albums and production techniques
// ============================================

/**
 * Advanced Musical Scales and Modes
 * Based on real music theory used in famous productions
 */
export const ADVANCED_SCALES = {
    // Major modes
    ionian: [0, 2, 4, 5, 7, 9, 11],         // Major - Happy, bright (Beatles, ABBA)
    dorian: [0, 2, 3, 5, 7, 9, 10],          // Minor with raised 6th (Jazz, Funk, R&B)
    phrygian: [0, 1, 3, 5, 7, 8, 10],        // Spanish/Flamenco feel
    lydian: [0, 2, 4, 6, 7, 9, 11],          // Dreamy, floating (Film scores)
    mixolydian: [0, 2, 4, 5, 7, 9, 10],      // Blues/Rock feel (Hendrix, Clapton)
    aeolian: [0, 2, 3, 5, 7, 8, 10],         // Natural minor (Sad, melancholic)
    locrian: [0, 1, 3, 5, 6, 8, 10],         // Dark, unstable (Metal, Film)
    
    // Pentatonic scales (universally pleasing)
    majorPentatonic: [0, 2, 4, 7, 9],        // Pop, Country, World music
    minorPentatonic: [0, 3, 5, 7, 10],       // Blues, Rock, R&B
    
    // Blues scales
    blues: [0, 3, 5, 6, 7, 10],              // Classic blues (B.B. King)
    bluesExtended: [0, 2, 3, 4, 5, 6, 7, 9, 10, 11], // Extended blues
    
    // Exotic scales
    harmonicMinor: [0, 2, 3, 5, 7, 8, 11],   // Classical, Middle Eastern
    melodicMinor: [0, 2, 3, 5, 7, 9, 11],    // Jazz
    hungarianMinor: [0, 2, 3, 6, 7, 8, 11],  // Eastern European
    japaneseIn: [0, 1, 5, 7, 8],             // Traditional Japanese
    japanesePyramid: [0, 2, 5, 7, 9],        // Anime, J-Pop
    arabic: [0, 1, 4, 5, 7, 8, 11],          // Middle Eastern
    persian: [0, 1, 4, 5, 6, 8, 11],         // Persian/Iranian
    egyptian: [0, 2, 5, 7, 10],              // Ancient feel
    gypsy: [0, 2, 3, 6, 7, 8, 10],           // Romani music
    
    // Electronic/Modern scales
    wholetone: [0, 2, 4, 6, 8, 10],          // Dreamy, Impressionistic (Debussy)
    diminished: [0, 2, 3, 5, 6, 8, 9, 11],   // Tension (Film scores)
    augmented: [0, 3, 4, 7, 8, 11],          // Floating, mysterious
    chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] // All notes
};

/**
 * Famous chord progressions from real songs
 * Each progression is designed to evoke specific emotions
 */
export const FAMOUS_PROGRESSIONS = {
    // Pop/Rock progressions
    fourChords: {
        name: "I-V-vi-IV (The Most Popular)",
        numerals: [0, 4, 5, 3],  // C-G-Am-F in C major
        songs: ["Let It Be", "No Woman No Cry", "With or Without You", "Someone Like You"],
        mood: "uplifting"
    },
    fifties: {
        name: "I-vi-IV-V (50s/Doo-Wop)",
        numerals: [0, 5, 3, 4],
        songs: ["Stand By Me", "Every Breath You Take", "All I Have to Do Is Dream"],
        mood: "nostalgic"
    },
    sadness: {
        name: "vi-IV-I-V (Sad/Emotional)",
        numerals: [5, 3, 0, 4],
        songs: ["Despacito", "Africa", "Self Esteem"],
        mood: "emotional"
    },
    andalusian: {
        name: "i-VII-VI-V (Andalusian Cadence)",
        numerals: [0, 6, 5, 4],
        songs: ["Hit the Road Jack", "Sultans of Swing"],
        mood: "spanish"
    },
    
    // Jazz progressions
    jazzTwoFive: {
        name: "ii-V-I (Jazz Standard)",
        numerals: [1, 4, 0],
        songs: ["Autumn Leaves", "Fly Me to the Moon", "All The Things You Are"],
        mood: "sophisticated"
    },
    jazzTurnaround: {
        name: "I-vi-ii-V (Jazz Turnaround)",
        numerals: [0, 5, 1, 4],
        songs: ["I Got Rhythm", "Blue Moon"],
        mood: "classic"
    },
    rhythm: {
        name: "I-VI-II-V (Rhythm Changes)",
        numerals: [0, 5, 1, 4],
        songs: ["I Got Rhythm", "Oleo", "Anthropology"],
        mood: "bebop"
    },
    
    // Blues progressions
    twelveBarBlues: {
        name: "12-Bar Blues (I-I-I-I-IV-IV-I-I-V-IV-I-V)",
        numerals: [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4],
        songs: ["Sweet Home Chicago", "Pride and Joy", "Crossroads"],
        mood: "blues"
    },
    eightBarBlues: {
        name: "8-Bar Blues",
        numerals: [0, 0, 3, 3, 0, 4, 0, 4],
        songs: ["Heartbreak Hotel", "How Long Blues"],
        mood: "blues"
    },
    
    // Lo-Fi/Chill progressions (common in study music)
    lofiChill: {
        name: "ii-V-I-vi (Lo-Fi Standard)",
        numerals: [1, 4, 0, 5],
        songs: ["lo-fi hip hop radio beats"],
        mood: "chill"
    },
    lofiNeo: {
        name: "ii-V-iii-vi (Neo-Soul Lo-Fi)",
        numerals: [1, 4, 2, 5],
        songs: ["Nujabes style"],
        mood: "soulful"
    },
    lofiMinor: {
        name: "i-iv-VII-III (Minor Lo-Fi)",
        numerals: [0, 3, 6, 2],
        songs: ["Dark lo-fi beats"],
        mood: "melancholic"
    },
    
    // Trap/Hip-Hop progressions
    trapDark: {
        name: "i-i-VI-VII (Dark Trap)",
        numerals: [0, 0, 5, 6],
        songs: ["Metro Boomin style", "Drake", "Future"],
        mood: "dark"
    },
    trapMinor: {
        name: "i-VII-VI-V (Trap Minor)",
        numerals: [0, 6, 5, 4],
        songs: ["21 Savage style"],
        mood: "aggressive"
    },
    drill: {
        name: "i-i-iv-VII (UK Drill)",
        numerals: [0, 0, 3, 6],
        songs: ["Pop Smoke", "Headie One"],
        mood: "menacing"
    },
    
    // Electronic progressions
    houseClassic: {
        name: "I-I-IV-V (House Classic)",
        numerals: [0, 0, 3, 4],
        songs: ["Daft Punk", "Disclosure"],
        mood: "groovy"
    },
    tranceEpic: {
        name: "i-VI-III-VII (Trance Epic)",
        numerals: [0, 5, 2, 6],
        songs: ["Armin van Buuren", "Tiësto"],
        mood: "euphoric"
    },
    synthwaveRetro: {
        name: "i-VI-VII-i (Synthwave)",
        numerals: [0, 5, 6, 0],
        songs: ["Kavinsky", "The Midnight"],
        mood: "nostalgic"
    },
    technoMinimal: {
        name: "i-VII-i-VII (Minimal Techno)",
        numerals: [0, 6, 0, 6],
        songs: ["Richie Hawtin", "Plastikman"],
        mood: "hypnotic"
    },
    
    // Ambient progressions
    ambientFloat: {
        name: "I-IVadd9-I-V (Floating Ambient)",
        numerals: [0, 3, 0, 4],
        songs: ["Brian Eno", "Aphex Twin"],
        mood: "ethereal"
    },
    ambientSuspended: {
        name: "Isus2-Vsus4-vi-IV (Suspended Ambient)",
        numerals: [0, 4, 5, 3],
        songs: ["Sigur Rós", "Hammock"],
        mood: "dreamy"
    },
    
    // Reggaeton/Latin progressions
    dembow: {
        name: "i-IV-VII-III (Reggaeton Classic)",
        numerals: [0, 3, 6, 2],
        songs: ["Daddy Yankee", "Bad Bunny", "J Balvin"],
        mood: "party"
    },
    latinPop: {
        name: "I-IV-V-I (Latin Pop)",
        numerals: [0, 3, 4, 0],
        songs: ["Shakira", "Enrique Iglesias"],
        mood: "upbeat"
    },
    
    // Cinematic progressions
    epicFilm: {
        name: "i-VI-III-VII (Cinematic Epic)",
        numerals: [0, 5, 2, 6],
        songs: ["Hans Zimmer", "Inception", "Interstellar"],
        mood: "epic"
    },
    emotionalFilm: {
        name: "I-V-vi-iii (Emotional Score)",
        numerals: [0, 4, 5, 2],
        songs: ["Thomas Newman", "American Beauty"],
        mood: "emotional"
    }
};

/**
 * Drum patterns based on real genres
 * 32 steps = 4 bars at 8th note resolution
 */
export const AUTHENTIC_DRUM_PATTERNS = {
    // Lo-Fi Hip Hop (inspired by J Dilla, Nujabes)
    lofiBasic: {
        name: "Lo-Fi Basic Boom Bap",
        kick:  [1,0,0,0,0,0,0,1, 0,0,1,0,0,0,0,0, 1,0,0,0,0,0,0,1, 0,0,1,0,0,0,0,0],
        snare: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0],
        hihat: [1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0],
        perc:  [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0]
    },
    lofiSwung: {
        name: "Lo-Fi Swung (J Dilla style)",
        kick:  [1,0,0,0,0,0,1,0, 0,0,1,0,0,0,0,0, 1,0,0,0,0,0,1,0, 0,0,0,1,0,0,0,0],
        snare: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,1],
        hihat: [1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,1, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,1],
        perc:  [0,0,0,1,0,0,0,0, 0,0,0,1,0,0,0,0, 0,0,0,1,0,0,0,0, 0,0,0,1,0,0,0,0]
    },
    
    // Trap patterns (808 Mafia, Metro Boomin style)
    trapBasic: {
        name: "Trap Basic",
        kick:  [1,0,0,0,0,0,0,0, 1,0,0,0,0,0,1,0, 1,0,0,0,0,0,0,0, 1,0,0,0,0,0,1,0],
        snare: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0],
        hihat: [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
        perc:  [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1]
    },
    trapHiHatRolls: {
        name: "Trap Hi-Hat Rolls",
        kick:  [1,0,0,0,0,0,0,1, 0,0,0,0,0,0,1,0, 1,0,0,0,0,0,0,1, 0,0,0,0,0,0,1,0],
        snare: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0],
        hihat: [1,0,1,1,1,0,1,1, 1,0,1,1,1,1,1,1, 1,0,1,1,1,0,1,1, 1,1,1,1,1,1,1,1],
        perc:  [0,0,0,0,0,1,0,0, 0,0,0,0,0,1,0,0, 0,0,0,0,0,1,0,0, 0,0,0,0,0,1,0,0]
    },
    
    // House patterns (Disclosure, Duke Dumont style)
    houseFourOnFloor: {
        name: "House Four-on-the-Floor",
        kick:  [1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0],
        snare: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0],
        hihat: [0,0,1,0,0,0,1,0, 0,0,1,0,0,0,1,0, 0,0,1,0,0,0,1,0, 0,0,1,0,0,0,1,0],
        perc:  [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1]
    },
    houseOffbeat: {
        name: "House Offbeat Hi-Hats",
        kick:  [1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0],
        snare: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0],
        hihat: [0,1,0,1,0,1,0,1, 0,1,0,1,0,1,0,1, 0,1,0,1,0,1,0,1, 0,1,0,1,0,1,0,1],
        perc:  [0,0,0,0,0,0,1,0, 0,0,0,0,0,0,1,0, 0,0,0,0,0,0,1,0, 0,0,0,0,0,0,1,0]
    },
    
    // Techno patterns (Berlin style)
    technoMinimal: {
        name: "Techno Minimal",
        kick:  [1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0],
        snare: [0,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
        hihat: [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
        perc:  [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,1,0,0,0,0]
    },
    technoDriving: {
        name: "Techno Driving",
        kick:  [1,0,0,0,1,0,0,0, 1,0,0,0,1,0,1,0, 1,0,0,0,1,0,0,0, 1,0,0,0,1,0,1,0],
        snare: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0],
        hihat: [1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0],
        perc:  [0,0,0,0,0,0,0,0, 0,0,0,1,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,1,0,0,0,0]
    },
    
    // Reggaeton dembow pattern
    dembowClassic: {
        name: "Dembow Classic",
        kick:  [1,0,0,0,0,0,1,0, 0,0,0,0,0,0,1,0, 1,0,0,0,0,0,1,0, 0,0,0,0,0,0,1,0],
        snare: [0,0,0,1,0,0,0,1, 0,0,0,1,0,0,0,1, 0,0,0,1,0,0,0,1, 0,0,0,1,0,0,0,1],
        hihat: [1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0],
        perc:  [0,1,0,0,0,1,0,0, 0,1,0,0,0,1,0,0, 0,1,0,0,0,1,0,0, 0,1,0,0,0,1,0,0]
    },
    
    // Drum and Bass pattern
    dnbFast: {
        name: "Drum and Bass",
        kick:  [1,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0, 1,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
        snare: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,1,0],
        hihat: [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
        perc:  [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1]
    },
    
    // Synthwave pattern (retro 80s feel)
    synthwave80s: {
        name: "Synthwave 80s",
        kick:  [1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0, 1,0,0,0,1,0,1,0],
        snare: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0],
        hihat: [1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0],
        perc:  [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1]
    },
    
    // Ambient pattern (minimal drums)
    ambientMinimal: {
        name: "Ambient Minimal",
        kick:  [1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
        snare: [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,1,0,0,0],
        hihat: [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
        perc:  [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1]
    },
    
    // UK Drill pattern
    ukDrill: {
        name: "UK Drill",
        kick:  [1,0,0,0,0,0,0,0, 1,0,0,0,0,0,1,0, 0,0,0,1,0,0,0,0, 1,0,0,0,0,0,1,0],
        snare: [0,0,0,0,1,0,0,0, 0,0,1,0,1,0,0,0, 0,0,0,0,1,0,0,0, 0,0,1,0,1,0,0,0],
        hihat: [1,1,1,0,1,1,1,0, 1,1,1,0,1,1,1,0, 1,1,1,0,1,1,1,0, 1,1,1,0,1,1,1,0],
        perc:  [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1]
    }
};

/**
 * Bass patterns for different genres
 * Frequencies and rhythms that define each genre
 */
export const AUTHENTIC_BASS_PATTERNS = {
    lofi: {
        rhythm: [1,0,0,0,1,0,0,0, 0,0,1,0,0,0,0,0],
        octave: 2,
        style: 'warm',
        attack: 0.05,
        release: 0.3
    },
    trap808: {
        rhythm: [1,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0],
        octave: 1,
        style: '808',
        attack: 0.01,
        release: 0.8,
        slide: true
    },
    houseBouncy: {
        rhythm: [1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0],
        octave: 2,
        style: 'synth',
        attack: 0.02,
        release: 0.2
    },
    technoDeep: {
        rhythm: [1,0,0,1,0,0,1,0, 0,1,0,0,1,0,0,0],
        octave: 2,
        style: 'deep',
        attack: 0.01,
        release: 0.4
    },
    dembowLatin: {
        rhythm: [1,0,0,0,0,0,1,0, 0,0,0,0,0,0,1,0],
        octave: 2,
        style: 'punchy',
        attack: 0.01,
        release: 0.15
    },
    dnbReese: {
        rhythm: [1,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
        octave: 1,
        style: 'reese',
        attack: 0.05,
        release: 0.5,
        modulation: true
    }
};

/**
 * Instrument configurations for authentic sounds
 * Based on classic synths and production techniques
 */
export const INSTRUMENT_PRESETS = {
    // Keys and Pads
    rhodes: {
        type: 'fm',
        carrier: 'sine',
        modulator: 'sine',
        modIndex: 2,
        attack: 0.02,
        decay: 0.3,
        sustain: 0.4,
        release: 0.5,
        filter: 2000,
        warmth: true
    },
    piano: {
        type: 'harmonics',
        harmonics: [1, 0.5, 0.25, 0.125],
        attack: 0.01,
        decay: 0.4,
        sustain: 0.3,
        release: 0.8,
        filter: 5000
    },
    pad: {
        type: 'detuned',
        waveform: 'sawtooth',
        detune: 8,
        voices: 4,
        attack: 0.3,
        decay: 0.5,
        sustain: 0.7,
        release: 1.2,
        filter: 3000,
        filterEnvelope: true
    },
    strings: {
        type: 'layered',
        layers: ['sawtooth', 'triangle'],
        attack: 0.15,
        decay: 0.3,
        sustain: 0.8,
        release: 0.5,
        filter: 4000,
        chorus: true
    },
    
    // Synth leads
    synthLead: {
        type: 'pwm',
        waveform: 'sawtooth',
        pulseWidth: 0.5,
        attack: 0.01,
        decay: 0.2,
        sustain: 0.5,
        release: 0.3,
        filter: 4000,
        filterEnvelope: true
    },
    acid: {
        type: 'resonant',
        waveform: 'sawtooth',
        attack: 0.001,
        decay: 0.3,
        sustain: 0.2,
        release: 0.1,
        filter: 800,
        resonance: 15,
        filterEnvelope: true,
        accent: true
    },
    pluck: {
        type: 'karplus',
        attack: 0.001,
        decay: 0.1,
        sustain: 0,
        release: 0.5,
        filter: 5000,
        brightness: 0.8
    },
    
    // Bass sounds
    bass808: {
        type: 'sub',
        waveform: 'sine',
        attack: 0.01,
        decay: 0.1,
        sustain: 0.8,
        release: 0.8,
        pitchEnvelope: true,
        pitchDecay: 0.05
    },
    bassWarm: {
        type: 'analog',
        waveform: 'sawtooth',
        subOsc: true,
        attack: 0.02,
        decay: 0.3,
        sustain: 0.6,
        release: 0.3,
        filter: 1000,
        filterEnvelope: true
    },
    bassReese: {
        type: 'detuned',
        waveform: 'sawtooth',
        detune: 15,
        voices: 2,
        attack: 0.01,
        decay: 0.5,
        sustain: 0.7,
        release: 0.4,
        filter: 2000,
        modulation: true
    }
};

/**
 * Song structure templates based on popular music
 */
export const SONG_STRUCTURES = {
    pop: ['intro', 'verse', 'chorus', 'verse', 'chorus', 'bridge', 'chorus', 'outro'],
    electronic: ['intro', 'buildup', 'drop', 'breakdown', 'buildup', 'drop', 'outro'],
    lofi: ['intro', 'verse', 'verse', 'break', 'verse', 'outro'],
    hiphop: ['intro', 'verse', 'hook', 'verse', 'hook', 'verse', 'hook', 'outro'],
    ambient: ['intro', 'movement1', 'transition', 'movement2', 'outro'],
    minimal: ['intro', 'main', 'variation', 'main', 'outro']
};

/**
 * Section intensities for dynamic songs
 */
export const SECTION_INTENSITIES = {
    intro: 0.4,
    verse: 0.6,
    chorus: 0.9,
    hook: 0.85,
    bridge: 0.5,
    break: 0.3,
    breakdown: 0.3,
    buildup: 0.7,
    drop: 1.0,
    main: 0.8,
    variation: 0.75,
    movement1: 0.5,
    movement2: 0.6,
    transition: 0.4,
    outro: 0.5
};

/**
 * Genre-specific configuration with authentic settings
 */
export const GENRE_PRODUCTION_SETTINGS = {
    'Lo-Fi Hip Hop': {
        bpm: [70, 85],
        swing: 0.2,
        scale: 'minorPentatonic',
        progression: 'lofiChill',
        drumPattern: 'lofiSwung',
        bassPattern: 'lofi',
        instruments: ['rhodes', 'bassWarm', 'pad'],
        effects: {
            reverb: 0.5,
            delay: 0.3,
            lofi: true,
            vinylCrackle: 0.3,
            tapeWobble: 0.2,
            lowpass: 3000
        },
        structure: 'lofi'
    },
    'Trap': {
        bpm: [130, 160],
        swing: 0,
        scale: 'aeolian',
        progression: 'trapDark',
        drumPattern: 'trapHiHatRolls',
        bassPattern: 'trap808',
        instruments: ['synthLead', 'bass808', 'pad'],
        effects: {
            reverb: 0.25,
            delay: 0.2,
            distortion: 0.1,
            sidechain: true
        },
        structure: 'hiphop'
    },
    'House': {
        bpm: [120, 128],
        swing: 0.05,
        scale: 'dorian',
        progression: 'houseClassic',
        drumPattern: 'houseOffbeat',
        bassPattern: 'houseBouncy',
        instruments: ['synthLead', 'bassWarm', 'pad'],
        effects: {
            reverb: 0.4,
            delay: 0.25,
            sidechain: true,
            chorus: 0.3
        },
        structure: 'electronic'
    },
    'Techno': {
        bpm: [128, 140],
        swing: 0,
        scale: 'phrygian',
        progression: 'technoMinimal',
        drumPattern: 'technoDriving',
        bassPattern: 'technoDeep',
        instruments: ['acid', 'bassWarm', 'pad'],
        effects: {
            reverb: 0.35,
            delay: 0.4,
            distortion: 0.15
        },
        structure: 'electronic'
    },
    'Reggaeton': {
        bpm: [90, 100],
        swing: 0,
        scale: 'aeolian',
        progression: 'dembow',
        drumPattern: 'dembowClassic',
        bassPattern: 'dembowLatin',
        instruments: ['synthLead', 'bassWarm', 'brass'],
        effects: {
            reverb: 0.3,
            delay: 0.15
        },
        structure: 'pop'
    },
    'Synthwave': {
        bpm: [100, 120],
        swing: 0,
        scale: 'aeolian',
        progression: 'synthwaveRetro',
        drumPattern: 'synthwave80s',
        bassPattern: 'houseBouncy',
        instruments: ['synthLead', 'bass808', 'pad', 'strings'],
        effects: {
            reverb: 0.45,
            delay: 0.35,
            chorus: 0.4
        },
        structure: 'pop'
    },
    'Ambient': {
        bpm: [60, 80],
        swing: 0,
        scale: 'lydian',
        progression: 'ambientFloat',
        drumPattern: 'ambientMinimal',
        bassPattern: 'lofi',
        instruments: ['pad', 'strings', 'pluck'],
        effects: {
            reverb: 0.8,
            delay: 0.5,
            shimmer: true
        },
        structure: 'ambient'
    },
    'Drum and Bass': {
        bpm: [170, 180],
        swing: 0,
        scale: 'aeolian',
        progression: 'trapMinor',
        drumPattern: 'dnbFast',
        bassPattern: 'dnbReese',
        instruments: ['synthLead', 'bassReese', 'pad'],
        effects: {
            reverb: 0.3,
            delay: 0.2,
            distortion: 0.2
        },
        structure: 'electronic'
    },
    'UK Drill': {
        bpm: [140, 145],
        swing: 0,
        scale: 'phrygian',
        progression: 'drill',
        drumPattern: 'ukDrill',
        bassPattern: 'trap808',
        instruments: ['synthLead', 'bass808', 'strings'],
        effects: {
            reverb: 0.2,
            delay: 0.15,
            distortion: 0.1
        },
        structure: 'hiphop'
    }
};

/**
 * Chord voicing functions for richer harmonies
 */
export function getChordVoicing(root, type, inversion = 0) {
    const voicings = {
        major: [0, 4, 7],
        minor: [0, 3, 7],
        major7: [0, 4, 7, 11],
        minor7: [0, 3, 7, 10],
        dominant7: [0, 4, 7, 10],
        diminished: [0, 3, 6],
        augmented: [0, 4, 8],
        sus2: [0, 2, 7],
        sus4: [0, 5, 7],
        add9: [0, 4, 7, 14],
        madd9: [0, 3, 7, 14],
        maj9: [0, 4, 7, 11, 14],
        min9: [0, 3, 7, 10, 14],
        '7sus4': [0, 5, 7, 10]
    };
    
    let notes = voicings[type] || voicings.major;
    
    // Apply inversion
    for (let i = 0; i < inversion; i++) {
        const first = notes.shift();
        notes.push(first + 12);
    }
    
    return notes.map(n => root + n);
}

/**
 * Generate musically correct melody based on chord tones
 */
export function generateMelodicPhrase(scale, chordTones, length, style = 'flowing') {
    const phrase = [];
    let lastNote = chordTones[0];
    
    for (let i = 0; i < length; i++) {
        let note;
        const useChordTone = i % 2 === 0 || Math.random() < 0.6;
        
        if (useChordTone) {
            // Prefer chord tones on strong beats
            note = chordTones[Math.floor(Math.random() * chordTones.length)];
        } else {
            // Use scale passing tones
            const direction = lastNote < 6 ? 1 : (lastNote > 10 ? -1 : (Math.random() < 0.5 ? 1 : -1));
            const step = style === 'flowing' ? direction : (Math.random() < 0.7 ? direction : -direction);
            const scaleIndex = scale.indexOf(lastNote % 12);
            const nextIndex = Math.max(0, Math.min(scale.length - 1, scaleIndex + step));
            note = scale[nextIndex];
        }
        
        phrase.push(note);
        lastNote = note;
    }
    
    return phrase;
}

// Export all
export default {
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
};

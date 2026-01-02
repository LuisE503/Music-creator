// ============================================
// BeatForge AI - Professional Music Player v3.0
// Now uses SeekableMusicPlayer for real seeking
// ============================================

// Re-export from the seekable player for backwards compatibility
export { SeekableMusicPlayer as MusicPlayer, formatTime } from './seekable-player.js';

// Also export the generator and configs for direct access
export { ProceduralMusicGenerator, GENRE_CONFIGS, MUSIC_THEORY } from './music-engine.js';

// Default export
export { default } from './seekable-player.js';

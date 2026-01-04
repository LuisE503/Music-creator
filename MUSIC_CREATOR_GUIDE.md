# 🎵 BeatForge Studio - Professional Music Creator

## ✨ Características Principales

### 🎹 **50+ Instrumentos Profesionales**

#### Keyboards & Piano
- Grand Piano
- Electric Piano (Rhodes)
- Hammond Organ
- Church Organ
- Harpsichord
- Synth Lead
- Synth Pad
- Synth Bass

#### Basses
- Synth Bass
- Sub Bass (808)
- FM Bass
- Acid Bass (303)
- Bass Guitar

#### Guitars
- Acoustic Guitar
- Electric Guitar (Clean)
- Electric Guitar (Distorted)

#### Drums & Percussion
- 808 Kick
- Acoustic Kick
- Acoustic Snare
- Electronic Snare
- Hi-Hat (Closed/Open)
- Clap
- Toms (High/Mid/Low)
- Crash & Ride Cymbals
- Bongos, Congas
- Cowbell, Shaker, Tambourine

#### Brass
- Trumpet
- Trombone
- French Horn

#### Woodwinds
- Flute
- Clarinet
- Saxophone

#### Strings
- Violin
- Cello
- String Ensemble

#### Electronic / Hyperpop
- **Hyperpop Lead** - Sonido brillante y agresivo
- **Hyperpop Bass** - Bass distorsionado característico
- **Glitch Synth** - Efectos glitchy y digitales
- **Supersaw** - Múltiples voces detuned
- **Pluck Synth** - Sonidos percusivos
- **Bell Synth** - Síntesis FM para sonidos de campana

#### Vocals
- Choir Ahh
- Choir Ooh

---

## 🎼 Sistema de Notación Musical

### Formato Simplificado
Escribe música usando notación de texto simple:

```
C4-q D4-q E4-h F4-q
```

#### Códigos de Duración:
- `w` = Whole note (redonda)
- `h` = Half note (blanca)
- `q` = Quarter note (negra)
- `e` = Eighth note (corchea)
- `s` = Sixteenth note (semicorchea)
- `t` = Triplet eighth (corchea de tresillo)

#### Ejemplos:
```
C4-q D4-q E4-q F4-q G4-q A4-q B4-q C5-w
```
= Escala de C mayor

```
C4-h E4-h G4-w
```
= Acorde de C mayor arpegiado

### Acordes
```
Cmaj-q Dm7-h G7-q Cmaj-w
```

---

## 🤖 AI Composer - Generación con IA

### Estilos Disponibles:
1. **EDM** - 4-on-the-floor kicks, claps, hi-hats
2. **Lo-fi** - Jazz chords, laid-back melodies
3. **Hyperpop** - Rápidos arpeggios, sonidos glitchy
4. **Trap** - 808 bass, trap hi-hats
5. **Rock** - Power chords, guitarras distorsionadas
6. **Jazz** - Acordes extendidos, progresiones complejas
7. **Classical** - Arpeggios elegantes
8. **Hip Hop** - Ritmos boom-bap, 808s

### Modos (Moods):
- Happy (Mayor scales)
- Dark (Menor/Dorian)
- Energetic (Tempo rápido)
- Relaxed (Tempo lento)
- Atmospheric (Pads y texturas)

### Replicar Estilos de Artistas:
Escribe el nombre de un artista en el campo "Artist Style":
- "Skrillex" → EDM agresivo
- "Billie Eilish" → Dark pop con 808s
- "100 gecs" → Hyperpop glitchy
- "Daft Punk" → House/electro

---

## 🎚️ Controles del DAW

### Transport
- **Play/Pause**: Reproducir o pausar
- **Stop**: Detener y reiniciar
- **Record**: Grabar MIDI en tiempo real
- **Loop**: Activar/desactivar loop entre puntos

### Timeline
- **BPM**: 30-300 BPM
- **Time Signature**: 4/4, 3/4, 6/8, etc.
- **Key/Scale**: Cambiar tonalidad y escala

### Vistas (Views)
1. **Sequencer** - Vista de bloques y patrones
2. **Piano Roll** - Editor de notas MIDI
3. **Mixer** - Control de volumen, pan, efectos
4. **Automation** - Curvas de automatización

### Track Controls
- **Volume**: -60dB a +12dB
- **Pan**: L100 a R100
- **Mute/Solo**: Silenciar o aislar tracks
- **Send Effects**:
  - Reverb (0-100%)
  - Delay (0-100%)
  - Chorus (0-100%)

### ADSR Envelope
- **Attack**: Tiempo de ataque (0-2s)
- **Decay**: Tiempo de decaimiento (0-2s)
- **Sustain**: Nivel sostenido (0-100%)
- **Release**: Tiempo de liberación (0-5s)

### Filter
- **Cutoff**: 20Hz - 20kHz
- **Resonance**: 0-30

---

## 🎛️ Efectos

### Reverb
Reverberación por convolución con decay de 2.5s

### Delay
- Delay time sincronizado con tempo
- Feedback ajustable
- Filtro lowpass en el feedback

### Chorus
- 3 voces con LFOs independientes
- Rate: 1.5-2Hz
- Depth ajustable

---

## 📊 Presets de Género

Carga plantillas instantáneas:

1. **EDM** - 128 BPM, kick 4/4, sintetizadores
2. **Lo-fi** - 85 BPM, Rhodes, jazz chords
3. **Trap** - 140 BPM, 808 bass, hi-hats rápidos
4. **Hyperpop** - 160 BPM, glitch synths
5. **Rock** - 120 BPM, guitarras, batería en vivo
6. **House** - 125 BPM, deep bass, piano chords
7. **Ambient** - 60 BPM, pads atmosféricos
8. **Jazz** - 90 BPM, piano, swing feel

---

## 🔧 Atajos de Teclado (Próximamente)

- `Space` - Play/Pause
- `Ctrl+S` - Guardar proyecto
- `Ctrl+Z` - Deshacer
- `Ctrl+Y` - Rehacer
- `Delete` - Borrar nota/clip seleccionado
- `Ctrl+D` - Duplicar
- `1-8` - Cambiar entre vistas

---

## 💾 Exportar

### Formatos Disponibles:
- **WAV** - Alta calidad, sin compresión
- **MP3** - Comprimido (próximamente)
- **MIDI** - Archivo MIDI exportable (próximamente)

---

## 🚀 Características Técnicas

### Audio Engine
- **Web Audio API** nativo del navegador
- **Frecuencia de muestreo**: 48kHz
- **Polifonía**: 64 voces simultáneas
- **Latencia**: <10ms

### Síntesis
- **Subtractive**: Osciladores + Filtros
- **FM**: Síntesis por modulación de frecuencia
- **Additive**: Harmónicos combinados (órganos)
- **Physical Modeling**: Karplus-Strong (pluck)

### Procesamiento
- **Compressor**: Threshold -24dB, Ratio 12:1
- **Limiter**: Threshold -1dB, Ratio 20:1
- **Analyser**: FFT 4096, Visualización en tiempo real

---

## 📖 Ejemplos de Uso

### Crear una Canción desde Cero

1. **Click "Add Track"** → Selecciona "Grand Piano"
2. **Escribe notación**: `C4-q E4-q G4-q C5-w`
3. **Click "Play"** para escuchar
4. **Add otro track** → Selecciona "808 Kick"
5. **Usa AI**: Click "Generate with AI" → Selecciona "EDM"
6. **Ajusta mixer**: Balancea volúmenes y pans
7. **Exporta**: Click "Export" → WAV

### Replicar el Estilo de un Artista

1. En el panel "AI Composer"
2. Escribe: "Porter Robinson" en "Artist Style"
3. Mood: "Energetic"
4. Click "✨ Generate with AI"
5. El sistema generará progresiones y melodías similares

### Tocar en Vivo con el Teclado MIDI

1. Conecta tu controlador MIDI
2. Click "Record"
3. Click "Play"
4. Toca tu teclado - se grabará automáticamente

---

## 🐛 Resolución de Problemas

### No se escucha audio
1. Verifica que el navegador tenga permisos de audio
2. Click en cualquier parte de la página (el navegador requiere interacción del usuario)
3. Revisa que el Master Volume no esté en 0

### Latencia alta
1. Cierra otras pestañas del navegador
2. Usa auriculares cableados en lugar de Bluetooth
3. Reduce el número de tracks activos

### El AI no genera nada
- Actualmente usa generación procedural
- La integración con APIs externas está en desarrollo
- Funciona offline completamente

---

## 🔮 Próximas Características

- [ ] Integración con **Hugging Face Music Gen API**
- [ ] Grabación de audio (samples)
- [ ] VST/AU plugin support (via WebAssembly)
- [ ] Collaboration mode (multi-user)
- [ ] Cloud save/load
- [ ] Mobile app version
- [ ] Advanced notation (staff view)
- [ ] MIDI file import/export
- [ ] Audio file import (MP3, WAV)

---

## 📝 Licencia

Este proyecto es parte de BeatForge Studio.
© 2024 BeatForge - Creador de Música Online

---

## 💬 Soporte

¿Tienes preguntas o necesitas ayuda?
- Documentación completa: [Coming soon]
- Tutoriales en video: [Coming soon]
- Community Discord: [Coming soon]

---

**¡Crea música profesional directamente en tu navegador! 🎵**

# 🎵 TuneFlow

TuneFlow is a streamlined local music player built with Angular 17, offering an intuitive interface for managing and playing your local music collection. Powered by NgRx for state management, it provides a robust and responsive user experience.

## 🚀 Features

### 🎼 Music Management
- Complete CRUD operations for tracks
- Detailed track information including:
  - Song title
  - Artist name
  - Optional description (200 chars max)
  - Automatic addition date
  - Auto-calculated duration
  - Music genre categorization
- Cover image support (PNG, JPEG)
- File size limit: 15MB
- Supported formats: MP3, WAV, OGG

### ▶️ Audio Player
- Essential playback controls (play, pause, next, previous)
- Volume control
- Progress bar
- Powered by Web Audio API
- State management: playing, paused, buffering, stopped

## 💻 Technical Stack

### Core Technologies
- 🅰️ Angular 17
- 📊 NgRx State Management
- 📝 TypeScript
- 🔄 RxJS/Observables
- 🎨 Bootstrap/Tailwind CSS

### Storage
- 📦 IndexedDB
  - Audio files storage (blobs)
  - Metadata management
  - Image assets

### Development Tools
- 🎨 Figma/Adobe XD for UI/UX
- 📋 Jira for project management
- 🐳 Docker support
- 🧪 Jasmine for testing

## 🏗️ Architecture

### Core Modules
- Library Module (Track listing & search)
- Player Module (Audio playback & controls)
- Track Module (Detailed track view)
- Shared Module (Common components)

### State Management
```typescript
interface PlayerState {
  status: 'playing' | 'paused' | 'buffering' | 'stopped';
  loading: 'loading' | 'error' | 'success';
  currentTrack?: Track;
  volume: number;
  progress: number;
}
```

## 🚦 Getting Started

### Prerequisites
```bash
node >= 18.x
npm >= 9.x
```

### Installation
```bash
# Clone repository
git clone https://github.com/Radiaidel/tuneflow.git

# Install dependencies
cd tuneflow
npm install

# Start development server
npm start
```

### Docker Setup
```bash
# Build image
docker build -t tuneflow .

# Run container
docker run -p 4200:80 tuneflow
```

## 🔍 Validation Rules

### Track Information
- Title: Max 50 characters
- Description: Max 200 characters
- File size: Max 15MB
- Audio formats: MP3, WAV, OGG
- Images: PNG, JPEG only

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run e2e
```

## 📚 Technical Features

- Lazy loaded modules
- Reactive Forms implementation
- Custom pipes for audio formatting
- Dependency injection patterns
- Error handling & loading states
- Responsive design
- Type-safe development

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Angular team for the fantastic framework
- NgRx team for state management solutions
- Web Audio API contributors

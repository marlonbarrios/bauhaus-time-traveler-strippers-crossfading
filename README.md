# The Bauhaus Time Travelers are Strippers from the Future
## Crossfading Version

[Add your video demo here]

## About the Project

**The Bauhaus Time Travelers are Strippers from the Future** is a real-time digital performance piece that creates a hypnotic duet between human performer and artificial intelligence. This version features a rhythmic crossfading between reality and AI-generated imagery, creating a mesmerizing dance between the present and future self.

Developed during an artistic and research residency at Lake Studios Berlin in February 2024, this iteration explores the liminal space between physical presence and digital transformation through smooth transitions and temporal overlays.

## Technical Implementation

### Core Features
- Real-time webcam capture at 500ms intervals
- AI image generation using SDXL Turbo via fal.ai
- 5-second crossfade cycles between reality and AI-generated imagery
- Adjustable strength parameter for AI influence
- Fullscreen performance mode
- Original soundscape integration

### Technology Stack
- Next.js 14
- React
- fal.ai API for real-time image generation
- CSS animations for smooth crossfading
- Webcam integration

## Installation

```bash
# Clone the repository
git clone https://github.com/marlonbarrios/bauhaus-time-traveler-strippers.git

# Install dependencies
npm install

# Create .env.local and add your fal.ai API key
FAL_KEY=your_api_key_here

# Run the development server
npm run dev
```

## Live Performance

The piece is designed for live performance, creating a temporal dialogue between performer and AI. The 5-second crossfade cycle allows for:
- Gradual transformation between physical and digital self
- Rhythmic exploration of identity
- Hypnotic visual transitions
- Embodied interaction with latent space

## Live Application

Experience the performance piece: [LIVE APP](https://bauhaus-timetraveler-stripper.vercel.app/)

## Concept

This version extends the original concept by exploring the temporal nature of transformation. The crossfading mechanism serves as a metaphor for the fluid transition between present and future, physical and digital, human and AI. The Bauhaus artists, reimagined as time-traveling performers, now exist in a constant state of becoming, their forms dissolving and reforming in a continuous cycle.

## Themes
- Temporal fluidity
- Digital transformation
- Body as interface
- Rhythmic dialogue between human and machine
- Bauhaus aesthetics in the digital age
- Performance in latent space

## Credits

Created during art and research residency at Lake Studios Berlin, February 2024

Concept, Programming, Sound Design and Performance by [Marlon Barrios Solano](https://marlonbarrios.github.io/)

## MIT License

Copyright (c) 2024 Marlon Barrios Solano

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

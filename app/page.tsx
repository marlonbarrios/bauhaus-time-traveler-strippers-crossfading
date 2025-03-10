'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as fal from '@fal-ai/serverless-client';
import Image from 'next/image';

fal.config({
  proxyUrl: '/api/fal/proxy',
});

const seed = Math.floor(Math.random() * 100000);

export default function Home() {
  const [input, setInput] = useState('cinematic hyper-realistic stripper influencer with  prosthetics cyborg sex toys human body positions, bare skin, shirtless, of different  genders, ethnicities, ages and epochs with strange sculptural transparent  colorful goggles and body armor the style of bauhaus and mondrian,  dramatic light and plain background, calder mobiles hats, photo-realistic ');
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState(0.52);
  const [audioSrc, setAudioSrc] = useState('/bauhaus.mp3');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prevImage, setPrevImage] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);

  const baseArgs = useCallback(() => ({
    sync_mode: true,
    strength,
  }), [strength]);

  const getDataUrl = useCallback(async () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (!screenshot) return null;

    return new Promise((resolve) => {
      const img = new window.Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Failed to get canvas context');
          return;
        }

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 1024, 1024);

        resolve(canvas.toDataURL('image/jpeg'));
      };
      img.src = screenshot;
    });
  }, [webcamRef]);

  const handleFullscreen = () => {
    const imageContainer = document.querySelector('.generated-image-container');
    if (!imageContainer) return;

    if (!document.fullscreenElement) {
      imageContainer.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const captureImageAndSend = async () => {
      const dataUrl = await getDataUrl();
      if (dataUrl) {
        fal.realtime.connect('110602490-sdxl-turbo-realtime', {
          connectionKey: 'fal-ai/fast-lightning-sdxl',
          onResult: (result) => {
            if (result.error) return;
            setPrevImage(image);
            setImage(result.images[0].url);
          },
        }).send({
          ...baseArgs(),
          prompt: input,
          image_url: dataUrl,
        });
      }
    };

    const captureInterval = 1; // Adjust as needed
    const intervalId = setInterval(captureImageAndSend, captureInterval);

    return () => clearInterval(intervalId);
  }, [getDataUrl, baseArgs, input, image]);

  return (
    <main className="p-12 bg-black text-white flex flex-col items-center">
      {/* Title section */}
      <div className="max-w-4xl text-center mb-8">
        <p className="text-xl">
          bauhaus time traveler stripper | duet in{' '}
          <a href='https://en.wikipedia.org/wiki/Latent_spacelatent' className="text-white hover:text-gray-300">
            latent space
          </a>{' '}
          | concept, programming, sound design and performance by{' '}
          <a href='https://marlonbarrios.github.io/' className="text-white hover:text-gray-300">
            marlon barrios solano
          </a>
        </p>
      </div>

      {/* Strength control */}
      <div className="text-center mb-8">
        <p>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={strength} 
            onChange={(e) => setStrength(parseFloat(e.target.value))}
            className="mx-auto"
          /> 
          | Strength: {strength}
        </p>
      </div>
      
      {/* Main content container */}
      <div className='relative w-[1024px] h-[1024px] mx-auto overflow-hidden'>
        {/* Base webcam layer */}
        <div className="absolute inset-0 w-full h-full bg-black">
          <Webcam 
            audio={false} 
            ref={webcamRef} 
            screenshotFormat="image/jpeg" 
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
            videoConstraints={{
              width: 1024,
              height: 1024,
              aspectRatio: 1
            }}
          />
        </div>
       
        {/* Generated image layer */}
        {image && (
          <div className="generated-image-container absolute inset-0 w-full h-full">
            <button 
              onClick={handleFullscreen}
              className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg"
              aria-label="Toggle fullscreen"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" 
                />
              </svg>
            </button>
            
            {prevImage && (
              <div className="absolute inset-0 transition-opacity duration-1000">
                <Image 
                  src={prevImage} 
                  width={1024}
                  height={1024}
                  alt="Previous processed image" 
                  className="opacity-30 transition-opacity duration-1000"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
            
            <div className="transition-opacity duration-1000">
              <Image 
                src={image} 
                width={1024}
                height={1024}
                alt="Processed image" 
                className="opacity-30 hover:opacity-70 transition-opacity duration-1000"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer section */}
      <div className="mt-8 flex flex-col items-center text-center">
        <div className="audio-player mb-4">
          <audio controls src={audioSrc} className="bg-black">
            Your browser does not support the audio element.
          </audio>
        </div>
        <p className="text-xl">
          created during art and research residency at{' '}
          <a href='https://lakestudiosberlin.com/' className="text-white hover:text-gray-300">
            Lake Studios Berlin
          </a>{' '}
          | February 2024
        </p>
      </div>
    </main>
  );
}

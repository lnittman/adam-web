'use client';

import styles from './AsciiText.module.scss';
import * as React from 'react';

interface AsciiTextProps {
  text?: string;
  imageSrc?: string;
  width?: number;
}

const ASCII_CHARS = '@%#*+=-:. ';

const AsciiText: React.FC<AsciiTextProps> = ({ text, imageSrc, width = 40 }) => {
  const [asciiArt, setAsciiArt] = React.useState<string>(text || '');
  const [glitching, setGlitching] = React.useState(false);
  const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

  const convertToAscii = React.useCallback((image: HTMLImageElement, width: number) => {
    const canvas = document.createElement('canvas');
    const height = Math.floor(width * (image.height / image.width) * 0.5);
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    ctx.drawImage(image, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    let ascii = '';
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const idx = (i * width + j) * 4;
        const brightness = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
        const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
        ascii += ASCII_CHARS[charIndex];
      }
      ascii += '\n';
    }
    return ascii;
  }, []);

  React.useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        const ascii = convertToAscii(img, width);
        setAsciiArt(ascii);
      };
      img.src = imageSrc;
    }
  }, [imageSrc, width, convertToAscii]);

  const glitch = React.useCallback(() => {
    if (!asciiArt) return;
    
    setGlitching(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setAsciiArt(prev => {
        if (iterations >= 15) {
          clearInterval(interval);
          setGlitching(false);
          return prev;
        }

        const lines = prev.split('\n');
        const glitchedLines = lines.map(line => {
          if (Math.random() < 0.1) {
            return line.split('').map(char => 
              Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
            ).join('');
          }
          return line;
        });
        
        iterations++;
        return glitchedLines.join('\n');
      });
    }, 50);

    return () => clearInterval(interval);
  }, [asciiArt]);

  React.useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (!glitching) {
        glitch();
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [glitch, glitching]);

  return (
    <div className={styles.ascii}>
      <pre>{asciiArt}</pre>
    </div>
  );
};

export default AsciiText; 
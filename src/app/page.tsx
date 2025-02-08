"use client"

import DefaultLayout from '@/components/page/DefaultLayout';
import AsciiText from '@/components/examples/AsciiText';
import styles from '@/components/page/root.module.scss';
import BlockLoader from '@/components/BlockLoader';
import FooterNavigation from '@/components/FooterNavigation';
import Text from '@/components/Text';
import LogoWall from '@/components/LogoWall';
import { useState } from 'react';
import ButtonGroup from '@components/ButtonGroup';
import BoubaKikiFrame from '@components/BoubaKikiFrame';

const scrollingText = [
  { text: 'iOS DEVELOPER   ⌘ ' },
  { text: 'LOS ANGELES   ⚡ ' },
  { text: 'AVAILABLE FOR CONTRACT WORK   ⚔ ' },
  { text: 'GET IN TOUCH   ☯ ' },
  { text: '2025   ⚓ ' },
];

export default function Home() {
  const [shapeType, setShapeType] = useState<'bouba' | 'kiki'>('bouba');

  return (
    <DefaultLayout previewPixelSRC="https://intdev-global.s3.us-west-2.amazonaws.com/template-app-icon.png">
      {/* Header */}
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.header}>
            <h1>Adam Delaney</h1>
            <BlockLoader mode={2} />
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.centerContent}>
            <BoubaKikiFrame type={shapeType} />
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              marginTop: '1rem'
            }}>
              <ButtonGroup
                items={[
                  {
                    body: '🌀 Bouba',
                    onClick: () => setShapeType('bouba'),
                    selected: shapeType === 'bouba'
                  },
                  {
                    body: '🔺 Kiki',
                    onClick: () => setShapeType('kiki'),
                    selected: shapeType === 'kiki'
                  }
                ]}
              />
            </div>
          </div>

          {/* Scrolling Text */}
          <div className={styles.scrollingTextContainer}>
            <LogoWall
              items={scrollingText}
              direction="horizontal"
              pauseOnHover={true}
              size="1rem"
              duration="30s"
              bgColor="transparent"
              bgAccentColor="transparent"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <FooterNavigation />
        <div className={styles.footerContact}>
          <Text>
            <a href="mailto:adam.delaney11@gmail.com">📧 adam.delaney11@gmail.com</a>
          </Text>
          <Text>
            <a href="tel:2489283888">📱 (248) 928-3888</a>
          </Text>
          <Text>
            <a href="https://github.com/adelaney11" target="_blank">🐙 github.com/adelaney11</a>
          </Text>
        </div>
      </div>
    </DefaultLayout>
  );
}

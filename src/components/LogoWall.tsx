'use client';

import styles from '@/components/LogoWall.module.scss';
import * as React from 'react';
import Text from '@/components/Text';

interface LogoWallProps {
  items: Array<{
    text: string;
    imgUrl?: string;
    altText?: string;
  }>;
  direction?: 'horizontal' | 'vertical';
  pauseOnHover?: boolean;
  size?: string;
  duration?: string;
  textColor?: string;
  bgColor?: string;
  bgAccentColor?: string;
}

const LogoWall: React.FC<LogoWallProps> = ({
  items = [],
  direction = "horizontal",
  pauseOnHover = false,
  size = "1rem",
  duration = "20s",
  textColor = "#ffffff",
  bgColor = "transparent",
  bgAccentColor = "transparent"
}) => {
  const [isPaused, setIsPaused] = React.useState(false);

  // Duplicate items multiple times to ensure seamless scrolling
  const repeatedItems = [...items, ...items, ...items, ...items];

  const wrapperClass = [
    styles.wrapper,
    direction === "vertical" && styles.wrapperVertical
  ]
    .filter(Boolean)
    .join(" ");

  const marqueeClass = [
    styles.marquee,
    direction === "vertical" && styles.marqueeVertical,
    isPaused && styles.paused
  ]
    .filter(Boolean)
    .join(" ");

  const renderItem = (item: typeof items[0]) => {
    if (item.imgUrl) {
      return <img src={item.imgUrl} alt={item.altText} />;
    }
    return <Text>{item.text}</Text>;
  };

  return (
    <article
      className={wrapperClass}
      style={{
        "--size": size,
        "--duration": duration,
        "--color-text": textColor,
        "--color-bg": bgColor,
        "--color-bg-accent": bgAccentColor
      } as React.CSSProperties}
    >
      <div
        className={marqueeClass}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <div className={styles.marqueeGroup}>
          {repeatedItems.map((item, idx) => (
            <div key={idx} className={styles.marqueeItem}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default LogoWall; 
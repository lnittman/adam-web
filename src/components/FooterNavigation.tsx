'use client';

import styles from '@/components/page/root.module.scss';
import ButtonGroup from '@/components/ButtonGroup';
import * as React from 'react';

const FooterNavigation: React.FC = () => {
  const navigationItems = [
    {
      body: '🏠 HOME',
      href: '/',
      hotkey: 'h',
    },
    {
      body: '👤 BIO',
      href: '/bio',
      hotkey: 'b',
    },
    {
      body: '💻 PROJECTS',
      href: '/projects',
      hotkey: 'p',
    },
  ];

  return (
    <div className={styles.footerNav}>
      <ButtonGroup items={navigationItems} />
    </div>
  );
};

export default FooterNavigation; 
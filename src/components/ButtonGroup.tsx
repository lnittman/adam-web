'use client';

import styles from '@components/ButtonGroup.module.scss';
import * as React from 'react';
import * as Utilities from '@common/utilities';
import ActionButton from '@components/ActionButton';
import DropdownMenuTrigger from '@components/DropdownMenuTrigger';
import { useRouter } from 'next/navigation';

interface ButtonGroupProps {
  items: {
    body: string;
    href?: string;
    target?: string;
    items?: any[];
    hotkey?: string;
    openHotkey?: string;
    selected?: boolean;
    onClick?: () => void;
  }[];
  isFull?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ items, isFull }) => {
  const router = useRouter();

  if (!items) {
    return null;
  }

  return (
    <div className={Utilities.classNames(styles.root, isFull ? styles.full : null)}>
      {items.map((each) => {
        if (each.items) {
          return (
            <DropdownMenuTrigger key={each.body} items={each.items} hotkey={each.openHotkey}>
              <ActionButton hotkey={each.hotkey} isSelected={each.selected}>
                {each.body}
              </ActionButton>
            </DropdownMenuTrigger>
          );
        }

        return (
          <ActionButton 
            key={each.body} 
            onClick={each.onClick || (each.href ? () => {
              if (each.target === '_blank') {
                window.open(each.href, '_blank');
              } else {
                router.push(each.href);
              }
            } : undefined)}
            hotkey={each.hotkey} 
            isSelected={each.selected}
          >
            {each.body}
          </ActionButton>
        );
      })}
    </div>
  );
};

export default ButtonGroup;

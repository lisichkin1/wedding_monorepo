import Heart from '../../icons/heart.svg?react';
import Lock from '../../icons/lock.svg?react';
import Unlock from '../../icons/unlock.svg?react';

export const iconsMap = {
  heart: Heart,
  lock: Lock,
  unlock: Unlock
};

export type TIconMapKeys = keyof typeof iconsMap;

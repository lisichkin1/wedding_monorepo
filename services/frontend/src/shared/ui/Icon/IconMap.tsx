import Lock from '../../icons/lock.svg?react';
import Unlock from '../../icons/unlock.svg?react';

export const iconsMap = {
  lock: Lock,
  unlock: Unlock
};

export type TIconMapKeys = keyof typeof iconsMap;

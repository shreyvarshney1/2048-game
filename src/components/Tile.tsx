import { type CSSProperties, useMemo } from 'react';
import clsx from 'clsx';

import {
  type Animation,
  type AnimationMerge,
  type AnimationMove,
  type AnimationNew,
  AnimationType,
} from '@/types/Animations';
import { Direction } from '@/types/Direction';

export interface TileProps {
  value: number;
  animations?: Animation[];
}

function tileTranslate(axis: 'X' | 'Y', value: number) {
  return `translate${axis}(calc(${value} * (1rem + 100%))`;
}

function findAnimation<T extends Animation>(
  animations: Animation[] | undefined,
  type: AnimationType,
): T {
  return animations?.find((animation) => animation.type === type) as T;
}

const Tile: React.FC<TileProps> = ({ value, animations }) => {
  const moveAnimation = useMemo(
    () => findAnimation<AnimationMove>(animations, AnimationType.MOVE),
    [animations],
  );
  const newAnimation = useMemo(
    () => findAnimation<AnimationNew>(animations, AnimationType.NEW),
    [animations],
  );
  const mergeAnimation = useMemo(
    () => findAnimation<AnimationMerge>(animations, AnimationType.MERGE),
    [animations],
  );

  const style = useMemo(() => {
    if (!moveAnimation) {
      return {};
    }

    const value: CSSProperties = {
      transition: '100ms ease-in-out all',
    };

    switch (moveAnimation.direction) {
      case Direction.UP:
        value.transform = tileTranslate('Y', -1 * moveAnimation.value);
        break;
      case Direction.DOWN:
        value.transform = tileTranslate('Y', moveAnimation.value);
        break;
      case Direction.LEFT:
        value.transform = tileTranslate('X', -1 * moveAnimation.value);
        break;
      case Direction.RIGHT:
        value.transform = tileTranslate('X', moveAnimation.value);
        break;
    }

    return value;
  }, [moveAnimation]);

  function tileColor(value: number): string {
    switch (value) {
      case 2:
        return 'bg-[#EEE4DA]';
      case 4:
        return 'bg-[#EEE1C9]';
      case 8:
        return 'bg-[#F3B27A]';
      case 16:
        return 'bg-[#F69664]';
      case 32:
        return 'bg-[#F77C5F]';
      case 64:
        return 'bg-[#F75F3B]';
      case 128:
        return 'bg-[#EDD073]';
      case 256:
        return 'bg-[#EDCC62]';
      case 512:
        return 'bg-[#EDC850]';
      case 1024:
        return 'bg-[#EDC53F]';
      case 2048:
        return 'bg-[#EDC22E]';
      default:
        return 'bg-[#cdc1b4]';
    }
  }
  const getFontSize = (value: number) => {
    let size
  
    switch (value.toString.length) {
      case 3:
        size = 3
        break
      case 4:
        size = 2
        break
      case 5:
        size = 1
        break
      default:
        size = 4
    }
  
    return size == 1 ? "text-xl" : `text-${size}xl`
  }
  const getTextColour = (value: number) => {
    return value < 8 ? "text-[#776E65]" : "text-[#FFF]"
  }
  return (
    <div className="leading-0 relative rounded-md  bg-[#cdc1b4] pb-[100%] text-lg elevation-2">
      {value !== 0 && (
        <div
          className={clsx(
            'leading-0 z-9 absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-md bg-[#3c3a32] font-bold',
            tileColor(value),
            getFontSize(value),
            getTextColour(value),
            {
              new: !!newAnimation,
              merge: !!mergeAnimation,
            },
          )}
          style={style}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default Tile;

import type { TIconMapKeys } from './IconMap';
import { iconsMap } from './IconMap';

export type TIconProps = {
  name: TIconMapKeys;
  size?: number;
  height?: number;
  className?: string;
  fill?: string;
};

/**
 * @name Icon
 * @description Компонент используется для отображения иконок из коллекции iconsMap
 * @param {Object} props - Свойства компонента.
 * @param {string} props.className - Дополнительный класс
 * @param {string} props.name - тип иконки из коллекции iconsMap
 * @param {string} props.size - размер иконки в ширину и высоту
 * @param {string} props.height - высота иконки
 * @param {string} props.fill - заливка svg
 */

export const Icon = ({
  name,
  size = 24,
  height,
  className,
  fill
}: TIconProps) => {
  const IconComponent = iconsMap[name];

  return (
    <IconComponent
      className={className}
      style={{ width: size, height: height || size, fill: fill }}
    />
  );
};

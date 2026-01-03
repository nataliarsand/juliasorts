import { useState } from 'react';
import './ArcadeButton.css';

/**
 * ArcadeButton - A chunky, 90s arcade-style button
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {'primary' | 'secondary' | 'danger' | 'success'} props.variant - Button style variant
 * @param {'sm' | 'md' | 'lg'} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.fullWidth - Full width button
 * @param {string} props.className - Additional CSS classes
 */
export function ArcadeButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  const classNames = [
    'arcade-button',
    `arcade-button--${variant}`,
    `arcade-button--${size}`,
    isPressed && 'arcade-button--pressed',
    disabled && 'arcade-button--disabled',
    fullWidth && 'arcade-button--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="arcade-button__face">
        <span className="arcade-button__content">{children}</span>
      </span>
    </button>
  );
}

export default ArcadeButton;

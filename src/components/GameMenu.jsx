import { useEffect } from 'react';
import './GameMenu.css';

/**
 * GameMenu - A retro game-style modal menu
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the menu is open
 * @param {Function} props.onClose - Callback to close the menu
 * @param {string} props.title - Menu title
 * @param {React.ReactNode} props.children - Menu content
 */
export function GameMenu({ isOpen, onClose, title, children }) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="game-menu__overlay" onClick={onClose}>
      <div
        className="game-menu"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-menu-title"
      >
        {/* Decorative corners */}
        <div className="game-menu__corner game-menu__corner--tl" />
        <div className="game-menu__corner game-menu__corner--tr" />
        <div className="game-menu__corner game-menu__corner--bl" />
        <div className="game-menu__corner game-menu__corner--br" />

        {/* Header */}
        <div className="game-menu__header">
          <h2 id="game-menu-title" className="game-menu__title">{title}</h2>
          <button
            className="game-menu__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ESC
          </button>
        </div>

        {/* Scanline effect */}
        <div className="game-menu__scanlines" />

        {/* Content */}
        <div className="game-menu__content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default GameMenu;

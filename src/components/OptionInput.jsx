import { useState } from 'react';
import './OptionInput.css';

const sanitize = (str) => str.replace(/<[^>]*>/g, '');

/**
 * OptionInput - Retro-styled input for adding options
 * @param {Object} props
 * @param {Function} props.onAdd - Callback when option is added
 * @param {string} props.placeholder - Input placeholder text
 * @param {boolean} props.disabled - Disabled state
 */
export function OptionInput({ onAdd, placeholder = 'Type an option...', disabled = false }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitized = sanitize(value.trim());
    if (sanitized && onAdd) {
      onAdd(sanitized);
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="option-input">
      <div className="option-input__wrapper">
        <span className="option-input__prompt">&gt;</span>
        <input
          type="text"
          className="option-input__field"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={50}
        />
        <button
          type="button"
          className="option-input__add"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          aria-label="Add option"
        >
          +
        </button>
      </div>
      <div className="option-input__hint">
        Press ENTER or click + to add
      </div>
    </div>
  );
}

export default OptionInput;

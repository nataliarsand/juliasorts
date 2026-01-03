import './OptionChip.css';

/**
 * OptionChip - A pixel-art styled chip for displaying options
 * @param {Object} props
 * @param {string} props.label - The option text
 * @param {Function} props.onRemove - Callback when chip is removed
 * @param {boolean} props.isHighlighted - Whether chip is currently highlighted (during spin)
 * @param {boolean} props.isSelected - Whether chip is the selected result
 * @param {number} props.index - Index for staggered animations
 */
export function OptionChip({
  label,
  onRemove,
  isHighlighted = false,
  isSelected = false,
  index = 0
}) {
  const classNames = [
    'option-chip',
    isHighlighted && 'option-chip--highlighted',
    isSelected && 'option-chip--selected',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <span className="option-chip__label">{label}</span>
      {onRemove && (
        <button
          type="button"
          className="option-chip__remove"
          onClick={() => onRemove(label)}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default OptionChip;

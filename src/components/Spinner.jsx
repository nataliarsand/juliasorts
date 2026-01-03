import { useEffect, useState, useRef } from 'react';
import './Spinner.css';

/**
 * Spinner - Slot machine style display for the randomization
 * @param {Object} props
 * @param {string[]} props.options - Array of options to cycle through
 * @param {boolean} props.isSpinning - Whether the spinner is active
 * @param {string} props.result - The final selected result
 */
export function Spinner({ options, isSpinning, result }) {
  const [displayText, setDisplayText] = useState('???');
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isSpinning && options.length > 0) {
      let index = 0;
      let speed = 50;

      const spin = () => {
        setDisplayText(options[index % options.length]);
        index++;

        intervalRef.current = setTimeout(spin, speed);
        // Gradually slow down
        if (speed < 150) {
          speed += 2;
        }
      };

      spin();
    } else if (!isSpinning && result) {
      // Clear spinning interval
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }

      // Brief delay before showing result for dramatic effect
      timeoutRef.current = setTimeout(() => {
        setDisplayText(result);
      }, 100);
    } else if (!isSpinning && !result) {
      setDisplayText('???');
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isSpinning, options, result]);

  const classNames = [
    'spinner',
    isSpinning && 'spinner--spinning',
    !isSpinning && result && 'spinner--result',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <div className="spinner__frame">
        <div className="spinner__corner spinner__corner--tl" />
        <div className="spinner__corner spinner__corner--tr" />
        <div className="spinner__corner spinner__corner--bl" />
        <div className="spinner__corner spinner__corner--br" />

        <div className="spinner__screen">
          <div className="spinner__scanlines" />
          <div className="spinner__text">{displayText}</div>
        </div>
      </div>

      <div className="spinner__label">
        {isSpinning ? 'SORTING...' : result ? 'WINNER!' : 'READY'}
      </div>
    </div>
  );
}

export default Spinner;

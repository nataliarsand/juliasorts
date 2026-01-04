import { useState, useCallback } from 'react';
import { ArcadeButton, OptionInput, OptionChip, Spinner, GameMenu } from './components';
import './App.css';

// Suggested quick-pick categories for inspiration
const QUICK_PICKS = [
  { label: 'FOOD', options: ['Pizza', 'Sushi', 'Tacos', 'Burger'] },
  { label: 'ACTIVITY', options: ['Movie', 'Board game', 'Go outside', 'Video game'] },
  { label: 'BOARD GAME', options: ['Catan', 'Carcassonne', 'Ticket to Ride', 'Codenames'] },
  { label: 'DINNER', options: ['Cook', 'Takeaway'] },
];

function App() {
  const [options, setOptions] = useState(['Yes', 'No']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Format options for display: "Yes vs No" or "A vs B vs C"
  const optionsDisplay = options.length > 0
    ? options.map((opt, i) => (
        <span key={opt}>
          {opt}
          {i < options.length - 1 && <span className="app__vs"> vs </span>}
        </span>
      ))
    : 'No options yet';

  const addOption = useCallback((option) => {
    if (option && !options.includes(option) && options.length < 5) {
      setOptions((prev) => [...prev, option]);
      setResult(null);
    }
  }, [options]);

  const removeOption = useCallback((option) => {
    setOptions((prev) => prev.filter((o) => o !== option));
    if (result === option) {
      setResult(null);
    }
  }, [result]);

  const clearAll = useCallback(() => {
    setOptions([]);
    setResult(null);
    setHighlightedIndex(null);
  }, []);

  const loadQuickPick = useCallback((quickPick) => {
    setOptions(quickPick.options);
    setResult(null);
  }, []);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
    setResult(null);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const sort = useCallback(() => {
    if (options.length < 2) return;

    setIsSpinning(true);
    setResult(null);
    setIsMenuOpen(false);

    // Highlight random options during spinning
    let spinCount = 0;
    const maxSpins = 20 + Math.floor(Math.random() * 10);
    const spinInterval = setInterval(() => {
      setHighlightedIndex(Math.floor(Math.random() * options.length));
      spinCount++;

      if (spinCount >= maxSpins) {
        clearInterval(spinInterval);

        // Pick the winner
        const winnerIndex = Math.floor(Math.random() * options.length);
        setHighlightedIndex(null);
        setResult(options[winnerIndex]);
        setIsSpinning(false);
      }
    }, 100);
  }, [options]);

  const canSort = options.length >= 2 && !isSpinning;

  return (
    <div className="app">
      {/* Decorative background elements */}
      <div className="app__bg-grid" />
      <div className="app__bg-glow" />

      <main className="app__main">
        {/* Header */}
        <header className="app__header">
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            srcSet={`${import.meta.env.BASE_URL}images/logo.png 1x, ${import.meta.env.BASE_URL}images/logo@2x.png 2x`}
            alt="Julia Sorts"
            className="app__logo"
          />
          <p className="app__subtitle">
            Can&apos;t decide? Let fate choose for you!
          </p>
        </header>

        {/* Main content area */}
        <div className="app__content">
          {/* Spinner Display */}
          <section className="app__spinner-section">
            {/* Current options display */}
            <div className="app__sorting-label">
              <span className="app__sorting-prefix">Sorting options:</span>
              <span className="app__sorting-options">{optionsDisplay}</span>
              {!isSpinning && (
                <button
                  className="app__change-btn"
                  onClick={openMenu}
                  type="button"
                >
                  [change]
                </button>
              )}
            </div>

            <Spinner
              options={options}
              isSpinning={isSpinning}
              result={result}
            />

            <div className="app__actions">
              <ArcadeButton
                variant="primary"
                size="lg"
                onClick={sort}
                disabled={!canSort}
              >
                {isSpinning ? 'SORTING...' : result ? 'SORT AGAIN' : 'SORT IT!'}
              </ArcadeButton>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="app__footer">
          <p>
            Inspired by Julia&apos;s indecisiveness
            <span className="app__footer-heart"> ♥ </span>
          </p>
        </footer>
      </main>

      {/* Options Menu */}
      <GameMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        title="Options"
      >
        <OptionInput
          onAdd={addOption}
          placeholder="Add an option..."
        />

        {/* Option Chips */}
        {options.length > 0 ? (
          <div className="menu-chips">
            {options.map((option, index) => (
              <OptionChip
                key={option}
                label={option}
                onRemove={removeOption}
                isHighlighted={highlightedIndex === index}
                isSelected={result === option}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="menu-empty">
            <p>Add at least 2 options to start sorting!</p>
          </div>
        )}

        {/* Quick Picks */}
        <div className="menu-quick-picks">
          <h3 className="menu-quick-picks__title">Quick Picks</h3>
          <div className="menu-quick-picks__buttons">
            {QUICK_PICKS.map((quickPick) => (
              <ArcadeButton
                key={quickPick.label}
                variant="secondary"
                size="sm"
                onClick={() => loadQuickPick(quickPick)}
              >
                {quickPick.label}
              </ArcadeButton>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="menu-actions">
          {options.length > 0 && (
            <ArcadeButton
              variant="danger"
              size="sm"
              onClick={clearAll}
            >
              CLEAR ALL
            </ArcadeButton>
          )}
          {options.length >= 2 && (
            <ArcadeButton
              variant="success"
              size="lg"
              onClick={closeMenu}
            >
              READY!
            </ArcadeButton>
          )}
        </div>
      </GameMenu>
    </div>
  );
}

export default App;

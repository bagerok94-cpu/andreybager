'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './InteractiveCard.module.css';

export type CardState = 'closed' | 'opening' | 'open' | 'closing';

export type CardAnimationType =
  | 'ring'
  | 'code-pixels'
  | 'paper-plane'
  | 'geometric-assemble'
  | 'layers-fold'
  | 'rocket-launch'
  | 'sound-waves'
  | 'default';

export interface InteractiveCardProps {
  id: string;
  title: string;
  preview: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  animationType?: CardAnimationType;
  className?: string;
}

const ANIMATION_CLASS_MAP: Record<CardAnimationType, string> = {
  ring: styles.playRing,
  'code-pixels': styles.playCodePixels,
  'paper-plane': styles.playPaperPlane,
  'geometric-assemble': styles.playGeometricAssemble,
  'layers-fold': styles.playLayersFold,
  'rocket-launch': styles.playRocketLaunch,
  'sound-waves': styles.playSoundWaves,
  default: '',
};

export function InteractiveCard({
  id,
  title,
  preview,
  children,
  icon,
  animationType = 'default',
  className = '',
}: InteractiveCardProps) {
  const [state, setState] = useState<CardState>('closed');
  const [playAnimation, setPlayAnimation] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isOpen = state === 'open' || state === 'opening';
  const contentId = `card-content-${id}`;
  const headerId = `card-header-${id}`;

  const openCard = useCallback(() => {
    if (state === 'open' || state === 'opening') return;

    setState('opening');
    if (animationType !== 'default') {
      // Trigger micro-animation once upon opening
      setPlayAnimation(true);
    }

    const timer = setTimeout(() => {
      setState('open');
    }, 350);

    return () => clearTimeout(timer);
  }, [state, animationType]);

  const closeCard = useCallback(() => {
    if (state === 'closed' || state === 'closing') return;

    setState('closing');
    setPlayAnimation(false);

    const timer = setTimeout(() => {
      setState('closed');
    }, 350);

    return () => clearTimeout(timer);
  }, [state]);

  // Keyboard handler for Escape key when card is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCard]);

  // Reset animation flag after micro-animation finishes
  useEffect(() => {
    if (playAnimation) {
      const timer = setTimeout(() => {
        setPlayAnimation(false);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [playAnimation]);

  const handleTriggerClick = () => {
    if (isOpen) {
      closeCard();
    } else {
      openCard();
    }
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen) {
        closeCard();
      } else {
        openCard();
      }
    }
  };

  const animClass = playAnimation ? ANIMATION_CLASS_MAP[animationType] || '' : '';

  const cardClasses = [
    styles.card,
    styles[state],
    animClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      ref={cardRef}
      id={`card-${id}`}
      className={cardClasses}
      aria-labelledby={headerId}
    >
      {/* Trigger element for card header & preview */}
      <button
        type="button"
        id={headerId}
        className={styles.trigger}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <div className={styles.headerRow}>
          <div className={styles.titleArea}>
            {icon && (
              <div className={styles.visualWrapper}>
                <span className={styles.ringEffect} aria-hidden="true" />
                <span className={styles.iconContainer}>{icon}</span>
              </div>
            )}
            <h2 className={styles.title}>{title}</h2>
          </div>
          {!isOpen && (
            <span className={styles.expandIcon} aria-hidden="true">
              ↗
            </span>
          )}
        </div>

        {/* Closed state preview */}
        {!isOpen && <div className={styles.previewContent}>{preview}</div>}
      </button>

      {/* Close button inside open state */}
      {isOpen && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={closeCard}
          aria-label="Закрыть карточку"
        >
          ✕
        </button>
      )}

      {/* Expanded container for open state */}
      <div
        id={contentId}
        className={styles.expandedContainer}
        role="region"
        aria-labelledby={headerId}
      >
        <div className={styles.expandedInner}>{children}</div>
      </div>
    </article>
  );
}

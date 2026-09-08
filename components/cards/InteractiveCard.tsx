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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isOpen = state === 'open' || state === 'opening';
  const contentId = `card-content-${id}`;
  const headerId = `card-header-${id}`;

  const clearTransitionTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTransitionTimers();
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, [clearTransitionTimers]);

  const openCard = useCallback(() => {
    if (state === 'open' || state === 'opening') return;

    clearTransitionTimers();
    setState('opening');
    if (animationType !== 'default') {
      setPlayAnimation(true);
    }

    openTimerRef.current = setTimeout(() => {
      setState('open');
      openTimerRef.current = null;
    }, 350);
  }, [state, animationType, clearTransitionTimers]);

  const closeCard = useCallback(() => {
    if (state === 'closed' || state === 'closing') return;

    clearTransitionTimers();
    setState('closing');
    setPlayAnimation(false);
    triggerRef.current?.focus();

    closeTimerRef.current = setTimeout(() => {
      setState('closed');
      closeTimerRef.current = null;
    }, 350);
  }, [state, clearTransitionTimers]);

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

  useEffect(() => {
    if (!playAnimation) return;

    animationTimerRef.current = setTimeout(() => {
      setPlayAnimation(false);
      animationTimerRef.current = null;
    }, 900);

    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
        animationTimerRef.current = null;
      }
    };
  }, [playAnimation]);

  const handleTriggerClick = () => {
    if (isOpen) {
      closeCard();
    } else {
      openCard();
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
      <button
        ref={triggerRef}
        type="button"
        id={headerId}
        className={styles.trigger}
        onClick={handleTriggerClick}
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

        {!isOpen && <div className={styles.previewContent}>{preview}</div>}
      </button>

      {isOpen && (
        <button
          type="button"
          className={styles.backButton}
          onClick={closeCard}
          aria-label="Назад"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
            <path
              d="M15 6L9 12l6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {isOpen && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={closeCard}
          aria-label="Закрыть карточку"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

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

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

const getFocusableElements = (container) => {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => (
    element instanceof HTMLElement && !element.hasAttribute('disabled')
  ));
};

const AccessibleModal = ({
  bodyClassName = '',
  children,
  closeButtonClassName = '',
  closeLabel = 'Close dialog',
  containerClassName = 'items-center justify-center p-4 md:p-10',
  header,
  headerClassName = '',
  initialFocusRef = null,
  isOpen,
  onClose,
  overlayClassName = 'bg-black/50 backdrop-blur-sm',
  panelClassName = '',
  titleId,
}) => {
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') {
      return undefined;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      const focusableElements = getFocusableElements(panelRef.current);
      const focusTarget = initialFocusRef?.current ?? focusableElements[0] ?? panelRef.current;

      focusTarget?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements(panelRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;

      if (previousFocusRef.current instanceof HTMLElement && previousFocusRef.current.isConnected) {
        window.requestAnimationFrame(() => {
          previousFocusRef.current?.focus();
        });
      }
    };
  }, [initialFocusRef, isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className={`fixed inset-0 z-[100] flex ${containerClassName}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${overlayClassName}`}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative z-10 ${panelClassName}`}
      >
        <div className={headerClassName}>
          <div className="min-w-0 flex-1">{header}</div>
          <button
            type="button"
            onClick={onClose}
            className={closeButtonClassName}
            aria-label={closeLabel}
          >
            <X size={18} />
          </button>
        </div>

        <div className={bodyClassName}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default AccessibleModal;

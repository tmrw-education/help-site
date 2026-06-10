import React, { useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { ChevronDown } from '@carbon/icons-react';
import styles from './styles.module.css';

export type StepsProps = {
  children: ReactNode;
  className?: string;
};

// Numbered, rail-connected procedure list. Step title + body are always
// visible (help-center default per uncle); only <StepDetail> collapses.
export function Steps({ children, className }: StepsProps): JSX.Element {
  return <ol className={clsx(styles.steps, className)}>{children}</ol>;
}

export type StepProps = {
  title: ReactNode;
  /** Blue marker — signals an important/critical step. Use sparingly. */
  accent?: boolean;
  /** Inverse (filled ink) marker — signals the final/result step so it stands out. */
  final?: boolean;
  children?: ReactNode;
  className?: string;
};

export function Step({ title, accent, final, children, className }: StepProps): JSX.Element {
  return (
    <li
      className={clsx(
        styles.step,
        accent && styles.stepAccent,
        final && styles.stepFinal,
        className,
      )}
    >
      <div className={styles.stepTitle}>{title}</div>
      {children ? <div className={styles.stepBody}>{children}</div> : null}
    </li>
  );
}

export type StepDetailProps = {
  summary?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
};

// Opt-in collapsible aside for genuinely secondary content (advanced notes,
// troubleshooting, a long screenshot). Collapsed by default; the core steps
// never hide here.
export function StepDetail({
  summary = 'More detail',
  defaultOpen = false,
  children,
  className,
}: StepDetailProps): JSX.Element {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={clsx(styles.detail, className)}>
      <button
        type="button"
        className={styles.detailTrigger}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <ChevronDown
          size={16}
          className={clsx(styles.detailChevron, open && styles.detailChevronOpen)}
        />
        <span>{summary}</span>
      </button>
      <div className={clsx(styles.detailContent, open && styles.detailContentOpen)}>
        <div className={styles.detailInner}>{children}</div>
      </div>
    </div>
  );
}

import React from 'react';
import clsx from 'clsx';

/**
 * Re-usable button component with variants & loading state.
 * Usage: <Button variant="primary" onClick={...} loading>Submit</Button>
 */
const styles = {
  base: 'inline-flex items-center justify-center gap-2 font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  size: {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  },
  variant: {
    primary: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  ...rest
}) {
  return (
    <button
      className={clsx(styles.base, styles.size[size], styles.variant[variant], className)}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
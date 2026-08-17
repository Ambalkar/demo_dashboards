import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'priority' | 'status' | 'type' | 'health' | 'severity' | 'neutral';
  value?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', value, size = 'sm' }) => {
  const val = (value || label).toLowerCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (variant === 'priority' || variant === 'severity') {
    if (val === 'critical') {
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
    } else if (val === 'high') {
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200 font-medium';
    } else if (val === 'medium') {
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (val === 'low') {
      colorClasses = 'bg-slate-100 text-slate-600 border-slate-200';
    }
  } else if (variant === 'status') {
    if (['confirmed', 'answered', 'approved', 'completed', 'mitigated', 'achieved'].includes(val)) {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium';
    } else if (['pending', 'proposed', 'under review', 'in progress', 'monitoring', 'follow-up required'].includes(val)) {
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (['rejected', 'blocked', 'closed', 'delayed'].includes(val)) {
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
    } else if (['open', 'identified', 'not started', 'upcoming'].includes(val)) {
      colorClasses = 'bg-sky-50 text-sky-700 border-sky-200';
    }
  } else if (variant === 'health') {
    if (val === 'on track') {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold';
    } else if (val === 'needs attention') {
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-300 font-semibold';
    } else if (val === 'at risk') {
      colorClasses = 'bg-rose-50 text-rose-800 border-rose-300 font-semibold animate-pulse';
    }
  } else if (variant === 'type') {
    colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center border rounded-md whitespace-nowrap ${colorClasses} ${sizeClasses}`}>
      {label}
    </span>
  );
};

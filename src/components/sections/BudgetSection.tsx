import React from 'react';
import { DollarSign, PieChart, CreditCard, ShieldCheck } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';

export const BudgetSection: React.FC = () => {
  const { data, updateBudget } = useMeeting();
  const b = data.budget;

  const currencySymbol = b.currency === 'EUR' ? '€' : b.currency === 'GBP' ? '£' : '$';

  const formatCurr = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: b.currency || 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Percentage calculations for budget bar
  const maxVal = Math.max(b.maxBudget, b.estimatedBudget, b.approvedBudget, 1);
  const minPercent = Math.min(100, Math.round((b.minBudget / maxVal) * 100));
  const estPercent = Math.min(100, Math.round((b.estimatedBudget / maxVal) * 100));
  const appPercent = Math.min(100, Math.round((b.approvedBudget / maxVal) * 100));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600" /> Section 4: Budget & Commercial Terms
        </h3>
        <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-semibold">
          Financial Alignment
        </span>
      </div>

      {/* Visual Budget Progress Graphic */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white space-y-3 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Estimated Budget Target</span>
            <div className="text-2xl font-extrabold text-white">{formatCurr(b.estimatedBudget)}</div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">Min Floor</span>
              <span className="font-semibold text-slate-200">{formatCurr(b.minBudget)}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">Approved Cap</span>
              <span className="font-extrabold text-emerald-400">{formatCurr(b.approvedBudget)}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">Max Ceiling</span>
              <span className="font-semibold text-slate-200">{formatCurr(b.maxBudget)}</span>
            </div>
          </div>
        </div>

        {/* Visual Allocation Bar */}
        <div className="space-y-1 pt-2">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Range Allocation Visualizer</span>
            <span>Flexibility: <strong className="text-amber-300">{b.budgetFlexibility}</strong></span>
          </div>
          <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            {/* Min range */}
            <div
              className="absolute left-0 top-0 h-full bg-slate-500"
              style={{ width: `${minPercent}%` }}
              title={`Min: ${formatCurr(b.minBudget)}`}
            />
            {/* Estimated range */}
            <div
              className="absolute left-0 top-0 h-full bg-indigo-500 opacity-80"
              style={{ width: `${estPercent}%` }}
              title={`Estimated: ${formatCurr(b.estimatedBudget)}`}
            />
            {/* Approved range */}
            <div
              className="absolute left-0 top-0 h-full bg-emerald-400"
              style={{ width: `${appPercent}%` }}
              title={`Approved: ${formatCurr(b.approvedBudget)}`}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block"/> Min Budget</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"/> Estimated Target</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"/> Approved Cap</span>
          </div>
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Estimated Budget ({currencySymbol})</label>
          <input
            type="number"
            value={b.estimatedBudget}
            onChange={e => updateBudget({ estimatedBudget: Number(e.target.value) })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Minimum Budget ({currencySymbol})</label>
          <input
            type="number"
            value={b.minBudget}
            onChange={e => updateBudget({ minBudget: Number(e.target.value) })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Maximum Budget ({currencySymbol})</label>
          <input
            type="number"
            value={b.maxBudget}
            onChange={e => updateBudget({ maxBudget: Number(e.target.value) })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Approved Budget ({currencySymbol})</label>
          <input
            type="number"
            value={b.approvedBudget}
            onChange={e => updateBudget({ approvedBudget: Number(e.target.value) })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-700"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Currency</label>
          <select
            value={b.currency}
            onChange={e => updateBudget({ currency: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD ($)</option>
            <option value="AUD">AUD ($)</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Pricing Model</label>
          <select
            value={b.pricingModel}
            onChange={e => updateBudget({ pricingModel: e.target.value as any })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
          >
            <option value="Time & Materials">Time & Materials</option>
            <option value="Fixed Price">Fixed Price</option>
            <option value="Dedicated Team">Dedicated Team</option>
            <option value="Milestone-based">Milestone-based</option>
            <option value="Retainer">Retainer</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Budget Flexibility</label>
          <select
            value={b.budgetFlexibility}
            onChange={e => updateBudget({ budgetFlexibility: e.target.value as any })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
          >
            <option value="Strict">Strict (Fixed Limit)</option>
            <option value="Moderate">Moderate (+/- 15%)</option>
            <option value="Flexible">Flexible (Value Driven)</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Payment Schedule / Terms</label>
          <input
            type="text"
            value={b.paymentTerms}
            onChange={e => updateBudget({ paymentTerms: e.target.value })}
            placeholder="e.g. 30% upfront, 40% mid, 30% UAT"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold text-slate-700 mb-1 text-xs">Additional Commercial Notes</label>
        <textarea
          value={b.additionalNotes}
          onChange={e => updateBudget({ additionalNotes: e.target.value })}
          rows={2}
          placeholder="Contingency reserves, third-party API license costs..."
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
        />
      </div>
    </div>
  );
};

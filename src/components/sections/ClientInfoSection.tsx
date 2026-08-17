import React from 'react';
import { Building2, User, Mail, Phone, Calendar, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';

export const ClientInfoSection: React.FC = () => {
  const { data, updateClientInfo } = useMeeting();
  const info = data.clientInfo;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-600" /> Section 1: Client & Meeting Metadata
        </h3>
        <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
          Core Identification
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" /> Client / Company Name *
          </label>
          <input
            type="text"
            value={info.companyName}
            onChange={e => updateClientInfo({ companyName: e.target.value })}
            placeholder="e.g. Apex Retail Logistics"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" /> Contact Person
          </label>
          <input
            type="text"
            value={info.contactPerson}
            onChange={e => updateClientInfo({ contactPerson: e.target.value })}
            placeholder="e.g. Sarah Jenkins"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
          </label>
          <input
            type="email"
            value={info.email}
            onChange={e => updateClientInfo({ email: e.target.value })}
            placeholder="s.jenkins@apex.com"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number
          </label>
          <input
            type="text"
            value={info.phone}
            onChange={e => updateClientInfo({ phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Industry Domain
          </label>
          <input
            type="text"
            value={info.industry}
            onChange={e => updateClientInfo({ industry: e.target.value })}
            placeholder="Supply Chain / FinTech / Healthcare"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" /> Project Name *
          </label>
          <input
            type="text"
            value={info.projectName}
            onChange={e => updateClientInfo({ projectName: e.target.value })}
            placeholder="Omnichannel B2B Portal"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Meeting Date
          </label>
          <input
            type="date"
            value={info.meetingDate}
            onChange={e => updateClientInfo({ meetingDate: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Meeting Type</label>
          <select
            value={info.meetingType}
            onChange={e => updateClientInfo({ meetingType: e.target.value as any })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          >
            <option value="Discovery">Discovery</option>
            <option value="Requirement Gathering">Requirement Gathering</option>
            <option value="Scope Alignment">Scope Alignment</option>
            <option value="Budget Review">Budget Review</option>
            <option value="Final Sign-off">Final Sign-off</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Meeting Status</label>
          <select
            value={info.meetingStatus}
            onChange={e => updateClientInfo({ meetingStatus: e.target.value as any })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Follow-up Needed">Follow-up Needed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

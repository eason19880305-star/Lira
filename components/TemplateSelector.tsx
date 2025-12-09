import React from 'react';
import { TemplateId } from '../types';

interface Props {
  selected: TemplateId;
  onChange: (id: TemplateId) => void;
}

const templates: { id: TemplateId; name: string; color: string }[] = [
  { id: 'modern', name: '现代商务', color: 'bg-blue-600' },
  { id: 'classic', name: '经典学术', color: 'bg-gray-800' },
  { id: 'technical', name: '极客技术', color: 'bg-emerald-600' },
  { id: 'minimal', name: '极简主义', color: 'bg-slate-500' },
  { id: 'left-column', name: '侧栏创意', color: 'bg-sky-200' },
  { id: 'high-end', name: '高端雅致', color: 'bg-amber-700' },
];

const TemplateSelector: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 no-print px-2">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`
            flex-shrink-0 w-24 h-32 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all
            ${selected === t.id ? 'border-blue-500 ring-2 ring-blue-200 scale-105' : 'border-gray-200 hover:border-gray-300'}
          `}
        >
          <div className={`w-12 h-16 rounded shadow-sm opacity-80 ${t.color}`}></div>
          <span className="text-xs font-medium text-gray-700">{t.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
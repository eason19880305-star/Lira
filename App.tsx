import React, { useState } from 'react';
import { INITIAL_RESUME_DATA } from './constants';
import { ResumeData, TemplateId } from './types';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [templateId, setTemplateId] = useState<TemplateId>('modern');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Sidebar - Editor */}
      <div className="w-1/3 min-w-[400px] h-full flex flex-col bg-white border-r border-gray-200 shadow-xl z-10 no-print">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <h1 className="text-xl font-bold text-gray-800">EasyResume <span className="text-xs text-gray-500 font-normal ml-1">工科版</span></h1>
          </div>
          <button 
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 text-sm font-medium flex items-center gap-2"
          >
            🖨️ 导出/打印
          </button>
        </div>

        {/* Template Selector Area */}
        <div className="p-4 bg-gray-50 border-b">
           <p className="text-xs font-bold text-gray-400 uppercase mb-2">选择模板</p>
           <TemplateSelector selected={templateId} onChange={setTemplateId} />
        </div>

        {/* Form Area */}
        <div className="flex-1 overflow-hidden">
           <ResumeEditor data={resumeData} onChange={setResumeData} />
        </div>
      </div>

      {/* Right Content - Preview */}
      <div className="flex-1 h-full overflow-y-auto bg-gray-100 p-8 print-page">
        <div className="max-w-[210mm] mx-auto bg-white shadow-2xl min-h-[297mm] print:shadow-none print:w-full print:max-w-none">
           <ResumePreview data={resumeData} templateId={templateId} />
        </div>
        <div className="h-20 no-print"></div> {/* Spacer for scroll */}
      </div>
    </div>
  );
};

export default App;

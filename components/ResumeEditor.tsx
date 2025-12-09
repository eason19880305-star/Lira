import React, { useState } from 'react';
import { ResumeData, Project, Internship, Education } from '../types';
import StarGuideModal from './StarGuideModal';
import { polishContent } from '../services/geminiService';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeEditor: React.FC<Props> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isStarModalOpen, setIsStarModalOpen] = useState(false);
  const [currentFieldCallback, setCurrentFieldCallback] = useState<(text: string) => void>(() => {});
  const [isPolishing, setIsPolishing] = useState(false);

  const handleUpdate = (section: keyof ResumeData, value: any) => {
    onChange({ ...data, [section]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate('personalInfo', { ...data.personalInfo, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const openStarGuide = (callback: (text: string) => void) => {
    setCurrentFieldCallback(() => callback);
    setIsStarModalOpen(true);
  };

  const handlePolish = async (text: string, callback: (newText: string) => void) => {
    if (!text) return;
    setIsPolishing(true);
    const polished = await polishContent(text);
    callback(polished);
    setIsPolishing(false);
  };

  const addArrayItem = <T extends {id: string}>(section: 'education' | 'internships' | 'projects', item: T) => {
      const newArr = [...data[section], item];
      handleUpdate(section, newArr);
  };

  const updateArrayItem = (section: 'education' | 'internships' | 'projects', index: number, field: string, value: any) => {
      const newArr = [...data[section]];
      newArr[index] = { ...newArr[index], [field]: value };
      handleUpdate(section, newArr);
  };
  
  const removeArrayItem = (section: 'education' | 'internships' | 'projects', index: number) => {
      const newArr = [...data[section]];
      newArr.splice(index, 1);
      handleUpdate(section, newArr);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...data.sectionOrder];
    if (direction === 'up' && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    }
    handleUpdate('sectionOrder', newOrder);
  };

  const sectionLabels: Record<string, string> = {
    education: '教育经历',
    internships: '实习经历',
    projects: '项目经历',
    skills: '专业技能'
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      <StarGuideModal 
        isOpen={isStarModalOpen} 
        onClose={() => setIsStarModalOpen(false)} 
        onSave={(text) => currentFieldCallback(text)} 
      />

      {/* Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b">
        {['personal', 'education', 'internships', 'projects', 'skills', 'layout'].map(sec => (
          <button
            key={sec}
            onClick={() => setActiveSection(sec)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeSection === sec ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {sec === 'personal' ? '基本信息' : 
             sec === 'education' ? '教育经历' :
             sec === 'internships' ? '实习经历' :
             sec === 'projects' ? '项目经历' : 
             sec === 'skills' ? '专业技能' :
             sec === 'layout' ? '↕ 模块排序' : sec}
          </button>
        ))}
      </div>

      {/* Layout / Sorting */}
      {activeSection === 'layout' && (
        <div className="space-y-4 animate-fadeIn">
          <p className="text-sm text-gray-500 mb-4">点击箭头调整简历各模块的上下顺序。</p>
          <div className="space-y-3">
             <div className="p-3 bg-gray-100 rounded border border-gray-200 text-gray-400 text-center text-sm font-medium">
                个人基本信息 (固定顶部)
             </div>
             {data.sectionOrder.map((sec, idx) => (
               <div key={sec} className="p-3 bg-white rounded shadow-sm border border-gray-200 flex justify-between items-center transition-all hover:border-blue-300">
                  <span className="font-bold text-gray-800">{sectionLabels[sec]}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => moveSection(idx, 'up')} 
                      disabled={idx === 0}
                      className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-blue-100 disabled:opacity-30 disabled:hover:bg-gray-100"
                    >
                      ⬆
                    </button>
                    <button 
                      onClick={() => moveSection(idx, 'down')} 
                      disabled={idx === data.sectionOrder.length - 1}
                      className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-blue-100 disabled:opacity-30 disabled:hover:bg-gray-100"
                    >
                      ⬇
                    </button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* Personal Info */}
      {activeSection === 'personal' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="姓名" value={data.personalInfo.name} onChange={e => handleUpdate('personalInfo', {...data.personalInfo, name: e.target.value})} className="input-field" />
            <input type="text" placeholder="求职意向 (如: Java后端开发工程师)" value={data.personalInfo.jobIntention || ''} onChange={e => handleUpdate('personalInfo', {...data.personalInfo, jobIntention: e.target.value})} className="input-field" />
            <input type="text" placeholder="电话" value={data.personalInfo.phone} onChange={e => handleUpdate('personalInfo', {...data.personalInfo, phone: e.target.value})} className="input-field" />
            <input type="text" placeholder="邮箱" value={data.personalInfo.email} onChange={e => handleUpdate('personalInfo', {...data.personalInfo, email: e.target.value})} className="input-field" />
            <input type="text" placeholder="城市" value={data.personalInfo.location} onChange={e => handleUpdate('personalInfo', {...data.personalInfo, location: e.target.value})} className="input-field" />
            <input type="text" placeholder="Github (可选)" value={data.personalInfo.github || ''} onChange={e => handleUpdate('personalInfo', {...data.personalInfo, github: e.target.value})} className="input-field" />
            <input type="text" placeholder="博客 (可选)" value={data.personalInfo.blog || ''} onChange={e => handleUpdate('personalInfo', {...data.personalInfo, blog: e.target.value})} className="input-field" />
          </div>
          <div className="border p-3 rounded bg-gray-50">
            <label className="block text-sm font-bold text-gray-700 mb-2">证件照 (3:4)</label>
            <div className="flex items-center gap-3">
               {data.personalInfo.photoUrl && (
                 <img src={data.personalInfo.photoUrl} alt="Preview" className="h-16 w-12 object-cover border rounded" />
               )}
               <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>
        </div>
      )}

      {/* Education */}
      {activeSection === 'education' && (
        <div className="space-y-6 animate-fadeIn">
          {data.education.map((edu, idx) => (
            <div key={edu.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 relative">
              <button onClick={() => removeArrayItem('education', idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <input placeholder="学校" value={edu.school} onChange={e => updateArrayItem('education', idx, 'school', e.target.value)} className="input-field" />
                <input placeholder="学院" value={edu.college} onChange={e => updateArrayItem('education', idx, 'college', e.target.value)} className="input-field" />
                <input placeholder="学位 (如: 硕士)" value={edu.degree} onChange={e => updateArrayItem('education', idx, 'degree', e.target.value)} className="input-field" />
                <div className="flex gap-2">
                  <input placeholder="开始" value={edu.startDate} onChange={e => updateArrayItem('education', idx, 'startDate', e.target.value)} className="input-field w-1/2" />
                  <input placeholder="结束" value={edu.endDate} onChange={e => updateArrayItem('education', idx, 'endDate', e.target.value)} className="input-field w-1/2" />
                </div>
              </div>
              <input placeholder="GPA / 排名 (建议前5%才写)" value={edu.gpa || ''} onChange={e => updateArrayItem('education', idx, 'gpa', e.target.value)} className="input-field w-full mb-2" />
              <input placeholder="荣誉奖项" value={edu.honors || ''} onChange={e => updateArrayItem('education', idx, 'honors', e.target.value)} className="input-field w-full" />
            </div>
          ))}
          <button onClick={() => addArrayItem('education', { id: Date.now().toString(), school: '', degree: '', college: '', startDate: '', endDate: '' })} className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg border-2 border-dashed border-blue-200 hover:bg-blue-100">+ 添加教育经历</button>
        </div>
      )}

      {/* Internships */}
      {activeSection === 'internships' && (
        <div className="space-y-6 animate-fadeIn">
          {data.internships.map((job, idx) => (
            <div key={job.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 relative">
               <button onClick={() => removeArrayItem('internships', idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>
               <div className="grid grid-cols-2 gap-3 mb-2">
                 <input placeholder="公司" value={job.company} onChange={e => updateArrayItem('internships', idx, 'company', e.target.value)} className="input-field" />
                 <input placeholder="职位" value={job.role} onChange={e => updateArrayItem('internships', idx, 'role', e.target.value)} className="input-field" />
                 <div className="flex gap-2 col-span-2">
                   <input placeholder="开始" value={job.startDate} onChange={e => updateArrayItem('internships', idx, 'startDate', e.target.value)} className="input-field w-1/2" />
                   <input placeholder="结束" value={job.endDate} onChange={e => updateArrayItem('internships', idx, 'endDate', e.target.value)} className="input-field w-1/2" />
                 </div>
               </div>
               <textarea placeholder="简短摘要 (可选)" value={job.summary || ''} onChange={e => updateArrayItem('internships', idx, 'summary', e.target.value)} className="input-field w-full mb-3 text-sm h-16" />
               
               <div className="space-y-3">
                 <label className="text-sm font-semibold text-gray-700 flex justify-between items-center">
                    详细经历 (STAR法则)
                 </label>
                 {job.details.map((detail, dIdx) => (
                   <div key={dIdx} className="bg-gray-50 p-2 rounded border border-gray-100">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400 font-mono">条目 {dIdx + 1}</span>
                        <div className="flex gap-2">
                            <button 
                              disabled={isPolishing}
                              onClick={() => handlePolish(detail, (newText) => {
                                 const newDetails = [...job.details];
                                 newDetails[dIdx] = newText;
                                 updateArrayItem('internships', idx, 'details', newDetails);
                              })}
                              className="flex items-center gap-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
                            >
                              {isPolishing ? '...' : '✨ 润色/降重'}
                            </button>
                            <button 
                              onClick={() => openStarGuide((text) => {
                                 const newDetails = [...job.details];
                                 newDetails[dIdx] = text;
                                 updateArrayItem('internships', idx, 'details', newDetails);
                              })}
                              className="flex items-center gap-1 text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded hover:bg-green-200"
                            >
                              📘 STAR引导
                            </button>
                            <button 
                              onClick={() => {
                                 const newDetails = [...job.details];
                                 newDetails.splice(dIdx, 1);
                                 updateArrayItem('internships', idx, 'details', newDetails);
                              }}
                              className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            >
                              删除
                            </button>
                        </div>
                     </div>
                     <textarea 
                        value={detail} 
                        onChange={(e) => {
                           const newDetails = [...job.details];
                           newDetails[dIdx] = e.target.value;
                           updateArrayItem('internships', idx, 'details', newDetails);
                        }}
                        className="input-field w-full text-sm min-h-[50px] resize-y"
                        rows={2}
                     />
                   </div>
                 ))}
                 <button onClick={() => {
                    const newDetails = [...job.details, ""];
                    updateArrayItem('internships', idx, 'details', newDetails);
                 }} className="text-sm text-blue-600 hover:underline">+ 添加详情条目</button>
               </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('internships', { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', details: [''] })} className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg border-2 border-dashed border-blue-200 hover:bg-blue-100">+ 添加实习经历</button>
        </div>
      )}

      {/* Projects */}
      {activeSection === 'projects' && (
        <div className="space-y-6 animate-fadeIn">
          {data.projects.map((proj, idx) => (
            <div key={proj.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 relative">
               <button onClick={() => removeArrayItem('projects', idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>
               <div className="grid grid-cols-2 gap-3 mb-2">
                 <input placeholder="项目名称" value={proj.name} onChange={e => updateArrayItem('projects', idx, 'name', e.target.value)} className="input-field" />
                 <input placeholder="担任角色" value={proj.role} onChange={e => updateArrayItem('projects', idx, 'role', e.target.value)} className="input-field" />
                 <div className="flex gap-2 col-span-2">
                   <input placeholder="开始" value={proj.startDate} onChange={e => updateArrayItem('projects', idx, 'startDate', e.target.value)} className="input-field w-1/2" />
                   <input placeholder="结束" value={proj.endDate} onChange={e => updateArrayItem('projects', idx, 'endDate', e.target.value)} className="input-field w-1/2" />
                 </div>
               </div>
               
               <div className="mb-2">
                 <input 
                  placeholder="项目链接 (可选, e.g. github.com/user/repo)" 
                  value={proj.link || ''} 
                  onChange={e => updateArrayItem('projects', idx, 'link', e.target.value)} 
                  className="input-field w-full" 
                 />
               </div>

               <div className="mb-3">
                 <input 
                  placeholder="技术栈 (e.g. SpringBoot, Vue, MySQL)" 
                  value={proj.techStack} 
                  onChange={e => updateArrayItem('projects', idx, 'techStack', e.target.value)} 
                  className="input-field w-full" 
                 />
               </div>

               <textarea placeholder="项目简介" value={proj.summary} onChange={e => updateArrayItem('projects', idx, 'summary', e.target.value)} className="input-field w-full mb-3 text-sm h-16" />
               
               <div className="space-y-3">
                 <label className="text-sm font-semibold text-gray-700">项目详情 (推荐使用STAR法则)</label>
                 {proj.details.map((detail, dIdx) => (
                   <div key={dIdx} className="bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400 font-mono">条目 {dIdx + 1}</span>
                        <div className="flex gap-2">
                            <button 
                              disabled={isPolishing}
                              onClick={() => handlePolish(detail, (newText) => {
                                 const newDetails = [...proj.details];
                                 newDetails[dIdx] = newText;
                                 updateArrayItem('projects', idx, 'details', newDetails);
                              })}
                              className="flex items-center gap-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
                            >
                              {isPolishing ? '...' : '✨ 润色/降重'}
                            </button>
                            <button 
                              onClick={() => openStarGuide((text) => {
                                 const newDetails = [...proj.details];
                                 newDetails[dIdx] = text;
                                 updateArrayItem('projects', idx, 'details', newDetails);
                              })}
                              className="flex items-center gap-1 text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded hover:bg-green-200"
                            >
                              📘 STAR引导
                            </button>
                            <button 
                              onClick={() => {
                                 const newDetails = [...proj.details];
                                 newDetails.splice(dIdx, 1);
                                 updateArrayItem('projects', idx, 'details', newDetails);
                              }}
                              className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            >
                              删除
                            </button>
                        </div>
                     </div>
                     <textarea 
                        value={detail} 
                        onChange={(e) => {
                           const newDetails = [...proj.details];
                           newDetails[dIdx] = e.target.value;
                           updateArrayItem('projects', idx, 'details', newDetails);
                        }}
                        className="input-field w-full text-sm min-h-[50px] resize-y"
                        rows={2}
                     />
                   </div>
                 ))}
                 <button onClick={() => {
                    const newDetails = [...proj.details, ""];
                    updateArrayItem('projects', idx, 'details', newDetails);
                 }} className="text-sm text-blue-600 hover:underline">+ 添加项目详情</button>
               </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('projects', { id: Date.now().toString(), name: '', role: '', startDate: '', endDate: '', summary: '', techStack: '', details: [''], link: '' })} className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg border-2 border-dashed border-blue-200 hover:bg-blue-100">+ 添加项目经历</button>
        </div>
      )}

      {/* Skills */}
      {activeSection === 'skills' && (
        <div className="space-y-6 animate-fadeIn">
          {data.skills.map((skill, idx) => (
            <div key={idx} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 relative">
               <button onClick={() => {
                 const newSkills = [...data.skills];
                 newSkills.splice(idx, 1);
                 handleUpdate('skills', newSkills);
               }} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>
               
               <input 
                  placeholder="分类 (e.g. Java基础)" 
                  value={skill.category} 
                  onChange={e => {
                    const newSkills = [...data.skills];
                    newSkills[idx].category = e.target.value;
                    handleUpdate('skills', newSkills);
                  }} 
                  className="input-field mb-2 font-bold" 
               />
               <textarea 
                  placeholder="具体技能 (逗号分隔)" 
                  value={skill.items.join('，')} 
                  onChange={e => {
                    const newSkills = [...data.skills];
                    newSkills[idx].items = e.target.value.split(/[,，、;；]/).map(s => s.trim());
                    handleUpdate('skills', newSkills);
                  }} 
                  className="input-field w-full h-24 text-sm" 
               />
            </div>
          ))}
          <button onClick={() => {
             handleUpdate('skills', [...data.skills, { category: '', items: [] }]);
          }} className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg border-2 border-dashed border-blue-200 hover:bg-blue-100">+ 添加技能分类</button>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .input-field {
          @apply border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-shadow;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ResumeEditor;
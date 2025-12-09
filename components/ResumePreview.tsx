import React from 'react';
import { ResumeData, TemplateId } from '../types';

interface Props {
  data: ResumeData;
  templateId: TemplateId;
}

const ResumePreview: React.FC<Props> = ({ data, templateId }) => {
  const { personalInfo, education, internships, projects, skills, sectionOrder } = data;
  const photoComponent = personalInfo.photoUrl ? (
    <div className="w-[100px] h-[133px] flex-shrink-0 bg-gray-200 overflow-hidden border border-gray-100 shadow-sm">
      <img src={personalInfo.photoUrl} alt="Photo" className="w-full h-full object-cover" />
    </div>
  ) : null;

  // --- TEMPLATE 1: MODERN (Modern Business / 现代商务) ---
  if (templateId === 'modern') {
    const sectionRenderers: Record<string, React.ReactNode> = {
      education: (
        <section className="mb-6">
          <div className="flex items-center mb-3">
             <div className="w-1 h-6 bg-blue-600 mr-2 rounded"></div>
             <h2 className="text-lg font-bold text-gray-900">教育经历</h2>
          </div>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 pl-3">
              <div className="flex justify-between font-semibold text-gray-800">
                <span>{edu.school}</span>
                <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>{edu.college} | {edu.degree}</span>
              </div>
              {(edu.gpa || edu.honors) && (
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {edu.gpa && <span className="mr-4"><strong>成绩：</strong>{edu.gpa}</span>}
                  {edu.honors && <span><strong>奖项：</strong>{edu.honors}</span>}
                </div>
              )}
            </div>
          ))}
        </section>
      ),
      skills: (
        <section className="mb-6">
          <div className="flex items-center mb-3">
             <div className="w-1 h-6 bg-blue-600 mr-2 rounded"></div>
             <h2 className="text-lg font-bold text-gray-900">专业技能</h2>
          </div>
          <div className="space-y-2 text-sm text-gray-700 pl-3">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-start">
                <span className="font-bold w-28 flex-shrink-0 text-gray-800 bg-blue-50 px-2 py-0.5 rounded mr-2 text-center text-xs self-center">{skill.category}</span>
                <span className="flex-1 leading-6">{skill.items.join("；")}</span>
              </div>
            ))}
          </div>
        </section>
      ),
      internships: internships.length > 0 ? (
        <section className="mb-6">
            <div className="flex items-center mb-3">
             <div className="w-1 h-6 bg-blue-600 mr-2 rounded"></div>
             <h2 className="text-lg font-bold text-gray-900">实习经历</h2>
            </div>
            {internships.map((job) => (
              <div key={job.id} className="mb-4 pl-3">
                <div className="flex justify-between font-semibold text-gray-800">
                  <span className="text-md">{job.company}</span>
                  <span className="text-sm text-gray-600">{job.startDate} - {job.endDate}</span>
                </div>
                <div className="text-sm font-medium text-blue-700 mb-1">{job.role}</div>
                {job.summary && <p className="text-sm text-gray-600 mb-1 italic">{job.summary}</p>}
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1 mt-1">
                  {job.details.map((d, i) => <li key={i} className="leading-snug">{d}</li>)}
                </ul>
              </div>
            ))}
          </section>
      ) : null,
      projects: (
        <section className="mb-6">
          <div className="flex items-center mb-3">
             <div className="w-1 h-6 bg-blue-600 mr-2 rounded"></div>
             <h2 className="text-lg font-bold text-gray-900">项目经历</h2>
          </div>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-5 pl-3">
              <div className="flex justify-between font-semibold text-gray-800">
                <div className="flex items-center gap-2">
                    <span>{proj.name}</span>
                    {proj.role && <span className="text-gray-500 font-normal text-sm">| {proj.role}</span>}
                    {proj.link && <span className="text-blue-600 font-normal text-xs ml-1">🔗 {proj.link}</span>}
                </div>
                <span className="text-sm text-gray-600">{proj.startDate} - {proj.endDate}</span>
              </div>
              <div className="text-sm text-gray-600 mb-2 mt-1">
                <span className="font-semibold text-gray-800 bg-gray-100 px-1 rounded mr-1">技术栈</span>{proj.techStack}
              </div>
              <p className="text-sm text-gray-700 mb-2">{proj.summary}</p>
              <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                {proj.details.map((d, i) => <li key={i} className="leading-snug">{d}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )
    };

    return (
      <div className="w-full min-h-[297mm] bg-white px-8 py-8 text-gray-800 font-sans leading-relaxed">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-blue-600 pb-6 mb-6">
          <div className="flex-1">
            <div className="flex items-baseline gap-4 mb-3">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-none">{personalInfo.name}</h1>
              {personalInfo.jobIntention && (
                <span className="text-xl font-medium text-blue-600">
                  {personalInfo.jobIntention}
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-base text-gray-600 mb-2">
               <span className="flex items-center gap-1">📍 {personalInfo.location}</span>
               <span className="flex items-center gap-1">📱 {personalInfo.phone}</span>
               <span className="flex items-center gap-1">✉️ {personalInfo.email}</span>
            </div>
             <div className="flex flex-wrap gap-x-6 gap-y-2 text-base text-blue-600">
              {personalInfo.github && <span className="flex items-center gap-1">🔗 {personalInfo.github}</span>}
              {personalInfo.blog && <span className="flex items-center gap-1">📝 {personalInfo.blog}</span>}
            </div>
          </div>
          {photoComponent}
        </div>

        {/* Dynamic Sections */}
        {sectionOrder.map(key => (
          <div key={key}>{sectionRenderers[key]}</div>
        ))}
      </div>
    );
  }

  // --- TEMPLATE 2: CLASSIC ACADEMIC (Classic Academic / 经典学术) ---
  if (templateId === 'classic') {
    const sectionRenderers: Record<string, React.ReactNode> = {
      education: (
        <div>
          <h3 className="text-lg font-bold border-b border-gray-400 mb-3 bg-gray-100 pl-2 py-1">教育背景</h3>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 px-2">
              <div className="flex justify-between font-bold text-md">
                <span>{edu.school}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="flex justify-between italic text-sm mb-1">
                <span>{edu.college}，{edu.degree}</span>
              </div>
              {edu.gpa && <div className="text-sm text-gray-700">相关成绩：{edu.gpa} {edu.honors && `| 荣誉：${edu.honors}`}</div>}
            </div>
          ))}
        </div>
      ),
      skills: (
        <div>
          <h3 className="text-lg font-bold border-b border-gray-400 mb-3 bg-gray-100 pl-2 py-1">专业技能</h3>
           <div className="text-sm space-y-1 px-2">
              {skills.map((s, i) => (
                <div key={i}><span className="font-bold">{s.category}：</span> {s.items.join('；')}</div>
              ))}
           </div>
        </div>
      ),
      internships: internships.length > 0 ? (
        <div>
          <h3 className="text-lg font-bold border-b border-gray-400 mb-3 bg-gray-100 pl-2 py-1">实习经历</h3>
          {internships.map((job) => (
            <div key={job.id} className="mb-4 px-2">
              <div className="flex justify-between font-bold text-md">
                <span>{job.company}</span>
                <span>{job.startDate} – {job.endDate}</span>
              </div>
               <div className="italic text-sm mb-1 font-semibold">{job.role}</div>
              <ul className="list-disc list-outside ml-4 text-sm leading-snug">
                {job.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      ) : null,
      projects: (
        <div>
          <h3 className="text-lg font-bold border-b border-gray-400 mb-3 bg-gray-100 pl-2 py-1">项目经历</h3>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-4 px-2">
              <div className="flex justify-between font-bold text-md">
                <span>{proj.name} {proj.link && <span className="text-xs font-normal text-gray-600 font-sans ml-2">({proj.link})</span>}</span>
                <span>{proj.startDate} – {proj.endDate}</span>
              </div>
              <div className="text-sm font-semibold mb-1">技术栈：{proj.techStack}</div>
              <ul className="list-disc list-outside ml-4 text-sm leading-snug">
                {proj.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )
    };

    return (
      <div className="w-full min-h-[297mm] bg-white p-10 text-gray-900 font-serif relative">
        {/* Photo Absolute Top Right */}
        <div className="absolute top-10 right-10 border-2 border-white shadow-md">
           {photoComponent}
        </div>

        <div className="border-b-2 border-black pb-4 mb-6 pr-[120px]">
          <h1 className="text-3xl font-bold mb-2 tracking-wide">{personalInfo.name}</h1>
          {personalInfo.jobIntention && <div className="text-lg font-bold text-gray-800 mb-2">求职意向：{personalInfo.jobIntention}</div>}
          <div className="text-sm space-x-3 text-gray-800">
             <span>{personalInfo.location}</span>
             <span>•</span>
             <span>{personalInfo.phone}</span>
             <span>•</span>
             <span>{personalInfo.email}</span>
          </div>
          <div className="text-sm space-x-3 text-gray-800 mt-1">
             {personalInfo.github && <span>Github: {personalInfo.github}</span>}
          </div>
        </div>

        <div className="space-y-5">
           {sectionOrder.map(key => (
             <div key={key}>{sectionRenderers[key]}</div>
           ))}
        </div>
      </div>
    );
  }

  // --- TEMPLATE 3: TECHNICAL (Geek / 极客技术) ---
  if (templateId === 'technical') {
    const sectionRenderers: Record<string, React.ReactNode> = {
       skills: (
        <section className="mb-6">
           <h2 className="text-lg font-bold text-emerald-800 uppercase tracking-wider mb-3 border-l-4 border-emerald-500 pl-3">专业技能</h2>
           <div className="grid grid-cols-1 gap-y-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
             {skills.map((s, i) => (
               <div key={i} className="flex text-sm">
                 <span className="font-bold w-32 text-slate-700 shrink-0">{s.category}</span>
                 <span className="text-slate-600">{s.items.join(' / ')}</span>
               </div>
             ))}
           </div>
        </section>
       ),
       projects: (
         <section className="mb-6">
           <h2 className="text-lg font-bold text-emerald-800 uppercase tracking-wider mb-4 border-l-4 border-emerald-500 pl-3">项目经历</h2>
           {projects.map((proj) => (
             <div key={proj.id} className="mb-6 relative">
               <div className="flex justify-between items-baseline mb-1">
                 <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-slate-900">{proj.name}</h3>
                    {proj.link && <span className="text-emerald-600 text-xs font-mono">[{proj.link}]</span>}
                 </div>
                 <span className="text-sm font-medium text-slate-400">{proj.startDate} - {proj.endDate}</span>
               </div>
               <div className="text-xs font-semibold text-emerald-600 mb-2 uppercase tracking-wide bg-emerald-50 inline-block px-2 py-1 rounded">
                  {proj.techStack}
               </div>
               <ul className="list-disc list-outside ml-4 text-sm space-y-1.5 text-slate-700">
                 {proj.details.map((d, i) => <li key={i}>{d}</li>)}
               </ul>
             </div>
           ))}
         </section>
       ),
       internships: internships.length > 0 ? (
         <section className="mb-6">
           <h2 className="text-lg font-bold text-emerald-800 uppercase tracking-wider mb-4 border-l-4 border-emerald-500 pl-3">实习经历</h2>
           {internships.map((job) => (
             <div key={job.id} className="mb-5">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                   <span>{job.company}</span>
                   <span className="text-sm font-medium text-slate-400">{job.startDate} - {job.endDate}</span>
                </div>
                <div className="text-sm font-semibold text-emerald-700 mb-2">{job.role}</div>
                <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-1">
                  {job.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
             </div>
           ))}
         </section>
       ) : null,
       education: (
         <section className="mb-6">
            <h2 className="text-lg font-bold text-emerald-800 uppercase tracking-wider mb-3 border-l-4 border-emerald-500 pl-3">教育背景</h2>
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-center text-sm mb-2 border-b border-slate-100 pb-2">
                 <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-base">{edu.school}</span>
                    <span className="text-slate-600">{edu.college} | {edu.degree}</span>
                 </div>
                 <div className="text-right">
                    <span className="block text-slate-500 font-medium">{edu.startDate} - {edu.endDate}</span>
                    {edu.gpa && <span className="block text-xs text-emerald-600 mt-1">{edu.gpa}</span>}
                 </div>
              </div>
            ))}
         </section>
       )
    };

    return (
      <div className="w-full min-h-[297mm] bg-white px-8 py-8 text-slate-800 font-sans">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-4 border-b border-emerald-500">
           <div>
             <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{personalInfo.name}</h1>
             <p className="text-emerald-700 font-bold mt-2 text-xl">
                {personalInfo.jobIntention || '求职意向：软件工程师'}
             </p>
             <div className="flex gap-4 text-sm text-slate-500 mt-3 font-medium">
               <span>📧 {personalInfo.email}</span>
               <span>📞 {personalInfo.phone}</span>
               <span>📍 {personalInfo.location}</span>
             </div>
             <div className="flex gap-4 text-sm text-slate-500 mt-1 font-medium">
                {personalInfo.github && <span>🖥 {personalInfo.github}</span>}
                {personalInfo.blog && <span>✍️ {personalInfo.blog}</span>}
             </div>
           </div>
           {photoComponent}
        </div>

        {/* Content Grid */}
        <div className="flex flex-col">
            {sectionOrder.map(key => (
              <div key={key}>{sectionRenderers[key]}</div>
            ))}
        </div>
      </div>
    );
  }

  // --- TEMPLATE 4: LEFT COLUMN (Sidebar Creative / 侧栏创意) ---
  if (templateId === 'left-column') {
     // Split sections into Left/Right based on type
     // Left: Education, Skills, Contact (Fixed)
     // Right: Internships, Projects
     
     const leftRenderers: Record<string, React.ReactNode> = {
       education: (
        <div className="mb-6">
           <h3 className="text-sky-800 uppercase tracking-widest font-bold border-b border-sky-200 pb-2 mb-4 text-xs">教育背景</h3>
           {education.map(edu => (
             <div key={edu.id} className="mb-4">
               <div className="font-bold text-slate-900 text-sm">{edu.school}</div>
               <div className="text-slate-600 text-xs mt-1 font-medium">{edu.degree}</div>
               <div className="text-slate-500 text-xs mt-1">{edu.startDate} - {edu.endDate}</div>
             </div>
           ))}
        </div>
       ),
       skills: (
        <div className="mb-6">
          <h3 className="text-sky-800 uppercase tracking-widest font-bold border-b border-sky-200 pb-2 mb-4 text-xs">技能专长</h3>
          <div className="flex flex-col gap-4">
            {skills.map((s, i) => (
              <div key={i}>
                <div className="font-bold mb-1 text-xs text-sky-700">{s.category}</div>
                <div className="text-slate-600 text-xs leading-relaxed">{s.items.join(', ')}</div>
              </div>
            ))}
          </div>
        </div>
       )
     };

     const rightRenderers: Record<string, React.ReactNode> = {
       internships: internships.length > 0 ? (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wider mb-6 border-b-2 border-sky-100 pb-2 flex items-center">
            <span className="bg-sky-500 w-2 h-6 mr-3"></span>实习经历
          </h2>
          {internships.map(job => (
            <div key={job.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg text-gray-900">{job.company}</h3>
                <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded">{job.startDate} - {job.endDate}</span>
              </div>
              <div className="text-sky-700 font-semibold mb-2 text-sm">{job.role}</div>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-gray-600 text-sm leading-relaxed">
                {job.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </section>
       ) : null,
       projects: (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wider mb-6 border-b-2 border-sky-100 pb-2 flex items-center">
            <span className="bg-sky-500 w-2 h-6 mr-3"></span>项目经历
          </h2>
          {projects.map(proj => (
            <div key={proj.id} className="mb-8">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-gray-900">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-sky-600">🔗 {proj.link}</span>}
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded">{proj.startDate} - {proj.endDate}</span>
              </div>
              <div className="text-xs bg-sky-50 text-sky-600 inline-block px-2 py-1 rounded mb-3 font-medium">技术栈：{proj.techStack}</div>
              <p className="text-sm text-gray-500 italic mb-3 border-l-2 border-gray-200 pl-2">{proj.summary}</p>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-gray-600 text-sm leading-relaxed">
                {proj.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </section>
       )
     };

     return (
       <div className="w-full min-h-[297mm] bg-white flex text-sm shadow-inner relative">
         {/* Left Column - Fixed full height */}
         <div className="w-[32%] bg-sky-50 border-r border-sky-100 p-6 flex flex-col gap-8 shrink-0 min-h-[297mm]">
            {/* Photo centered in sidebar */}
            <div className="w-[120px] h-[160px] self-center bg-white p-1 shadow-md">
                {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="Me" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">Photo</div>}
            </div>
            
            {/* Contact */}
            <div>
               <h3 className="text-sky-800 uppercase tracking-widest font-bold border-b border-sky-200 pb-2 mb-4 text-xs">联系方式</h3>
               <div className="flex flex-col gap-3 text-slate-700 text-xs font-medium">
                 <div className="flex items-center gap-2">📱 {personalInfo.phone}</div>
                 <div className="flex items-center gap-2">✉️ {personalInfo.email}</div>
                 <div className="flex items-center gap-2">📍 {personalInfo.location}</div>
                 {personalInfo.github && <div className="flex items-center gap-2">💻 {personalInfo.github}</div>}
               </div>
            </div>

            {/* Dynamic Left Column Sections */}
            {sectionOrder.map(key => leftRenderers[key] ? <div key={key}>{leftRenderers[key]}</div> : null)}
         </div>

         {/* Right Column */}
         <div className="flex-1 p-10 text-gray-800 bg-white">
            <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">{personalInfo.name}</h1>
            <p className="text-sky-600 font-medium mb-10 text-lg">
                {personalInfo.jobIntention || '求职意向：软件开发工程师'}
            </p>

            {/* Dynamic Right Column Sections */}
            {sectionOrder.map(key => rightRenderers[key] ? <div key={key}>{rightRenderers[key]}</div> : null)}
         </div>
       </div>
     );
  }

  // --- TEMPLATE 5: MINIMALIST (Clean / 极简主义) ---
  if (templateId === 'minimal') {
    const sectionRenderers: Record<string, React.ReactNode> = {
      education: (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Education // 教育背景</h2>
          <div className="grid grid-cols-1 gap-6">
            {education.map(edu => (
              <div key={edu.id} className="flex md:flex-row flex-col md:justify-between items-baseline group hover:bg-gray-50 p-2 -mx-2 transition-colors rounded">
                 <div>
                   <div className="font-bold text-lg text-gray-900">{edu.school}</div>
                   <div className="text-gray-600 font-light">{edu.degree} | {edu.college}</div>
                 </div>
                 <div className="text-right">
                   <div className="text-gray-400 text-sm font-mono">{edu.startDate} - {edu.endDate}</div>
                   {edu.gpa && <div className="text-xs text-gray-400 mt-1">{edu.gpa}</div>}
                 </div>
              </div>
            ))}
          </div>
        </section>
      ),
      skills: (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Skills // 专业技能</h2>
          <div className="grid grid-cols-1 gap-3">
             {skills.map((s, i) => (
               <div key={i} className="flex border-b border-gray-50 pb-2 last:border-0">
                 <div className="font-semibold text-sm w-32 shrink-0 text-gray-900">{s.category}</div>
                 <div className="text-sm text-gray-600 font-light leading-normal">{s.items.join('；')}</div>
               </div>
             ))}
          </div>
        </section>
      ),
      internships: internships.length > 0 ? (
        <section className="mb-8">
           <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Experience // 实习经历</h2>
           {internships.map(job => (
             <div key={job.id} className="mb-8">
               <div className="flex justify-between items-baseline mb-2">
                 <h3 className="font-bold text-xl text-gray-900">{job.company}</h3>
                 <span className="text-sm text-gray-400 font-mono">{job.startDate} - {job.endDate}</span>
               </div>
               <div className="text-sm text-gray-800 mb-3 font-medium uppercase tracking-wide">{job.role}</div>
               <div className="text-sm leading-7 text-gray-600 font-light">
                 {job.details.map((d, i) => <p key={i} className="mb-1">• {d}</p>)}
               </div>
             </div>
           ))}
        </section>
      ) : null,
      projects: (
        <section className="mb-8">
           <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Projects // 项目经历</h2>
           {projects.map(proj => (
             <div key={proj.id} className="mb-8">
               <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-center gap-3">
                      <h3 className="font-bold text-xl text-gray-900">{proj.name}</h3>
                      {proj.link && <span className="text-xs text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">{proj.link}</span>}
                  </div>
                 <span className="text-sm text-gray-400 font-mono">{proj.startDate} - {proj.endDate}</span>
               </div>
               <div className="text-xs text-gray-400 mb-3 font-mono bg-gray-50 inline-block px-1">{proj.techStack}</div>
               <div className="text-sm leading-7 text-gray-600 font-light">
                 {proj.details.map((d, i) => <p key={i} className="mb-1">• {d}</p>)}
               </div>
             </div>
           ))}
        </section>
      )
    };

    return (
        <div className="w-full min-h-[297mm] bg-white px-10 py-10 text-gray-800 font-sans">
           <header className="mb-12 flex justify-between items-start border-b border-gray-200 pb-8">
             <div>
               <h1 className="text-5xl font-light tracking-tight text-black mb-2">{personalInfo.name}</h1>
               {personalInfo.jobIntention && <h2 className="text-xl font-normal text-gray-500 mb-4 tracking-wide">{personalInfo.jobIntention}</h2>}
               <div className="flex flex-col gap-1 text-sm text-gray-500 font-light">
                 <div className="flex gap-4">
                    <span>{personalInfo.location}</span>
                    <span>{personalInfo.phone}</span>
                    <span>{personalInfo.email}</span>
                 </div>
                 <div className="flex gap-4">
                    {personalInfo.github && <span>Github: {personalInfo.github}</span>}
                    {personalInfo.blog && <span>Blog: {personalInfo.blog}</span>}
                 </div>
               </div>
             </div>
             {photoComponent}
           </header>
    
           <div className="grid grid-cols-1 gap-2">
              {sectionOrder.map(key => (
                <div key={key}>{sectionRenderers[key]}</div>
              ))}
           </div>
        </div>
      );
  }

  // --- TEMPLATE 6: HIGH-END PREMIUM (High End / 高端雅致) ---
  if (templateId === 'high-end') {
    const sectionRenderers: Record<string, React.ReactNode> = {
      education: (
         <section className="mb-8">
           <div className="flex items-center mb-4">
             <h2 className="text-lg font-bold text-amber-900 uppercase tracking-widest mr-4">教育背景</h2>
             <div className="h-[1px] bg-amber-900/20 flex-1"></div>
           </div>
           {education.map(edu => (
             <div key={edu.id} className="mb-4">
               <div className="flex justify-between items-baseline font-sans">
                 <h3 className="text-lg font-bold text-slate-800">{edu.school}</h3>
                 <span className="text-slate-500 text-sm font-medium">{edu.startDate} - {edu.endDate}</span>
               </div>
               <div className="flex justify-between items-center mt-1">
                  <span className="text-slate-700 italic">{edu.college} | {edu.degree}</span>
                  {edu.gpa && <span className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-100">{edu.gpa}</span>}
               </div>
             </div>
           ))}
         </section>
      ),
      skills: (
         <section className="mb-8">
           <div className="flex items-center mb-4">
             <h2 className="text-lg font-bold text-amber-900 uppercase tracking-widest mr-4">专业技能</h2>
             <div className="h-[1px] bg-amber-900/20 flex-1"></div>
           </div>
           <div className="grid grid-cols-1 gap-3 font-sans">
             {skills.map((s, i) => (
               <div key={i} className="flex items-start text-sm">
                 <span className="font-bold text-slate-700 w-28 shrink-0">{s.category}</span>
                 <span className="text-slate-600">{s.items.join('；')}</span>
               </div>
             ))}
           </div>
         </section>
      ),
      internships: internships.length > 0 ? (
         <section className="mb-8">
           <div className="flex items-center mb-4">
             <h2 className="text-lg font-bold text-amber-900 uppercase tracking-widest mr-4">实习经历</h2>
             <div className="h-[1px] bg-amber-900/20 flex-1"></div>
           </div>
           {internships.map(job => (
             <div key={job.id} className="mb-6">
               <div className="flex justify-between items-baseline font-sans mb-1">
                 <h3 className="text-lg font-bold text-slate-800">{job.company}</h3>
                 <span className="text-slate-500 text-sm">{job.startDate} - {job.endDate}</span>
               </div>
               <div className="text-amber-800 font-semibold text-sm mb-2">{job.role}</div>
               <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-slate-600 font-sans">
                 {job.details.map((d, i) => <li key={i} className="pl-1">{d}</li>)}
               </ul>
             </div>
           ))}
         </section>
      ) : null,
      projects: (
         <section className="mb-8">
           <div className="flex items-center mb-4">
             <h2 className="text-lg font-bold text-amber-900 uppercase tracking-widest mr-4">项目经历</h2>
             <div className="h-[1px] bg-amber-900/20 flex-1"></div>
           </div>
           {projects.map(proj => (
             <div key={proj.id} className="mb-6">
               <div className="flex justify-between items-baseline font-sans mb-1">
                 <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-800">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-amber-700/80">🔗 {proj.link}</span>}
                 </div>
                 <span className="text-slate-500 text-sm">{proj.startDate} - {proj.endDate}</span>
               </div>
               <div className="text-xs text-amber-700 mb-2 font-mono bg-amber-50 inline-block px-1">技术栈：{proj.techStack}</div>
               <p className="text-sm text-slate-500 italic mb-2 font-serif">{proj.summary}</p>
               <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-slate-600 font-sans">
                 {proj.details.map((d, i) => <li key={i} className="pl-1">{d}</li>)}
               </ul>
             </div>
           ))}
         </section>
      )
    };

    return (
      <div className="w-full min-h-[297mm] bg-[#fdfbf7] text-slate-900 font-serif leading-relaxed">
         {/* Decorative Header Background */}
         <div className="h-4 bg-amber-800 w-full"></div>
         <div className="px-12 py-10">
           
           {/* Header */}
           <div className="flex items-center justify-between border-b-2 border-amber-900/10 pb-8 mb-8">
             <div className="flex-1">
                <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">{personalInfo.name}</h1>
                {personalInfo.jobIntention && <div className="text-xl font-medium text-amber-900 mb-4">{personalInfo.jobIntention}</div>}
                <div className="flex flex-col gap-1 text-sm text-slate-600 font-sans">
                  <div className="flex items-center gap-6">
                    <span>📍 {personalInfo.location}</span>
                    <span>📱 {personalInfo.phone}</span>
                    <span>✉️ {personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-6 text-amber-700">
                     {personalInfo.github && <span>Github: {personalInfo.github}</span>}
                  </div>
                </div>
             </div>
             <div className="border-4 border-white shadow-lg rotate-1">
                {photoComponent}
             </div>
           </div>

           {/* Dynamic Sections */}
           {sectionOrder.map(key => (
             <div key={key}>{sectionRenderers[key]}</div>
           ))}

         </div>
      </div>
    );
  }

  return null;
};

export default ResumePreview;
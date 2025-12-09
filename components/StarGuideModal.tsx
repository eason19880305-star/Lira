import React, { useState } from 'react';
import { StarGuideData } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  initialText?: string;
}

const StarGuideModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState<StarGuideData>({
    situation: '',
    task: '',
    action: '',
    result: ''
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Combine into a sentence
      const finalSentence = `在${data.situation}背景下，针对${data.task}难题，采用${data.action}，最终${data.result}。`;
      onSave(finalSentence);
      onClose();
      setStep(0);
      setData({ situation: '', task: '', action: '', result: '' });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-2">S - Situation (情境)</h3>
            <p className="text-sm text-gray-500 mb-4">描述项目或实习的背景。例如：“在一个高并发电商系统的秒杀模块开发中...”</p>
            <textarea
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={data.situation}
              onChange={(e) => setData({ ...data, situation: e.target.value })}
              placeholder="请输入背景描述..."
            />
          </div>
        );
      case 1:
        return (
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-2">T - Task (任务)</h3>
            <p className="text-sm text-gray-500 mb-4">明确你负责的技术模块或遇到的挑战。例如：“负责解决库存超卖和数据库连接池耗尽的问题...”</p>
            <textarea
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={data.task}
              onChange={(e) => setData({ ...data, task: e.target.value })}
              placeholder="请输入任务描述..."
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-2">A - Action (行动)</h3>
            <p className="text-sm text-gray-500 mb-4">说明使用的技术工具、方法。这是工科简历的核心！例如：“使用Redis Lua脚本保证原子性，并引入Kafka异步削峰...”</p>
            <textarea
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={data.action}
              onChange={(e) => setData({ ...data, action: e.target.value })}
              placeholder="请输入具体行动及技术栈..."
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-2">R - Result (结果)</h3>
            <p className="text-sm text-gray-500 mb-4">用数据量化成果。例如：“将接口响应时间从500ms降低至50ms，系统吞吐量提升10倍。”</p>
            <textarea
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={data.result}
              onChange={(e) => setData({ ...data, result: e.target.value })}
              placeholder="请输入量化结果..."
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">STAR 法则引导助手</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        
        {renderStep()}

        <div className="flex justify-between mt-6">
          <button 
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className={`px-4 py-2 rounded ${step === 0 ? 'bg-gray-200 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            上一步
          </button>
          <button 
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-md"
          >
            {step === 3 ? '生成并填入' : '下一步'}
          </button>
        </div>
        
        <div className="mt-4 flex gap-1 justify-center">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`h-1 w-8 rounded ${i === step ? 'bg-blue-600' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarGuideModal;

import React from 'react';
import { Minimize } from 'lucide-react';

const WorkflowVisualizer = ({ steps, activeStep, stepLogs, setShowWorkflow }) => {
  return (
    <div className="p-3 border-b border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-medium">AI Knowledge Base Workflow</h3>
        <button 
          onClick={() => setShowWorkflow(false)}
          className="text-gray-400 hover:text-white"
        >
          <Minimize className="w-4 h-4" />
        </button>
      </div>
      
      {/* Split screen workflow */}
      <div className="bg-gray-900 p-2 rounded-lg border border-gray-700">
        <div className="flex gap-2">
          {/* Left: workflow steps */}
          <div className="w-1/2">
            <div className="flex flex-col space-y-1">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className={`
                    flex items-center p-1 rounded text-xs
                    ${activeStep === step.id ? 'bg-gray-800' : ''}
                  `}
                >
                  <div 
                    className={`
                      w-5 h-5 rounded-full flex items-center justify-center
                      ${activeStep === step.id ? 'bg-blue-600' : 
                        activeStep > step.id ? 'bg-green-600' : 'bg-gray-700'}
                    `}
                  >
                    {step.icon}
                  </div>
                  <span className="ml-2 text-gray-300 truncate">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: terminal */}
          <div className="w-1/2">
            <div className="bg-black rounded border border-gray-700 h-36 overflow-auto">
              <div className="bg-gray-900 px-2 py-1 border-b border-gray-800 flex items-center justify-between">
                <span className="text-gray-400 text-xs">Operation Monitor</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="p-2 font-mono text-xs">
                {stepLogs[activeStep] && stepLogs[activeStep].map((log, i) => (
                  <div key={i} className="text-gray-300 mb-1">
                    {i === 0 ? (
                      <span className="text-green-400">{log}</span>
                    ) : (
                      log
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowVisualizer;
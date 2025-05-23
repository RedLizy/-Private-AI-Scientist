import React, { useState } from 'react';
import { CheckCircle, FileText, Target, Calendar, Plus, ChevronRight, ChevronLeft } from 'lucide-react';

const SetupWizard = ({ onComplete }) => {
  const [setupStep, setSetupStep] = useState(0);
  const [projectData, setProjectData] = useState({
    name: '',
    objectives: [''],
    timeline: ''
  });

  // Handle project form change
  const handleProjectChange = (field, value, index) => {
    if (field === 'objectives' && index !== undefined) {
      setProjectData(prev => {
        const newObjectives = [...prev.objectives];
        newObjectives[index] = value;
        return { ...prev, objectives: newObjectives };
      });
    } else {
      setProjectData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Add new objective
  const addObjective = () => {
    setProjectData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  // Handle setup steps
  const handleNextSetup = () => {
    if (setupStep < 2) {
      setSetupStep(prev => prev + 1);
    } else {
      onComplete(projectData);
    }
  };

  const handlePrevSetup = () => {
    if (setupStep > 0) {
      setSetupStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top navigation */}
      <header className="bg-gray-800 shadow-md py-4 px-6">
        <div className="text-xl font-semibold text-white">Create New Research Project</div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Progress indicator */}
          <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              {['Project Name', 'Project Objectives', 'Project Timeline'].map((step, index) => (
                <div 
                  key={index}
                  className={`flex flex-col items-center ${index < setupStep ? 'text-green-400' : index === setupStep ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${index < setupStep ? 'bg-green-900 border border-green-500' : index === setupStep ? 'bg-blue-900 border border-blue-500' : 'bg-gray-700'}`}>
                    {index < setupStep ? (
                      <CheckCircle size={16} />
                    ) : index === 0 ? (
                      <FileText size={16} />
                    ) : index === 1 ? (
                      <Target size={16} />
                    ) : (
                      <Calendar size={16} />
                    )}
                  </div>
                  <span className="text-xs">{step}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Current step content */}
          <div className="p-6">
            {setupStep === 0 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Project Name</h2>
                <p className="text-gray-400 mb-6">Name your research project</p>
                
                <label className="block text-gray-300 mb-2">Project Name</label>
                <input 
                  type="text"
                  value={projectData.name}
                  onChange={(e) => handleProjectChange('name', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  placeholder="Enter project name"
                />
              </div>
            )}
            
            {setupStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Project Objectives</h2>
                <p className="text-gray-400 mb-6">List the main research objectives you want to achieve</p>
                
                <label className="block text-gray-300 mb-2">Project Objectives</label>
                {projectData.objectives.map((objective, index) => (
                  <div key={index} className="mb-3">
                    <input 
                      type="text"
                      value={objective}
                      onChange={(e) => handleProjectChange('objectives', e.target.value, index)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                      placeholder={`Objective ${index + 1}`}
                    />
                  </div>
                ))}
                
                <button 
                  onClick={addObjective}
                  className="mt-2 flex items-center text-blue-400 hover:text-blue-300"
                >
                  <Plus size={16} className="mr-1" />
                  Add another objective
                </button>
              </div>
            )}
            
            {setupStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Project Timeline</h2>
                <p className="text-gray-400 mb-6">Set the start and end time for the project</p>
                
                <label className="block text-gray-300 mb-2">Project Timeline</label>
                <input 
                  type="text"
                  value={projectData.timeline}
                  onChange={(e) => handleProjectChange('timeline', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  placeholder="Example: June 2025 to May 2026"
                />
              </div>
            )}
          </div>
          
          {/* Bottom buttons */}
          <div className="px-6 py-4 bg-gray-900 border-t border-gray-700 flex justify-between">
            <button 
              onClick={handlePrevSetup}
              className={`px-4 py-2 rounded-md flex items-center ${setupStep === 0 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
              disabled={setupStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            <button 
              onClick={handleNextSetup}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 flex items-center"
            >
              {setupStep === 2 ? 'Complete' : 'Next'}
              {setupStep !== 2 && <ChevronRight className="w-4 h-4 ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
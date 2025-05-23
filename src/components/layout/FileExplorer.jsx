import React from 'react';
import { ChevronDown, ChevronRight, Folder, FolderOpen, File, Plus, Target, FileText, Zap, FlaskConical } from 'lucide-react';

const FileExplorer = ({ 
  projectData, 
  onAddNewFile, 
  showNewFileMenu, 
  setShowNewFileMenu, 
  newFileMenuRef 
}) => {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Project Files</h3>
          <button 
            className="text-gray-400 hover:text-gray-200"
            onClick={() => setShowNewFileMenu(!showNewFileMenu)}
            ref={newFileMenuRef}
          >
            <Plus className="w-4 h-4" />
          </button>
          
          {/* New file menu */}
          {showNewFileMenu && (
            <div className="absolute right-3 mt-8 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-10">
              <button 
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                onClick={() => onAddNewFile('project')}
              >
                <Folder className="w-4 h-4 mr-2 text-yellow-500" />
                New Project
              </button>
              <button 
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                onClick={() => onAddNewFile('objective')}
              >
                <Target className="w-4 h-4 mr-2 text-green-500" />
                New Objective
              </button>
              <button 
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                onClick={() => onAddNewFile('plan')}
              >
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                New Research Plan
              </button>
              <button 
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                onClick={() => onAddNewFile('hypothesis')}
              >
                <Zap className="w-4 h-4 mr-2 text-purple-500" />
                New Research Hypothesis
              </button>
              <button 
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                onClick={() => onAddNewFile('experiment')}
              >
                <FlaskConical className="w-4 h-4 mr-2 text-pink-500" />
                New Experiment Plan
              </button>
            </div>
          )}
        </div>
        
        {/* Project tree */}
        <div className="mt-3 text-gray-300">
          <div className="mb-1">
            <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700">
              <ChevronDown className="w-4 h-4 text-gray-500 mr-1" />
              <FolderOpen className="w-4 h-4 text-yellow-500 mr-1.5" />
              <span className="text-sm font-medium">{projectData.name || "Research Project"}</span>
            </div>
            
            {projectData.objectives.map((objective, index) => (
              <div key={index} className="pl-6 my-1">
                <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700">
                  <ChevronRight className="w-4 h-4 text-gray-500 mr-1" />
                  <Folder className="w-4 h-4 text-yellow-500 mr-1.5" />
                  <span className="text-sm">{objective.length > 20 ? objective.substring(0, 20) + '...' : objective}</span>
                </div>
              </div>
            ))}
            
            <div className="pl-6 my-1">
              <div className="flex items-center px-2 py-1 bg-gray-700 rounded">
                <File className="w-4 h-4 text-blue-500 mr-1.5 ml-5" />
                <span className="text-sm">Research Plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
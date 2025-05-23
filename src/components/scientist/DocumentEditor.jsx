import React from 'react';
import { Edit, PlayCircle, X, Sparkles, RefreshCw, Check } from 'lucide-react';

const DocumentEditor = ({
  editableContent,
  setEditableContent,
  contentEditableRef,
  handleTextSelect,
  runningBenchling,
  handleRunGeneticSimulation,
  selectedText,
  showTextSelector,
  setShowTextSelector,
  selectionPos,
  textQuestion,
  setTextQuestion,
  handleTextQuestion,
  showSuggestion,
  setShowSuggestion,
  aiSuggestion,
  handleAcceptSuggestion,
  handleRerunSuggestion
}) => {
  return (
    <div 
      className="flex-1 bg-gray-900 overflow-y-auto p-6"
      onMouseUp={handleTextSelect}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Research Plan</h2>
            <button className="text-gray-400 hover:text-white">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          
          {/* Editable content area */}
          <div 
            ref={contentEditableRef}
            contentEditable="true"
            className="prose prose-invert prose-blue max-w-none text-white"
            dangerouslySetInnerHTML={{ 
              __html: editableContent
                ? editableContent
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\# (.*?)$/gm, '<h1>$1</h1>')
                    .replace(/\## (.*?)$/gm, '<h2>$1</h2>')
                    .replace(/\### (.*?)$/gm, '<h3>$1</h3>')
                : 'Click the chat function on the right to start working...' 
            }}
            onInput={(e) => setEditableContent(e.currentTarget.innerHTML
              .replace(/<br>/g, '\n')
              .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
              .replace(/<h1>(.*?)<\/h1>/g, '# $1')
              .replace(/<h2>(.*?)<\/h2>/g, '## $1')
              .replace(/<h3>(.*?)<\/h3>/g, '### $1')
            )}
          />
          
          {/* If this is an experiment plan document, show the run button */}
          {editableContent.includes('Genetic Engineering Experiment Plan') && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleRunGeneticSimulation}
                className={`
                  px-6 py-3 rounded-lg shadow-lg text-white font-medium text-lg
                  flex items-center justify-center space-x-2
                  ${runningBenchling 
                    ? 'bg-gray-600' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}
                  transition-all duration-300
                `}
                disabled={runningBenchling}
              >
                {runningBenchling ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5" />
                    <span>Run Gene Design Simulation</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Text selection popup */}
      {showTextSelector && (
        <div 
          className="fixed bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-3 z-50 w-64"
          style={{
            left: `${selectionPos.x}px`,
            top: `${selectionPos.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-blue-400">Ask about selected text</div>
            <button 
              onClick={() => setShowTextSelector(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-400 mb-1">Selected text:</p>
            <p className="text-xs text-white bg-gray-700 p-1.5 rounded">
              {selectedText.length > 100 ? selectedText.substring(0, 100) + "..." : selectedText}
            </p>
          </div>
          <input
            type="text"
            value={textQuestion}
            onChange={(e) => setTextQuestion(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1.5 text-white text-sm mb-2"
            placeholder="What would you like to know?"
            onKeyPress={(e) => e.key === 'Enter' && handleTextQuestion()}
          />
          <button
            onClick={handleTextQuestion}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded py-1.5 text-sm"
          >
            Ask
          </button>
        </div>
      )}
      
      {/* AI suggestion popup */}
      {showSuggestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg w-2/3 max-w-2xl p-6 shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-white font-medium">AI Suggestion</h3>
              </div>
              <button 
                onClick={() => setShowSuggestion(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg mb-4">
              <div className="mb-3 pb-2 border-b border-gray-700">
                <p className="text-gray-400 text-sm">About your selected text:</p>
                <p className="text-white text-sm mt-1">"{selectedText}"</p>
              </div>
              <div className="text-white text-sm whitespace-pre-wrap">
                {aiSuggestion}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleRerunSuggestion}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-1.5" />
                Regenerate
              </button>
              <button
                onClick={handleAcceptSuggestion}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 flex items-center"
              >
                <Check className="w-4 h-4 mr-1.5" />
                Apply Suggestion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentEditor;
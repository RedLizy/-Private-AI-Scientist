import React from 'react';
import { Sparkles, User, Send, Maximize } from 'lucide-react';

const ChatInterface = ({ 
  chatHistory, 
  userQuery, 
  setUserQuery, 
  handleAskQuestion, 
  showWorkflow,
  setShowWorkflow
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-3 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-white font-medium">AI Assistant</h3>
        {!showWorkflow && (
          <button 
            onClick={() => setShowWorkflow(true)}
            className="text-gray-400 hover:text-white"
          >
            <Maximize className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Chat history */}
      <div className="flex-1 p-3 overflow-y-auto space-y-4">
        {/* Welcome message */}
        {chatHistory.length === 0 && (
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="ml-2 bg-gray-700 rounded-lg p-3 text-white max-w-xs">
              <p>Hello! I'm your research assistant. I've generated a research plan based on your project objectives. You can edit the document directly or ask me questions.</p>
              <p className="mt-2 text-sm text-gray-300">Tip: Select text to get more information or suggestions</p>
            </div>
          </div>
        )}
        
        {/* Chat messages */}
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex items-start ${msg.type === 'user' ? 'justify-end' : ''}`}>
            {msg.type === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            <div 
              className={`mx-2 p-3 rounded-lg max-w-xs ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-white'
              }`}
            >
              <p>{msg.content}</p>
            </div>
            {msg.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Input box */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion(userQuery)}
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            placeholder="Enter your research question..."
          />
          <button
            onClick={() => handleAskQuestion(userQuery)}
            className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-500"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
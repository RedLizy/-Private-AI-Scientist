import React from 'react';
import { X, Download, Copy } from 'lucide-react';

const PlasmidViewer = ({ plasmidSequence, setShowPlasmidViewer }) => {
  // Calculate feature positioning on the circular map
  const calculateCirclePosition = (start, end, radius, centerX, centerY) => {
    const totalLength = plasmidSequence.length;
    const startAngle = (start / totalLength) * 2 * Math.PI - Math.PI/2;
    const endAngle = (end / totalLength) * 2 * Math.PI - Math.PI/2;
    
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    
    return {
      path: `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      labelX: centerX + (radius + 20) * Math.cos((startAngle + endAngle) / 2),
      labelY: centerY + (radius + 20) * Math.sin((startAngle + endAngle) / 2),
      angle: ((startAngle + endAngle) / 2) * (180 / Math.PI)
    };
  };
  
  const centerX = 200;
  const centerY = 200;
  const radius = 150;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-5/6 max-w-4xl p-6 shadow-xl border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h3 className="text-white font-medium text-xl">{plasmidSequence.name} ({plasmidSequence.length} bp)</h3>
          </div>
          <button 
            onClick={() => setShowPlasmidViewer(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side: Plasmid map */}
          <div className="flex-1 bg-gray-900 p-4 rounded-lg">
            <svg width="400" height="400" viewBox="0 0 400 400">
              {/* Base circle */}
              <circle 
                cx={centerX} 
                cy={centerY} 
                r={radius} 
                fill="none" 
                stroke="#64748B" 
                strokeWidth="2" 
              />
              
              {/* Features */}
              {plasmidSequence.features.map((feature, index) => {
                const { path, labelX, labelY, angle } = calculateCirclePosition(
                  feature.start, 
                  feature.end, 
                  radius, 
                  centerX, 
                  centerY
                );
                
                return (
                  <g key={index}>
                    <path 
                      d={path} 
                      fill="none" 
                      stroke={feature.color} 
                      strokeWidth="10" 
                    />
                    <text 
                      x={labelX} 
                      y={labelY} 
                      fill="white" 
                      fontSize="10" 
                      textAnchor={angle > 0 && angle < 180 ? "start" : "end"}
                      dominantBaseline="middle"
                      transform={`rotate(${angle > 90 && angle < 270 ? angle + 180 : angle}, ${labelX}, ${labelY})`}
                    >
                      {feature.name}
                    </text>
                  </g>
                );
              })}
              
              {/* Plasmid name in center */}
              <text 
                x={centerX} 
                y={centerY} 
                fill="white" 
                fontSize="14" 
                textAnchor="middle" 
                dominantBaseline="middle"
              >
                {plasmidSequence.name}
              </text>
              
              {/* Length */}
              <text 
                x={centerX} 
                y={centerY + 20} 
                fill="gray" 
                fontSize="12" 
                textAnchor="middle" 
                dominantBaseline="middle"
              >
                {plasmidSequence.length} bp
              </text>
            </svg>
          </div>
          
          {/* Right side: Feature list and actions */}
          <div className="flex-1">
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Features</h4>
              <div className="bg-gray-900 rounded-lg p-3 max-h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-gray-700">
                    <tr>
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">Position</th>
                      <th className="text-left py-2">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plasmidSequence.features.map((feature, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-2 flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: feature.color }}
                          ></div>
                          {feature.name}
                        </td>
                        <td className="py-2">{feature.type}</td>
                        <td className="py-2">{feature.start}..{feature.end}</td>
                        <td className="py-2">{feature.end - feature.start + 1} bp</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Sequence</h4>
              <div className="bg-gray-900 rounded-lg p-3 max-h-40 overflow-y-auto">
                <pre className="text-gray-300 text-xs font-mono whitespace-pre-wrap">
                  {plasmidSequence.sequence}
                </pre>
              </div>
            </div>
            
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded flex items-center hover:bg-blue-500">
                <Download className="w-4 h-4 mr-1.5" />
                Download GenBank
              </button>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded flex items-center hover:bg-gray-600">
                <Copy className="w-4 h-4 mr-1.5" />
                Copy Sequence
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlasmidViewer;
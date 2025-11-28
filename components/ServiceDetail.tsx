import React from 'react';
import { ServiceNode } from '../types';
import { ExternalLink, Layers, Box, Info, Circle } from 'lucide-react';

interface ServiceDetailProps {
  service: ServiceNode | null;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {
  if (!service) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center">
        <Box className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg">Select a service node from the tree to view details.</p>
      </div>
    );
  }

  const isCategory = !!service.children && service.children.length > 0;
  
  // Dynamic style for color-coded nodes
  const headerStyle = service.color 
    ? { color: service.color, backgroundColor: `${service.color}20` } 
    : {}; // fallback handled by classes

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-lg h-full overflow-y-auto border border-slate-700 animate-fadeIn">
      <div className="flex items-center space-x-3 mb-6">
        <div 
          className={`p-3 rounded-lg ${!service.color ? (isCategory ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400') : ''}`}
          style={headerStyle}
        >
          {service.color ? <Circle className="w-6 h-6 fill-current" /> : (isCategory ? <Layers className="w-6 h-6" /> : <Box className="w-6 h-6" />)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{service.name}</h2>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            {isCategory ? 'Category' : service.category || 'Service'}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-400 uppercase mb-2 flex items-center">
          <Info className="w-4 h-4 mr-2" /> Description
        </h3>
        <p className="text-slate-300 leading-relaxed">
          {service.description || "No description available."}
        </p>
      </div>

      {!isCategory && service.useCases && service.useCases.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase mb-2">Common Examples</h3>
          <ul className="space-y-2">
            {service.useCases.map((useCase, idx) => (
              <li key={idx} className="flex items-start text-slate-300 text-sm">
                <span 
                  className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2"
                  style={{ backgroundColor: service.color || '#10b981' }}
                ></span>
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.children && service.children.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase mb-2">Included Options</h3>
          <ul className="grid grid-cols-1 gap-2">
            {service.children.map((child, idx) => (
              <li key={idx} className="bg-slate-700/50 px-3 py-2 rounded text-slate-300 text-sm border border-slate-700 flex items-center">
                {child.color && <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: child.color}}></span>}
                {child.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.url && (
        <div className="mt-8 pt-6 border-t border-slate-700">
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors text-sm font-medium"
          >
            Visit Official AWS Page
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
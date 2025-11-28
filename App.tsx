import React, { useState, useEffect, useCallback } from 'react';
import { awsServicesData } from './data/services';
import TreeViz from './components/TreeViz';
import ServiceDetail from './components/ServiceDetail';
import { ServiceNode } from './types';
import { Network } from 'lucide-react';

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceNode | null>(awsServicesData);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNodeClick = useCallback((node: ServiceNode) => {
    setSelectedService(node);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6 justify-between z-10 relative shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Network className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Agenticus</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* Left: Visualization */}
        <div className="flex-1 flex flex-col min-w-0 p-4 relative" ref={containerRef}>
          <div className="absolute top-6 left-6 z-10 bg-slate-900/80 backdrop-blur px-3 py-1 rounded border border-slate-700 text-xs text-slate-400 pointer-events-none">
            Click nodes to toggle visibility & view details • Scroll to zoom • Drag to pan
          </div>
          <TreeViz 
            data={awsServicesData} 
            onNodeClick={handleNodeClick} 
            width={dimensions.width - 32} // padding adjustments
            height={dimensions.height - 32} 
          />
        </div>

        {/* Right: Sidebar - Hidden on mobile to prioritize tree view */}
        <aside className="hidden md:flex w-96 flex-shrink-0 bg-slate-900 border-l border-slate-800 flex-col z-20 shadow-xl p-4">
          <ServiceDetail service={selectedService} />
        </aside>

      </main>
    </div>
  );
};

export default App;
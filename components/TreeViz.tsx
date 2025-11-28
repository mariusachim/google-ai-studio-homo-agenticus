import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ServiceNode } from '../types';

interface TreeVizProps {
  data: ServiceNode;
  onNodeClick: (node: ServiceNode) => void;
  width?: number;
  height?: number;
}

const TreeViz: React.FC<TreeVizProps> = ({ data, onNodeClick, width = 800, height = 600 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<d3.HierarchyPointNode<ServiceNode> | null>(null);
  
  // We use a ref for the margin to avoid re-creating it, though it's constant
  const margin = { top: 60, right: 40, bottom: 40, left: 40 };

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const innerWidth = width - margin.left - margin.right;
    
    // Only re-initialize the root hierarchy if the data reference changes.
    // This preserves the collapsed/expanded state during other updates (like window resize or sidebar interactions)
    if (!rootRef.current || rootRef.current.data !== data) {
      const root = d3.hierarchy<ServiceNode>(data);
      (root as any).x0 = innerWidth / 2;
      (root as any).y0 = 0;
      
      // Initialize with unique IDs for transitions
      root.descendants().forEach((d: any, i) => {
        d.id = `${d.data.name}-${i}`; 
        d._children = d.children; // keep reference for potential toggling
        
        // Collapse levels deeper than 0 initially (Show Root, collapse Children)
        // This ensures the expand functionality is immediately useful
        if (d.depth > 0) d.children = null; 
      });
      
      rootRef.current = root as any;
    }

    const svg = d3.select(svgRef.current);
    
    // Create container group if it doesn't exist
    let g = svg.select<SVGGElement>("g.tree-container");
    if (g.empty()) {
       g = svg.append("g")
        .attr("class", "tree-container")
        .attr("transform", `translate(${margin.left},${margin.top})`);
       
       // Add zoom behavior
       const zoom = d3.zoom<SVGSVGElement, unknown>()
         .scaleExtent([0.1, 4])
         .on("zoom", (event) => {
           g.attr("transform", event.transform);
         });
       svg.call(zoom).on("dblclick.zoom", null);
    }

    const root = rootRef.current!;
    const treeLayout = d3.tree<ServiceNode>().size([innerWidth, height]);

    // Update function handles the D3 Enter/Update/Exit pattern
    const update = (source: any) => {
      // Calculate new layout
      treeLayout(root);

      const nodes = root.descendants();
      const links = root.links();

      // Normalize depth for fixed vertical spacing
      nodes.forEach((d: any) => { d.y = d.depth * 120; });

      // ****************** Nodes ******************
      const node = g.selectAll<SVGGElement, d3.HierarchyPointNode<ServiceNode>>("g.node")
        .data(nodes, (d: any) => d.id);

      // Enter new nodes at the parent's previous position
      const nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${source.x0 || innerWidth/2},${source.y0 || 0})`)
        .on("click", (event, d) => {
          event.stopPropagation(); // Prevent zoom/drag trigger if overlapping
          
          const n = d as any;
          
          if (n.children) {
            // If clicking an expanded node, collapse it
            n._children = n.children;
            n.children = null;
          } else if (n._children) {
            // If clicking a collapsed node, expand it
            // BUT FIRST: Collapse all siblings (Accordion behavior)
            if (n.parent && n.parent.children) {
              n.parent.children.forEach((sibling: any) => {
                if (sibling !== n && sibling.children) {
                  sibling._children = sibling.children;
                  sibling.children = null;
                }
              });
            }
            // Now expand the clicked node
            n.children = n._children;
            n._children = null;
          }
          
          // Trigger update from this node
          update(d);
          
          // Notify parent app
          onNodeClick(d.data);
        })
        .style("cursor", "pointer");

      nodeEnter.append("circle")
        .attr("class", "node-circle")
        .attr("r", 1e-6)
        .style("fill", (d: any) => d.data.color || (d._children ? "#3b82f6" : "#10b981"))
        .style("stroke", "#1e293b")
        .style("stroke-width", "2px");

      nodeEnter.append("text")
        .attr("dy", ".35em")
        .attr("y", (d: any) => d.children || d._children ? -25 : 25)
        .attr("text-anchor", "middle")
        .text((d) => d.data.name)
        .style("font-size", "12px")
        .style("fill", "#e2e8f0")
        .style("fill-opacity", 1e-6)
        .style("text-shadow", "0 1px 4px rgba(0,0,0,0.9)")
        .style("pointer-events", "none"); // Let clicks pass to circle/group

      // Update existing nodes
      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate.transition().duration(400)
        .attr("transform", (d) => `translate(${d.x},${d.y})`);

      nodeUpdate.select("circle.node-circle")
        .attr("r", 10)
        .style("fill", (d: any) => d.data.color || (d._children || (d.children && d.children.length > 0) ? "#3b82f6" : "#10b981"))
        .attr("stroke", (d: any) => d._children ? "#60a5fa" : "#1e293b"); // Highlight if collapsed children exist

      nodeUpdate.select("text")
        .style("fill-opacity", 1)
        .attr("y", (d: any) => (d.children && d.children.length > 0) || d._children ? -25 : 25);

      // Remove exiting nodes
      const nodeExit = node.exit().transition().duration(400)
        // Collapse to parent's new position if possible, otherwise source
        .attr("transform", (d: any) => `translate(${d.parent ? d.parent.x : source.x},${d.parent ? d.parent.y : source.y})`)
        .remove();

      nodeExit.select("circle").attr("r", 1e-6);
      nodeExit.select("text").style("fill-opacity", 1e-6);

      // ****************** Links ******************
      const link = g.selectAll<SVGPathElement, d3.HierarchyPointLink<ServiceNode>>("path.link")
        .data(links, (d: any) => d.target.id);

      // Enter new links
      const linkEnter = link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", (d) => {
          const o = { x: source.x0 || innerWidth/2, y: source.y0 || 0 };
          return diagonal(o, o);
        })
        .style("fill", "none")
        .style("stroke", "#475569")
        .style("stroke-width", "1.5px")
        .style("opacity", 0.6);

      // Update existing links
      const linkUpdate = linkEnter.merge(link);
      linkUpdate.transition().duration(400)
        .attr("d", (d) => diagonal(d.source, d.target));

      // Remove exiting links
      link.exit().transition().duration(400)
        .attr("d", (d) => {
          // Collapse link to the source (parent) position
          const s = d.source as any;
          const o = { x: s.x, y: s.y }; 
          return diagonal(o, o);
        })
        .remove();

      // Stash the old positions for transition
      nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    // Diagonal generator for smooth curved links
    function diagonal(s: any, d: any) {
      return `M ${s.x} ${s.y}
              C ${s.x} ${(s.y + d.y) / 2},
                ${d.x} ${(s.y + d.y) / 2},
                ${d.x} ${d.y}`;
    }

    // Initial render
    update(root);

  }, [data, width, height, onNodeClick, margin.left, margin.right, margin.top]);

  return (
    <div className="w-full h-full overflow-hidden bg-slate-900 border border-slate-700 rounded-lg shadow-inner">
      <svg ref={svgRef} className="w-full h-full block"></svg>
    </div>
  );
};

export default TreeViz;
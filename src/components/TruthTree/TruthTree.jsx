import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './TruthTree.css';

// Sample data structure for the Truth Tree
const sampleData = {
  name: "Claim: Climate change is accelerating",
  children: [
    {
      name: "Source 1: NASA Climate Research",
      credibility: "high",
      children: [
        { 
          name: "Global temperature data", 
          credibility: "high" 
        },
        { 
          name: "Sea level rise measurements", 
          credibility: "high" 
        }
      ]
    },
    {
      name: "Source 2: IPCC Report 2022",
      credibility: "high",
      children: [
        { 
          name: "Climate models", 
          credibility: "medium" 
        },
        { 
          name: "Historical climate records", 
          credibility: "high" 
        }
      ]
    },
    {
      name: "Source 3: Climate Skeptic Blog",
      credibility: "low",
      children: [
        { 
          name: "Alternative interpretation of data", 
          credibility: "low" 
        }
      ]
    }
  ]
};

const TruthTree = () => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Setup dimensions
    const margin = { top: 40, right: 120, bottom: 40, left: 120 };
    const width = 960 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    
    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Create the tree layout
    const treeLayout = d3.tree().size([width, height]);
    
    // Convert the data to a hierarchy
    const root = d3.hierarchy(sampleData);
    
    // Apply the tree layout to the hierarchy
    treeLayout(root);
    
    // Create links
    svg.selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x))
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);
    
    // Create node groups
    const node = svg.selectAll(".node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .on("mouseover", function(event, d) {
        d3.select("#tooltip")
          .style("display", "block")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 15) + "px")
          .html(`<strong>${d.data.name}</strong><br>${d.data.credibility ? `Credibility: ${d.data.credibility}` : ''}`);
      })
      .on("mouseout", function() {
        d3.select("#tooltip").style("display", "none");
      });
    
    // Add circles to nodes
    node.append("circle")
      .attr("r", 8)
      .attr("fill", d => {
        // Color nodes based on credibility
        if (!d.data.credibility) return "#4caf50"; // Default color
        switch(d.data.credibility) {
          case "high": return "#4caf50"; // Green
          case "medium": return "#ffeb3b"; // Yellow
          case "low": return "#f44336"; // Red
          default: return "#9e9e9e"; // Grey
        }
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);
    
    // Add labels to nodes
    node.append("text")
      .attr("dy", ".31em")
      .attr("x", d => d.children ? -12 : 12)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => {
        // Truncate long names
        const maxLength = 30;
        return d.data.name.length > maxLength
          ? d.data.name.substring(0, maxLength) + "..."
          : d.data.name;
      });
    
  }, []);
  
  return (
    <div className="truth-tree-container">
      <h2>Truth Tree Visualization</h2>
      <div className="visualization">
        <svg ref={svgRef}></svg>
        <div id="tooltip" className="tooltip"></div>
      </div>
      <div className="credibility-legend">
        <div className="legend-item">
          <span className="legend-color high"></span>
          <span>High Credibility</span>
        </div>
        <div className="legend-item">
          <span className="legend-color medium"></span>
          <span>Medium Credibility</span>
        </div>
        <div className="legend-item">
          <span className="legend-color low"></span>
          <span>Low Credibility</span>
        </div>
      </div>
    </div>
  );
};

export default TruthTree;
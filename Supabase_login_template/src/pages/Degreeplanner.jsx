import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background, 
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import DownloadButton from './DownloadButton';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './updatenode.css'

import './index.css';

const initialNodes = [
  {
    id: '999',
    type: 'input',
    data: { label: 'Welcome! You can delete me and start making your own degree plan.' },
    position: { x: 999, y: 999 },
  },
];

let id = 0;

const getId = () => `dndnode_${id++}`;


const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodeName, setNodeName] = useState('Enter Class name');

  
  
  let id;

  

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const onNodesDelete = () =>{};

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      
      const name = event.dataTransfer.getData('text/plain')

  
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      
        id = getId();
        const newNode = {
            id: id,
            type : 'default',
            position,
            data: { label: name },
            sourcePosition: 'right',
            targetPosition: 'left',
          };
        
      
      

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );
  

  return (
    <div className="flex flex-col h-screen bg-grey-100">
        
        
          
          <Navbar />

          <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodesDelete={onNodesDelete}
            
            fitView
          >
            <Controls />
            <Background variant="dots" gap={12} size={1} />
            <MiniMap />
            <DownloadButton />
            
          </ReactFlow>
        </div>
        <Sidebar/>
      </ReactFlowProvider>
    </div>
          
        
      </div>
   
  );
};

export default DnDFlow;

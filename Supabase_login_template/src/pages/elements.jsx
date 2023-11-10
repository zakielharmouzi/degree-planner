import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow , {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import supabase from '../../utils/Supabase';
import 'reactflow/dist/style.css';
 
const initialNodes = [
  {id:999, position : {x:9999,y:9999}, data:{label:'test'}}
];
const initialEdges = [
{}
];

 
export default function Flowchart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [error, setError] = useState(null); 
  const [courses, setCourses] = useState(null);

  const onConnect = useCallback((params) =>setEdges((eds) => addEdge(params, eds)), [setEdges], )

  
  useEffect(() =>{
    const fetchNodes = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')

        if (error) {
          setError('Could not fetch courses')
          setCourses(null)
        }

        if (data) {
          console.log(data);
          let nodearray = []
           data.map(course => (

           nodearray.push({ id: course.course_id.toString(), position: {x: Math.floor(Math.random() *100), y: Math.floor(Math.random() *100)},
           data: { label : course.course_code} })
            
           ))
           setNodes(nodearray)
          setCourses(data)
          setError(null)
        }
    }
    fetchNodes();
    
  }, [])


    
    
    
  
  return (
    <div style={{ width: '100%', height: '100vh' }}>
  {error && (<p> {error} </p>)}
  {nodes && <ReactFlow 
    nodes={nodes} 
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
  >
    <Controls/>
    <MiniMap/>
    <Background variant='dots' gap={12} size={1} />
  </ReactFlow>}
</div>
  );
}
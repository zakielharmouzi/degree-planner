import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import supabase from '../../utils/Supabase';
import 'reactflow/dist/style.css';
import Modal from 'react-modal';

const initialNodes = [
  { id: 999, position: { x: 9999, y: 9999 }, data: { label: 'test' } },
];
const initialEdges = [{}];

export default function Flowchart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [selectedCoursecode, setSelectedCoursecode] = useState('');

  const onConnect = useCallback((params) =>
    setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  let initialx = -110;
  let x1 = initialx;
  let x2 = initialx;
  let x3 = initialx;
  let y1 = 80;
  let y2 = 350;
  let y3 = 550;
  const handleCoordinates = (course) => {
    let coordinates = {};
    let category = course.course_code;

    if (
      category.includes('MTH') ||
      category.includes('BIO') ||
      category.includes('PHY') ||
      category.includes('EGR')
    ) {
      y1 = y1 !== 80 ? 80 : 150;
      x1 = y1 === 80 ? x1 : x1 + 200;
      coordinates.x = x1;
      coordinates.y = y1;
      return coordinates;
    }
    if (category.includes('CSC')) {
      if (x2 === initialx) {
        x2 = x2 + 200;
        coordinates.x = x2;
        coordinates.y = y2;
        return coordinates;
      } else {
        y2 = y2 !== 315 ? 315 : 385;
        x2 = y2 === 315 ? x2 + 200 : x2;
        coordinates.x = x2;
        coordinates.y = y2;
        return coordinates;
      }
    }
    y3 = y3 !== 550 ? 550 : 620;
    x3 = y3 === 550 ? x3 : x3 + 200;
    coordinates.x = x3;
    coordinates.y = y3;
    return coordinates;
  };

  useEffect(() => {
    const fetchNodes = async () => {
      const { data, error } = await supabase.from('courses').select('*');

      if (error) {
        setError('Could not fetch courses');
        setCourses(null);
      }

      if (data) {
        let nodearray = [];
        data.map((course) => {
          let coordinates = handleCoordinates(course);
          nodearray.push({
            id: course.course_id.toString(),
            position: { x: coordinates.x, y: coordinates.y },
            data: {
              label: (
                <div>
                  <div>{course.course_code}</div>
                </div>
              ),
            },
            courseName: course.course_name,
            courseCode: course.course_code,
          });
        });
        setNodes(nodearray);
        setCourses(data);
        setError(null);
      }
    };
    fetchNodes();
  }, []);
  
useEffect(() => {
  const fetchEdges = async () => {
    const { data, error } = await supabase.from('prerequisites').select('*');
    if (error) {
      setError('Could not fetch prerequisites');
    }
    if (data) {
      const edgeArray = data.map((prereq) => ({
        id: `${prereq.course_id}-${prereq.prereq_id}`,
        source: prereq.prereq_id.toString(),
        target: prereq.course_id.toString(), 
        type: 'smoothstep',
        
      }));
      setEdges(edgeArray);
      setError(null);
    }
  };
  fetchEdges();
}, [nodes]);
Modal.setAppElement('#root'); 

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const onNodeClick = (event, node) => {
  setSelectedCourseName(node.courseName);
  setSelectedCoursecode(node.courseCode);
  console.log(node.courseName);
  setModalOpen(true);
};

return (
  <div style={{ width: '100%', height: '100vh' }}>
    {error && <p> {error} </p>}
    {nodes && (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        onNodeClick={onNodeClick}  
        >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    )}

    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customStyles}
      contentLabel="Course Name Modal"
    >
      <h2>Selected Course</h2>
      <p>{selectedCoursecode}</p>
      <p>{selectedCourseName}</p>
        <div style={{ textAlign: 'center' }}>
          <button class='g-blue-500 hover:bg-gray-200 text-black font-bold py-2 px-2 rounded flex:auto' onClick={() => setModalOpen(false)}>Close</button>
        </div>
      </Modal>
  </div>
);

}
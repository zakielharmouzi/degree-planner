import React, {useState,useEffect} from 'react';
import supabase from '../../utils/Supabase';    
import Classnode from './Classnode';

export default () => {
  
    const onDragStart = (event, name) => {
        event.dataTransfer.setData('text/plain', name);
        event.dataTransfer.effectAllowed = 'move';
      };
  
  
  const initialnodes = [{
    id: '999',
    data:{label: (<div>
        <div>course</div>
      </div>)},
    courseName: '1',
    courseCode: '1'
    

  }]
  const [nodes, setNodes] = useState('');
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchNodes = async () => {
      const { data, error } = await supabase.from('courses').select('*');

      if (error) {
        setError('Could not fetch courses');
        setCourses(null);
      }

      if (data) {
        let nodearray = [];
        console.log(data);
        data.map((course) => {
          
          nodearray.push({
            id: course.course_id.toString(),
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
    console.log(nodes);
    
  }, []);


  return (
    // <aside>
    //   <div className="description">You can drag these nodes to the pane on the right.</div>
      
    //   <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
    //     Class Node
    //   </div>
    //   <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'group')} draggable>
    //     Semester Node
    //   </div>
    // </aside>

    <div>
        {error && <p> {error} </p>}
                {nodes && (
            <aside>
                {nodes.map((node, index) => (
            
            <div key={index} className=" dndnode w-32 h-96" onDragStart={(event) => onDragStart(event, node.courseName)} draggable>
                
                <h1>
                    {node.courseName}
                </h1>
                
            </div>
            
        ))}
            </aside>
        )}

    </div>
  );
};

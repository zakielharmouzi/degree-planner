

export default function Classnode({course}, onDragStart){
    
    
    
    console.log(course);
    
    
    return (
        
        
            <div className="dndnode" onDragStart={onDragStart} draggable>
                <h1>
                    {course.course_name}
                </h1>
            </div>
        
        
    )
        
    
}
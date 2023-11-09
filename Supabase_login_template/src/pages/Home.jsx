import React, { useEffect, useState,useCallback } from "react";
import { useAuth } from "../../components/Authcontext";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/Supabase";
import "reactflow/dist/style.css";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState
} from "reactflow";
import {
  nodes as initialNodes,
  edges as initialEdges
} from "./elements";

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

function Home() {
  const { signOut } = useAuth();
  const Navigate = useNavigate();
  const { user } = useAuth();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [id, setId] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  
  const getdata = async () => {
    console.log(user.email);
    try {
      const { data, error } = await supabase.from('users').select('*').eq('email', user.email);
      if (error) throw error;
      setFname(data[0].firstname);
      setLname(data[0].lastname);
      setId(data[0].Student_id);
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
    
  }

  useEffect(() => {
    getdata();
  }, []);

  const byebye = async (e) => {
    e.preventDefault();
    try {
      signOut();
    } catch (error) {
      console.error("Sign-out failed", error);
      throw error;
    }
  }

  useEffect(() => {
    if (!user) {
      Navigate('/')
    }
  }, [user]);

 
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4 bg-gray-100">
      <h1 className="text-center text-3xl font-bold">Hello {fname}</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={byebye}>
        Sign Out
      </button>

      <div style={{ width: '1000px', height: '400px' }}>

        <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
    >
        <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === "input") return "#000000";
          if (n.type === "output") return "#ff0072";
          if (n.type === "default") return "#1a192b";

          return "#eee";
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;

          return "#fff";
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
      </div>
    </div>
  );
}

export default Home;

import React, { useState,useEffect } from 'react';
import { useAuth } from '../../components/Authcontext';
import supabase from '../../utils/Supabase'; 

const FileUpload = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ['application/pdf'];

  const pdfHandler = async (e) => {
    e.preventDefault();
    let selected = file;
    if (selected && types.includes(selected.type)) {
      setError('');

      try {
        const { data, error } = await supabase.storage
          .from('pdfs')
          .upload(`${user.id}/file`, selected, {
            cacheControl: '3600',
          });
        console.log(data, error);
      } catch (error) {
        console.error('Error uploading file: ', error.message);
      }
    } else {
      setFile(null);
      setError('Please select a PDF file');
    }
  };

  const handleFileChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select a PDF file');
    }
  };

  
const sendDataToBackend = async () => {
  try {
    // Sending a GET request with user_id as a query parameter
    const response = await fetch(`http://localhost:5000/?user_id=${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    
    // No need to process the response if you're not expecting any specific data

    console.log('User ID sent to backend successfully.');
  } catch (error) {
    console.error('Error sending data to backend: ', error);
  }
};


  return (
    <div>
      <form onSubmit={pdfHandler}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{file.name}</div>}
        </div>
        <button type="submit">Upload</button>
      </form>
        
        <button onClick={sendDataToBackend}>Send Data to Backend</button>
    </div>
  );
};

export default FileUpload;

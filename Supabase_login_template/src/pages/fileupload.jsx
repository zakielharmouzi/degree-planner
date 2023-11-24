import React, { useState } from 'react';
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
          .upload(`${user.id}/${selected.name}`, selected, {
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
    </div>
  );
};

export default FileUpload;

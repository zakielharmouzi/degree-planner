import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/Authcontext';
import supabase from '../../utils/Supabase'; 
import { HashLoader } from "react-spinners";

const FileUpload = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ['application/pdf'];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // 
    }, 4000);

    return () => clearTimeout(timer); 
  }, []); 
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
        setError('Error uploading file. Please try again.');
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
      {loading && (
        <div className="loader-container flex items-center justify-center h-screen">
          <HashLoader color="#166432" loading={true} size={100} />
        </div>
      )}
      {!loading && (
        <div className="mt-10">
        <div className="font-Libre text-2xl">
          <h1>Hello! Before accessing the website, please upload your unofficial transcript. :)</h1>
          <h1 className="text-xl text-[#445858]">This is to check which course you have already taken.</h1>
        </div>

        <form onSubmit={pdfHandler}>
          <input type="file" className="mt-5 font-Montserrat" accept="application/pdf" onChange={handleFileChange} />
          <div className="mt-5 font-Montserrat output">
            {error && <div className="error">{error}</div>}
            {file && <div>{file.name}</div>}
          </div>
          <button type="submit" className="px-5 font-Montserrat mt-6 block bg-[#445858] text-white items-center whitespace-nowrap  py-[0.25rem] text-center text-base font-normal leading-[1.6] border border-[#9ca3af] outline-none p-3 h-10 ">Upload!</button>
        </form>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

import React, { useState, useEffect } from 'react'
import FileUploader from './fileUploader'
import TransformationType from './transformationType'
import "./css/styles.css";

export default function TransformationForm({onFormSubmit, loadingResponse, removeData}) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ 
        file: {
            fileName: "",
            file: "",
        },
        transformation: "",
        type: "", 
    });

    // Check for user file
    useEffect(() => {
        if (form.file) {
          onFormSubmit?.(form);
        }
    }, [form.file]);

    // Remove data for new propmt
    useEffect(() => {
        if (removeData) {
            setForm(form => ({ ...form, file: {fileName: null, file: null}}));
            setForm(form => ({ ...form, transformation: ""}));
            setForm(form => ({ ...form, type: ""}));
        } 
    }, [removeData]);

    // Set loading
    useEffect(() => {
        if (loadingResponse) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [loadingResponse]);

    // Ensure all data has been inputted before submitting form
    const handleSubmit = () => {
        if (!form.file) {
            alert("please input a file");
            return;
        } else if (!form.transformation) {
            alert("please input the tranformation type");
            return;
        } else if (!form.type) {
            alert("please input a version or language");
            return;
        } else {onFormSubmit?.(form);}
    }
   
  return (
    <div className='font-sans'> 
        <div>
            <FileUploader 
                onFileSelect={(e) => setForm({ ...form, file: e})} 
                onRemoveData={removeData}
            />
        </div>
        <div>
            <TransformationType 
                onTransformationSelect={(e) => setForm({ ...form, transformation: e})} 
                onOptionSelect={(e) => setForm({ ...form, type: e})} 
                onRemoveData={removeData}
            />
        </div>
        {!loading ? (<button className="m-2 submitBtn" onClick={handleSubmit}>Transform with AI</button>) : (<div className="m-2 submitBtn animate-pulse">Transforming...</div>)}
        
    </div>
  )
}
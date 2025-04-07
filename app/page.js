"use client"
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import TransformationForm from './components/transformationForm';
import CodeDisplay from './components/codeDisplay';
import HistoryCard from "./components/historyCard";
import './components/css/styles.css';

export default function Home() {
  const [fileUploaded, setFileUploaded] = useState(false)
  const [form, setForm] = useState(null)
  const [aI_output, setAI_output] = useState(null);
  const [loading, setLoading] = useState(false);
  const [removeFormData, setRemoveFormData] = useState(false)
  const [historyItems, setHistoryItems] = useState([]);

  // Set all data from input form
  const handleFormSubmit = (formData) => {
    setForm(formData);
    setRemoveFormData(false);
  }

  // Check if user has uploaded a file
  useEffect(() => {
    if (form != null) {
      setFileUploaded(true)
    }
  }, [form])

  const handleSubmit = async (e) => {
    // Stop page reload
    e.preventDefault();
    
    // Ensure all data has been provided
    if (removeFormData || fileUploaded == false || form.type == null || form.transformation == null) {
      return;
    }

    setLoading(true);

    try {
      // Start API call to ChatGPT
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "applocation/json"
        }, 
        // Create Prompt
        body: JSON.stringify({ prompt: `I want you to change the ${form.transformation} of this file to ${form.type}, here is the contents of the file: ${form.file.file} 
          When you have chanage the code i want you to run a few tests to make sure that the code run smoothly and without any errors.
          And if it does have any errors i wan you to update the code gerring rid of all the errors. i also want you to check the code quality and check for language specific rules changing anything to match these.
          IMPORTANT: Respond ONLY with the transformed code. Do not include ANY explanations, comments about what you changed, or markdown formatting. 
          Your entire response should be valid code that can be executed directly.`}),
      });
      
      // Ensure response from ChatGPT
      if (!res.ok) {
        throw new Error("Unable to fetch response");
      }

      // Format ChatGPT response
      const data = await res.json();
      const formattedResponse = data.response
        .replace(/```/g, "") // Remove unnecessary backticks
        .replace(/\\n/g, "<br>") // Convert newlines to HTML <br> tags
        .replace(/\\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;") // Convert tabs to spaces

      setAI_output(formattedResponse)

      // Create history data
      const temp = form;
      temp["dateTime"] = new Date().toLocaleString();
      setHistoryItems(prev => [...prev, temp]);

    } catch(error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Remove all data to start new prompt
  const handleNewPrompt = () => {
    setFileUploaded(false);
    setRemoveFormData(true);
    form.type = null;
    form.transformation = null;
    setAI_output(null);
  }

  return (
    <div className='font-sans'>
      <main className="space-y-4" style={{width: "80%", marginLeft: "10%"}}>
        <div className="flex flex-row">
          <div className="basis-8/10 border rounded-lg m-6 p-4">
            <div>
              <h1 className="text-3xl font-bold m-2 mb-6">Code Morph</h1>
            </div>
            <h2 className="text-sm ml-2">
              Upload file
            </h2>
            <form onSubmit={handleSubmit}>  
              <TransformationForm 
                onFormSubmit={handleFormSubmit}
                loadingResponse={loading}
                removeData={removeFormData}
              />
            </form>
          </div>
          <div className="basis-2/10 border rounded-lg m-6 p-4 ">
            <div className="flex flex-row">
              <h1 className="basis-4/10 text-2xl font-bold m-2">History</h1>
              <button className="basis-6/10 newPrompt font-semibold" onClick={handleNewPrompt}>
                <div className="flex flex-row">
                  <Plus className="basis-2/14"/>
                  <p className="basis-12/14">New Prompt</p>
                </div>
              </button>
            </div>
            <HistoryCard items={historyItems} />
          </div>
        </div>
          {!fileUploaded ? (<CodeDisplay file={null} aiResponse={null} removeData={removeFormData} />) : (<CodeDisplay file={form.file.file} fileName={form.file.fileName} type={form.type} transformation={form.transformation} aiResponse={aI_output} removeData={removeFormData} />)}
      </main>
    </div>
  );
}

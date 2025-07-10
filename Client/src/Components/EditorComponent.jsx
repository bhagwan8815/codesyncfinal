import React, { useState } from "react";
import axios from "axios";

export default function EditorComponent() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };

    setStatus("pending");
    setOutput("");
    setJobId("");

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/run`, payload);
      console.log("Data from backend API:", data);

      setJobId(data.jobId);

      let intervalId = setInterval(async () => {
        try {
          const { data: dataRes } = await axios.get(
           `${process.env.REACT_APP_BACKEND_URL}/status`,
            {
              params: { id: data.jobId },
            }
          );

          console.log("Response from status API:", dataRes);

          const job = dataRes.job;

          if (job) {
            const jobStatus = job.status;
            setStatus(jobStatus);

            if (jobStatus === "pending") return;

            setOutput(job.output?.trim() || "No output received");
            clearInterval(intervalId);
          } else {
            setStatus("Error: job not found");
            setOutput("Job not found or invalid response");
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error("Error polling job status:", err);
          setStatus("Error");
          setOutput("Something went wrong while checking job status.");
          clearInterval(intervalId);
        }
      }, 1000);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err?.stderr || "Server error";
        setOutput(errMsg);
        setStatus("Error");
      } else {
        setOutput("Error connecting to server...");
        setStatus("Error");
      }
    }
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "Arial" }}
      className="p-6 dark:bg-gray-800 "
    >
      <h1 className=" text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:bg- dark:from-yellow-500 dark:to-red-700">
        Online Code Compiler
      </h1>

      <div className="flex flex-row gap-5">
        {/* this is the left  div where we choose the language and  write down code  */}
        <div className="flex flex-col ">
          <div className="text-blue-500 dark:text-yellow-600">
            <label ClassName="">Select Language: </label>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                console.log("Language selected:", e.target.value);
              }}
            >
              <option value="cpp">C++</option>
              <option value="py">Python</option>
              <option value="java">Java</option>
              <option value="js">JavaScript</option>
            </select>
          </div>

          {/* code likehenge vo vala div */}
        
          <div className="">
            <br />
            <textarea
              rows="20"
              cols="75"
              value={code}
              placeholder="Write your code here..."
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 bg-white dark:bg-gray-700 text-black dark:text-white border-none outline-none rounded-md shadow-md"
            />

            <br />
            <button className="bg-primarycolor hover:bg-secondarycolor p-2 text-lg font-bold rounded-lg pl-4 pr-4" onClick={handleSubmit}>Submit</button>
          </div>
        </div>

        {/* right div output vala div */}
        <div className="flex flex-col pl-9 mt-10 gap-3">
          <h3 className="font-bold text-lg dark:text-white">
            Status:{" "}
            <span
              style={{
                color:
                  status === "success"
                    ? "green"
                    : status === "pending"
                    ? "orange"
                    : "red",

                
              }}
            >
              {status}
            </span>
          </h3>

          {jobId && <p className="text-lg font-bold dark:text-white">JobID: {jobId}</p>}

          {output && (
            <>
              <h3 className="font-bold text-lg dark:text-white ">Output:</h3>
              <pre className="font-bold text-lg "
                style={{
                  background: "#f4f4f4",
                  padding: "10px",
                  borderRadius: "5px",
                  whiteSpace: "pre-wrap",

                }}
              >
                {output}
              </pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
}








// import React from 'react'
// import axios from 'axios'
// import { useState } from 'react'
// import { languages } from 'prismjs';

// export default function EditorComponent() {
//   const [code, setCode] = useState('');
//   const [language , setLanguage] = useState("cpp");
//   const [output, setOutput] = useState('');

//   const handleSubmit = async () =>{
//     const payload ={
//       language,
//       code
//     };
//     try{
//     const {data} = await axios.post("http://localhost:3000/run", payload);
//    console.log(data);
//    setOutput(data.jobId);

//  setInterval(async () =>{
//   const { data :dataRes} = await axios.get("http://localhost:3000/status",
//     {params:{id: data.jobId}}

//   );
//   console.log(dataRes);
//  },1000)


//    // console.log("the output is :" +ans);
//     }catch({response}){
//       if(response){
//         const errMsg = response.data.err.stderr;
//         setOutput(errMsg);
//       }else{
//         setOutput("Error connecting to server...");
//       }
//     }
//   }
//   return (
//     <div>
//       <h1>Online Code compiler</h1>
//       <div>
//         <label>Select Language</label>
//       <select
//       value={language}
//       onChange={(e)=>{
//         setLanguage(e.target.value);
//         console.log(e.target.value);
//       }}>
//         <option value="cpp">C++</option>
//         <option value="py" >Python</option>
//         <option value="java">Java</option>
//         <option  value="js">Java Script</option>
//       </select>
//       </div>
//       <br />
//       <textarea 
//       rows="20" 
//       cols="75"
//       value={code}
//       onChange={(e)=>{
//         setCode(e.target.value);
//       }}
//       >
//       </textarea>
//       <br />
//       <button onClick={handleSubmit}>Submit</button>


//       <p>{output}</p>
//     </div>
//   )
// }

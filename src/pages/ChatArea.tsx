import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

import DietPlan from "@/components/DietPlan";
import PatientForm from "@/components/PatientForm";
import { DietPlanI } from "@/components/DietPlan";
import {EditDietPlanInput} from "@/components/EditDietPlanInput"
import { downloadPDF } from "@/utils/pdfGenerator";
import { type PatientFormValues } from "@/lib/schemas"


const ChatArea = () => {

  const [dietPlanHistory, setDietPlanHistory] = useState<DietPlanI[]>([]);
  const [patientData, setpatientData] = useState<PatientFormValues>();
  const [editMessageHistory, setEditMessageHistory] = useState<string[]>([]);

  const [updateVariables, setUpdateVariables] = useState({
    isLoading: false,
    visibleSpace: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    downloadPDF(dietPlanHistory[dietPlanHistory.length-1]);
  };

  const handleSlideEnd = () => {
    // Scroll to DietPlan and Explanation
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const handleEditDietPlan = async () => {

    try {
      const response = await fetch("https://pragmatic-armor-441322-c5.el.r.appspot.com/api/dietPlan/", {
          method: 'POST', // Change to POST
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify(
            { 'patientData' : patientData,
              'dietPlanHistory' : dietPlanHistory,
            'followUpEditDietPlanMessagesHistory' : editMessageHistory,
            'editMessageToEnhaceLastDietPlan' : editMessageHistory.length > 0 ? 
            editMessageHistory[editMessageHistory.length-1] : []
      }), // Send the message as the request body
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        // Parse the response as JSON
        const data = await response.json();
        console.log("Received data:", data);
  
        // Update state with the received data
        setDietPlanHistory?.([...dietPlanHistory, data]);
        
        // Call the onGenerate function to scroll

      } catch (err) {
        //setError(err.message); // Handle errors
        console.log("handle error for validation")
      } finally {
        setUpdateVariables({
          isLoading : false,
          visibleSpace : true
        });
      }
  
  }

  return (
    <div ref={containerRef} className="overflow-y-auto">
      <PatientForm
        setPatientData={setpatientData}
        dietPlanHistory={dietPlanHistory}
        setDietPlan={setDietPlanHistory}
        setUpdateVariables={setUpdateVariables}
        onGenerate={handleSlideEnd}
        handleSubmit={handleEditDietPlan}
      />

      {dietPlanHistory.map((plan, index) => (
        <>
        <div 
          key={index} 
          className="ml-6 mt-10 border rounded-lg p-10 w-[80%] mx-auto dark:border-gray-700"
        >
          <h1 className="dark:text-white">
            <strong>Diet Plan {index + 1}</strong>
          </h1>
          <DietPlan 
            dietPlan={plan} 
            isLoading={updateVariables.isLoading && index === dietPlanHistory.length - 1} 
          />
          {index === dietPlanHistory.length - 1 && (
            <Button 
              className="mx-10 mt-6" 
              onClick={handleDownloadPdf} 
              variant="outline"
            >
              Download PDF
            </Button>
          )}
        </div>

          {index < editMessageHistory.length && (
                <div className="ml-6 mt-4 border rounded-md p-2 w-[80%]">
                    <h2>Edit Prompt</h2>
                    <p>{editMessageHistory[index]}</p>
                </div>
          )}


         </>
      ))}

      <div className="ml-6 mt-6">
        <EditDietPlanInput 
          setEditMessages={setEditMessageHistory} 
          editMessages={editMessageHistory} 
          onSubmit={handleEditDietPlan}
        />
      </div>
    </div>
  );
};

export default ChatArea;

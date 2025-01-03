import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

import { PDFDocument, rgb } from "pdf-lib";
import hospitalLogo from "@/assets/logo.jpg";
import DietPlan from "@/components/DietPlan";
import PatientForm from "@/components/PatientForm";

const ChatArea = () => {
  const [dietPlan, setDietPlan] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    explanation: "",
  });
  const [updateVariables, setUpdateVariables] = useState({
    isLoading: false,
    visibleSpace: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a page
    const page = pdfDoc.addPage([595, 842]); // A4 dimensions in points
    const { width, height } = page.getSize();

    // Add Hospital Logo
    const logoImageBytes = await fetch(hospitalLogo).then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedJpg(logoImageBytes); // Use embedPng() if PNG
    const logoDims = logoImage.scale(0.1); // Scale logo size
    page.drawImage(logoImage, {
      x: 50,
      y: height - 70,
      width: logoDims.width,
      height: logoDims.height,
    });

    // Add Patient and Doctor Info
    page.drawText("Patient Name: John Doe", { x: 50, y: height - 120, size: 14 });
    page.drawText("Doctor Name: Dr. Smith", { x: 50, y: height - 140, size: 14 });

    // Add Diet Plan Table
    const textStartY = height - 200;
    const lineHeight = 20;
    let currentY = textStartY;

    const dietPlanData = [
      ["Meal", "Items"],
      ["Breakfast", dietPlan.breakfast || "Not provided"],
      ["Lunch", dietPlan.lunch || "Not provided"],
      ["Dinner", dietPlan.dinner || "Not provided"],
    ];

    page.drawText("Diet Plan", { x: 50, y: currentY, size: 16, color: rgb(0, 0, 0) });
    currentY -= 30;

    dietPlanData.forEach((row) => {
      page.drawText(row[0], { x: 50, y: currentY, size: 12 });
      page.drawText(row[1], { x: 150, y: currentY, size: 12 });
      currentY -= lineHeight;
    });

    // Add Explanation Section
    page.drawText("Explanation:", { x: 50, y: currentY - 20, size: 14, color: rgb(0, 0, 0) });
    page.drawText(dietPlan.explanation || "No explanation provided", {
      x: 50,
      y: currentY - 50,
      size: 12,
      lineHeight: 18,
      maxWidth: width - 100,
    });

    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();

    // Trigger file download
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DietPlan.pdf";
    link.click();
  };

  const handleSlideEnd = () => {
    // Scroll to DietPlan and Explanation
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  return (
    <div ref={containerRef} className="overflow-y-auto">
      <PatientForm
        setDietPlan={setDietPlan}
        setUpdateVariables={setUpdateVariables}
        onGenerate={handleSlideEnd}
      />

      <div className="ml-6 mt-10 border rounded-lg p-10 w-[80%] mx-auto">
        <h1>
          <strong>Diet Plan</strong>
        </h1>
        <DietPlan dietPlan={dietPlan} isLoading={updateVariables.isLoading} />
        <Button className="mx-10 mt-6" onClick={handleDownloadPdf} variant="outline">
          Download Pdf
        </Button>
      </div>

      <div className="spacing h-[250px]"></div>
    </div>
  );
};

export default ChatArea;

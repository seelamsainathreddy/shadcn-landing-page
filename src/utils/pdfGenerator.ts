import { PDFDocument, rgb } from "pdf-lib";
import hospitalLogo from "@/assets/logo.jpg";
import { DietPlanI } from "@/components/DietPlan";

export const generatePDF = async (dietPlan: DietPlanI) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 dimensions
  const { width, height } = page.getSize();

  // Add Hospital Logo
  const logoImageBytes = await fetch(hospitalLogo).then((res) => res.arrayBuffer());
  const logoImage = await pdfDoc.embedJpg(logoImageBytes);
  const logoDims = logoImage.scale(0.1);
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

  return await pdfDoc.save();
};

export const downloadPDF = async (dietPlan: DietPlanI) => {
  const pdfBytes = await generatePDF(dietPlan);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "DietPlan.pdf";
  link.click();
}; 
/* eslint-disable @typescript-eslint/no-explicit-any */
   declare module "jspdf-autotable" {
     import { jsPDF } from "jspdf";

     interface AutoTableOptions {
       head: any[]; // Define the type for the head
       body: any[]; // Define the type for the body
       startY?: number; // Optional startY property
       styles?: any; // Define styles as needed
     }

     export function autoTable(doc: jsPDF, options: AutoTableOptions): void;
   }
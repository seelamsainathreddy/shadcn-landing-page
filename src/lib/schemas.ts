import * as z from "zod"

export const patientFormSchema = z.object({
  patientName: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  existingConditions: z.array(z.string()),
  allergies: z.array(z.string()),
  currentMedication: z.array(z.string()),
  physicalActivityLevel: z.string().min(1, "Activity level is required"),
  dietaryPreferences: z.string().min(1, "Dietary preference is required"),
  smokingAlcoholConsumption: z.array(z.string()),
  weightGoal: z.string().min(1, "Weight goal is required"),
  symptomManagement: z.array(z.string()),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>

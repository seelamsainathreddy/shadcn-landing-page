"use client"

import React from "react";
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from "@/components/ui/extension/multi-select"
import {
  TagsInput
} from "@/components/ui/extension/tags-input"
import {
  Textarea
} from "@/components/ui/textarea"
import { DietPlanI } from "./DietPlan";
import { patientFormSchema, type PatientFormValues } from "@/lib/schemas"

type Status = {
    isLoading: boolean;
    visibleSpace: boolean;
  };

type FormData = z.infer<typeof patientFormSchema>;

interface ProfileFormProps {

    dietPlanHistory: DietPlanI[];
    setDietPlan: (data : DietPlanI[]) => void;
    setUpdateVariables: (data : Status) => void;
    onGenerate: () => void;
    setPatientData : (data: FormData) => void;
    handleSubmit : () => void;

  }

const  ProfileForm: React.FC<ProfileFormProps> = ({setPatientData, handleSubmit}) => {
 
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      patientName: "Marry",
      age: "28",
      gender: "Female",
      height: "5.5",
      weight: "60",
      existingConditions: ['diabatis'],
      allergies: ['lactose Intolerence'],
      currentMedication: ['NA'],
      physicalActivityLevel: "",
      dietaryPreferences: "Veg",
      smokingAlcoholConsumption: [],
      weightGoal: "",
      symptomManagement: [],
    },
  });

const onSubmit = async (values: FormData) => {

    setPatientData(values);
    handleSubmit();
    }

  return (
    <div className="profileForm  ml-1 mt-6  rounded-lg  mb-10 ">

    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-wrap place-items-start transition-all duration-300 ease-in-out ">


        <section className="demographics w-[40%]  min-w-[373.594px] p-10 h-[500px] border rounded-lg max-w-3xl m-6">
         <h1 className="mb-6"><strong>Demographics</strong></h1>

        <div className="flex flex-col space-y-4 ">
        <div className=" formItem grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient's Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="type patient's name here"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input 
                placeholder="enter age"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>


        
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className='fromItem'>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
                
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height</FormLabel>
              <FormControl>
                <Input 
                placeholder="height in ft"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input 
                placeholder="Weight in kg"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
        </div>
        </section>

        <section className="medicalHistory  w-[40%]  min-w-[373.594px] p-10 h-[500px]  border rounded-lg max-w-3xl m-6">
        <h1 className="mb-5"><strong>Medical History</strong></h1>

          <div className="space-y-6">
           <FormField
              control={form.control}
              name="existingConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Existing Medical Conditions</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-xs"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                      <MultiSelectorList>
                        <MultiSelectorItem value={"Diabaties"}>Diabaties</MultiSelectorItem>
                        <MultiSelectorItem value={"Sugar"}>Sugar</MultiSelectorItem>
                        <MultiSelectorItem value={"Obesity"}>Obesity</MultiSelectorItem>
                      </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormDescription>Select multiple options.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        
        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies and Tolerances</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter"
                />
              </FormControl>
              <FormDescription>Add your inputs.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="currentMedication"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Current medication</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tags"
                />
              </FormControl>
              <FormDescription>Add tags.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        </section>
        
        <section className="lifestyleInformation w-[40%] min-w-[373.594px] p-10 h-[500px]  border rounded-lg max-w-3xl m-6">
        <h1 className="mb-6"><strong>Life-Style Information</strong></h1>

        <div className="space-y-6">
        <div className=" formItem grid grid-cols-12 gap-4">
          
          <div className="col-span-4">
            
        <FormField
          control={form.control}
          name="physicalActivityLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Physical activity level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Sedentary">Sedentary</SelectItem>
                  <SelectItem value="Lightly active">Lightly active</SelectItem>
                  <SelectItem value="Very active">Very active</SelectItem>
                  <SelectItem value="Extra active">Extra active</SelectItem>
                </SelectContent>
              </Select>
                
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
    
        <FormField
          control={form.control}
          name="dietaryPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary preferences</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your preferences"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
           <FormField
              control={form.control}
              name="smokingAlcoholConsumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Smoking / Alcohol Consumption</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-xs"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                      <MultiSelectorList>
                        <MultiSelectorItem value={"Smoking"}>Smoking</MultiSelectorItem>
                        <MultiSelectorItem value={"Alcohol"}>Alcolol</MultiSelectorItem>
                        <MultiSelectorItem value={"None"}>none</MultiSelectorItem>
                      </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormDescription>Select multiple options.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        </section>

        <section className="healthGoals h-[500px]  w-[40%]  min-w-[373.594px] p-10 border rounded-lg m-6 ">
        <h1 className="mb-6"><strong>Health Goals</strong></h1>
                
        <div className="space-y-6">
        <div className=" formItem grid grid-cols-12 gap-4">
          
          <div className="col-span-4">
            
        <FormField
          control={form.control}
          name="weightGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight Goal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="loss or gain" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Weight loss">weight loss</SelectItem>
                  <SelectItem value="Weight gain">Wieght gain</SelectItem>
                  <SelectItem value="none">none</SelectItem>
                </SelectContent>
              </Select>
                
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
        
        <FormField
          control={form.control}
          name="symptomManagement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symptom Management</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tags"
                />
              </FormControl>
              <FormDescription>Add symptoms.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        </section>

        <div className=" ml-10 submitButton w-1/2 ">
        <Button className="mt-10" type="submit">Submit</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default ProfileForm;
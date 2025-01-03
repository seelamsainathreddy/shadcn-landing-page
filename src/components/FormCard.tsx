import React from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


// Define the props interface
interface FormCardProps {
  title: string; // Title of the form card
  children?: React.ReactNode; // Add children prop

}

export const FormCard: React.FC<FormCardProps> = ({ title, children }) => {


  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>From</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Save</Button>
      </CardFooter>
    </Card>
  )
}

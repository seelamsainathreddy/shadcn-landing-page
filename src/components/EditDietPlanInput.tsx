import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"


const formSchema = z.object({
  message: z.string().min(1, "Please enter a message"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditDietPlanInputProps {
  onSubmit: () => void;
  setEditMessages: (messages: string[]) => void;
  editMessages : string[];
}

export function EditDietPlanInput({ 
  onSubmit, 
  setEditMessages, 
  editMessages 
}: EditDietPlanInputProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    try {
      // Add new message to existing messages
      const updatedMessages = [...editMessages, data.message];
      setEditMessages(updatedMessages);
      
      form.reset(); // Clear the form after submission
      onSubmit(); // Call the onSubmit callback

      toast({
        title: "Success",
        description: "Message saved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save message",
      });
    }
  });

  return (
    <form onSubmit={handleSubmit} className="grid w-full gap-2">
      <Textarea 
        {...form.register("message")}
        placeholder="Type your message here." 
        className="min-h-[100px]"
      />
      <div className="submitButton w-1/2">
        <Button 
          type="submit"
          className="mt-3"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

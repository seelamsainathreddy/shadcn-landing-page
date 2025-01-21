import ReactMarkdown from 'react-markdown';



export interface DietPlanI {
  breakfast: string; // Meal for breakfast
  lunch: string; // Meal for lunch
  dinner: string;
  explanation: string ;// Meal for dinner

}

export interface DietPlanProps {
  dietPlan : DietPlanI;
  isLoading : boolean;
}



const DietPlan : React.FC<DietPlanProps> = ({ dietPlan, isLoading }) => {
  const mealSections = {
    breakfast: dietPlan?.breakfast || "Breakfast plan will appear here...",
    lunch: dietPlan?.lunch || "Lunch plan will appear here...",
    dinner: dietPlan?.dinner || "Dinner plan will appear here...",
    explanation: dietPlan?.explanation || "explaination will appear here"
  };

  return (
      <>
      
      {isLoading ? (
        <div className="flex items-center justify-center mt-6">
          <div className="spinner"></div>
          <p className="ml-2 dark:text-white">Loading diet plan...</p>
        </div>
      ) : (
              <div className="space-y-6 mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 text-left px-4 py-2 dark:text-white">Meal</th>
                <th className="border border-gray-300 dark:border-gray-700 text-left px-4 py-2 dark:text-white">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="dark:bg-gray-900">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium dark:text-white">Breakfast</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <ReactMarkdown>{mealSections.breakfast}</ReactMarkdown>
                  </div>
                </td>
              </tr>
              <tr className="dark:bg-gray-900">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium dark:text-white">Lunch</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <ReactMarkdown>{mealSections.lunch}</ReactMarkdown>
                  </div>
                </td>
              </tr>
              <tr className="dark:bg-gray-900">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium dark:text-white">Dinner</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <ReactMarkdown>{mealSections.dinner}</ReactMarkdown>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="explaination">
            <h3 className="dark:text-white"><strong>Explaination</strong></h3>
            <p className='ml-4 mt-4 dark:text-gray-300'>
              <ReactMarkdown className="prose dark:prose-invert">{mealSections.explanation}</ReactMarkdown>
            </p>
        </section>
   
      </div>

      )}

    </>

  );
};

export default DietPlan;
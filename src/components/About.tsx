import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Company
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                At NutritionalAI, we empower healthcare professionals with cutting-edge AI tools to deliver personalized and effective nutritional plans. Our custom-built AI analyzer leverages advanced algorithms and the latest nutritional science to provide accurate insights tailored to individual needs.
                We bridge the gap between technology and healthcare, enabling doctors and nutritionists to make data-driven decisions that improve patient outcomes. With a focus on innovation, reliability, and user-friendly solutions, we strive to support professionals in transforming lives through smarter nutrition.
                Join us on our mission to redefine the future of health and wellness.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};

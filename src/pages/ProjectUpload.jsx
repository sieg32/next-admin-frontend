import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";

import { BasicTextProject } from "../components/ProjectForm/BasicTextProject";
import ImageUploadProject from "../components/ProjectForm/ImageUploadProject";
import BrochureProject from "../components/ProjectForm/BrochureProject";
import PropertyUnitStack from "../components/ProjectForm/PropertyUnitStack";
import AmenitiesForm from "../components/ProjectForm/AmenitiesForm";
import FinalCheckComponent from "../components/ProjectForm/FinalCheckComponent";

export const UploadProject = () => {
  const [projectId, setProjectId] = useState('');
  const [projectType, setProjectType] = useState('');

  const [currentStep, setCurrentStep] = useState(4);

  // Function to go to the next step
  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  // Function to go to the previous step
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Step components mapping
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicTextProject setProjectId={setProjectId} setProjectType={setProjectType} nextStep={nextStep}/>;
      case 2:
        return <ImageUploadProject projectId={projectId} nextStep={nextStep}/>;
      case 3:
        return <BrochureProject projectId={projectId} nextStep={nextStep}/>;
      case 4:
        return projectType !== "land" ? <PropertyUnitStack projectId={projectId} nextStep={nextStep}/> : nextStep();
      case 5:
        return projectType !== 'land' ? <AmenitiesForm projectId={projectId} nextStep={nextStep}/> : nextStep() ;
      case 6:
        return <FinalCheckComponent projectId={projectId} projectType={projectType}/>;
      default:
        return <BasicTextProject setProjectId={setProjectId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Stepper component */}
      <div className="w-full max-w-2xl mb-6">
        <Stepper activeStep={currentStep - 1} onStepChange={setCurrentStep}>
          <Step label="Basic Details" />
          <Step label="Image Upload" />
          <Step label="Brochure" />
          <Step label="Property Units" />
          <Step label="Amenities" />
          <Step label="Final check" />

        </Stepper>
      </div>

      {/* Stepper Header */}
      

      {/* Render Step Based on currentStep */}
      {renderStep()}
    </div>
  );
};

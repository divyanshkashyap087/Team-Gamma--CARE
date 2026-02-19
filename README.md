export type HeatLevel = "none" | "mild" | "moderate" | "severe";

export type BodyRegion = 
  | "head" 
  | "neck" 
  | "chest" 
  | "abdomen" 
  | "leftArm" 
  | "rightArm" 
  | "leftHand" 
  | "rightHand" 
  | "leftLeg" 
  | "rightLeg" 
  | "leftFoot" 
  | "rightFoot"
  | null;

export interface BodyRegionData {
  id: BodyRegion;
  label: {
    en: string;
    ne: string;
  };
  path: string;
}




import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface EnergySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const EnergySlider = ({ value, onChange }: EnergySliderProps) => {
  const getEnergyLabel = (level: number) => {
    if (level <= 3) return 'Low Energy';
    if (level <= 7) return 'Medium Energy';
    return 'High Energy';
  };

  const getEnergyColor = (level: number) => {
    if (level <= 3) return 'text-blue-600';
    if (level <= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Energy Level</label>
        <span className={`font-medium ${getEnergyColor(value)}`}>
          {getEnergyLabel(value)}
        </span>
      </div>
      
      <Slider
        value={[value]}
        min={1}
        max={10}
        step={1}
        onValueChange={handleChange}
        className="py-4"
      />
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Calm/Tired</span>
        <span>Balanced</span>
        <span>Energetic/Anxious</span>
      </div>
    </div>
  );
};

export default EnergySlider;

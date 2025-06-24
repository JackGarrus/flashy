import React from "react";
import "./RadioButtonGroup.css";

export interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  name: string;
  options: RadioOption[];
  selected: string;
  onChange: (value: string) => void;
  label?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  options,
  selected,
  onChange,
  label,
}) => {
  return (
    <fieldset className="radio-group">
      {label && <legend className="radio-group-label">{label}</legend>}
      {options.map((opt) => (
        <label key={opt.value} className="radio-button">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <span className="radio-button-label">{opt.label}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default RadioButtonGroup;

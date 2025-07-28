import React from "react";
import "./CheckboxGroup.css";

export interface CheckboxOption {
  label: string;
  value: string;
  checked: boolean;
}

interface CheckboxGroupProps {
  name: string;
  options: CheckboxOption[];
  onChange: (value: string, checked: boolean) => void;
  direction?: "vertical" | "horizontal";
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  options,
  onChange,
  direction = "vertical",
}) => {
  return (
    <div className={`checkbox-group ${direction}`}>
      {options.map((opt) => (
        <label key={opt.value} className="checkbox-label">
          <input
            type="checkbox"
            name={name}
            value={opt.value}
            checked={opt.checked}
            onChange={(e) => onChange(opt.value, e.target.checked)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;

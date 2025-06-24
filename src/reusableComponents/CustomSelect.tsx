import React, { useState, useRef, useEffect } from "react";
import "./CustomSelect.css";

export interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string; // can be title instead
  name: string;
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  options,
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null); // ritorna le API del componente?

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  const handleSelectedOption = (option: Option) => {
    onChange(option.value);
    setOpen(false);
  };

  const handleCloseDropdownOutside = (e: MouseEvent) => {
    /* Handles closing the dropdown when the user clicks outside of it
     * without selecting anything.
     */
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    /*  addEventListener is inside a useEffect to prevent creating multiple
     * active listeners at the same time at every render, forcing the user to click outside twice
     */
    document.addEventListener("click", handleCloseDropdownOutside);
    return () =>
      document.removeEventListener("click", handleCloseDropdownOutside);
  }, []);

  return (
    <div className="select-wrapper" ref={ref}>
      {label && <label className="label">{label}</label>}
      <button
        className="selected"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedLabel}
        <span className="arrow" />
      </button>
      {open && (
        <ul className="options">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                className={`option ${
                  opt.value === selected ? "option-selected" : ""
                }`}
                onClick={() => handleSelectedOption(opt)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;

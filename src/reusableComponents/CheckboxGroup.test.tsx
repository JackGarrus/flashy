import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxGroup from "./CheckboxGroup";

describe("CheckboxGroup", () => {
  const options = [
    { label: "Opzione A", value: "a", checked: false },
    { label: "Opzione B", value: "b", checked: true },
  ];

  const setup = (onChange = jest.fn()) =>
    render(
      <CheckboxGroup
        name="test-group"
        options={options}
        onChange={onChange}
        direction="vertical"
      />
    );

  it("renders all checkboxes with correct labels and initial states", () => {
    setup();

    const checkboxA = screen.getByLabelText("Opzione A") as HTMLInputElement;
    const checkboxB = screen.getByLabelText("Opzione B") as HTMLInputElement;

    expect(checkboxA).toBeInTheDocument();
    expect(checkboxA.checked).toBe(false);
    expect(checkboxB).toBeInTheDocument();
    expect(checkboxB.checked).toBe(true);
  });

  it("calls onChange with correct value and checked status", () => {
    const onChange = jest.fn();
    setup(onChange);

    const checkboxA = screen.getByLabelText("Opzione A") as HTMLInputElement;
    fireEvent.click(checkboxA);

    expect(onChange).toHaveBeenCalledWith("a", true);

    const checkboxB = screen.getByLabelText("Opzione B") as HTMLInputElement;
    fireEvent.click(checkboxB);

    expect(onChange).toHaveBeenCalledWith("b", false);
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomSelect, { Option } from "./CustomSelect";

const options: Option[] = [
  { label: "Opzione 1", value: "opt1" },
  { label: "Opzione 2", value: "opt2" },
  { label: "Opzione 3", value: "opt3" },
];

describe("CustomSelect", () => {
  it("renders label when provided", () => {
    render(
      <CustomSelect
        name="test"
        label="Scegli un'opzione"
        selected="opt1"
        onChange={jest.fn()}
        options={options}
      />
    );
    expect(screen.getByText(/scegli un'opzione/i)).toBeInTheDocument();
  });

  it("displays the selected option", () => {
    render(
      <CustomSelect
        name="test"
        selected="opt2"
        onChange={jest.fn()}
        options={options}
      />
    );
    expect(screen.getByText("Opzione 2")).toBeInTheDocument();
  });

  it("opens the dropdown on click", () => {
    render(
      <CustomSelect
        name="test"
        selected="opt1"
        onChange={jest.fn()}
        options={options}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Opzione 2")).toBeInTheDocument();
    expect(screen.getByText("Opzione 3")).toBeInTheDocument();
  });

  it("calls onChange and closes menu when an option is clicked", () => {
    const onChange = jest.fn();
    render(
      <CustomSelect
        name="test"
        selected="opt1"
        onChange={onChange}
        options={options}
      />
    );
    fireEvent.click(screen.getByRole("button")); // open
    fireEvent.click(screen.getByText("Opzione 3")); // select
    expect(onChange).toHaveBeenCalledWith("opt3");
    expect(screen.queryByText("Opzione 2")).not.toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside", () => {
    const { container } = render(
      <>
        <CustomSelect
          name="test"
          selected="opt1"
          onChange={jest.fn()}
          options={options}
        />
        <button data-testid="outside">Outside</button>
      </>
    );
    fireEvent.click(screen.getByRole("button", { name: /Opzione 1/i })); // open
    expect(screen.getByText("Opzione 2")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("outside")); // click outside
    expect(screen.queryByText("Opzione 2")).not.toBeInTheDocument(); // dropdown closed
  });
});

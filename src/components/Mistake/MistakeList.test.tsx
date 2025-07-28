import { render, screen, fireEvent } from "@testing-library/react";
import MistakeList from "./MistakeList";
import { Verb } from "../../types";

describe("MistakeList", () => {
  const mockMistakes: Verb[] = [
    {
      id: 1,
      verb: "essen",
      translation: "mangiare",
      example: "Ich esse einen Apfel.",
      category: "Mangiare",
    },
    {
      id: 2,
      verb: "trinken",
      translation: "bere",
      example: "Ich trinke Wasser.",
      category: "Mangiare",
    },
  ];

  it("does not render when mistakes is empty", () => {
    const { container } = render(
      <MistakeList mistakes={[]} onRepeat={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a list of mistakes", () => {
    render(<MistakeList mistakes={mockMistakes} onRepeat={jest.fn()} />);
    expect(screen.getByText(/verbi da ripassare/i)).toBeInTheDocument();
    expect(screen.getByText(/essen – mangiare/i)).toBeInTheDocument();
    expect(screen.getByText(/trinken – bere/i)).toBeInTheDocument();
  });

  it("calls onRepeat when button is clicked", () => {
    const onRepeat = jest.fn();
    render(<MistakeList mistakes={mockMistakes} onRepeat={onRepeat} />);
    const btn = screen.getByRole("button", { name: /ripeti questi/i });
    fireEvent.click(btn);
    expect(onRepeat).toHaveBeenCalled();
  });

  it("renders all mistaken verbs", () => {
    render(<MistakeList mistakes={mockMistakes} onRepeat={jest.fn()} />);
    mockMistakes.forEach((m) => {
      expect(
        screen.getByText(new RegExp(`${m.verb} – ${m.translation}`, "i"))
      ).toBeInTheDocument();
    });
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/Modal";

describe("Modal Component", () => {
  test("renders modal when isOpen is true", () => {
    render(<Modal isOpen={true} onClose={() => {}} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("does not render modal when isOpen is false", () => {
    const { container } = render(<Modal isOpen={false} onClose={() => {}} />);

    expect(container.querySelector(".modal")).toBeNull();
  });

  test("displays the title when provided", () => {
    render(<Modal isOpen={true} title="Test Title" onClose={() => {}} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("does not display the title when not provided", () => {
    render(<Modal isOpen={true} onClose={() => {}} />);
    expect(screen.queryByText("Test Title")).toBeNull();
  });

  test("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<Modal isOpen={true} onClose={onCloseMock} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});

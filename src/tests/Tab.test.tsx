import { render, screen, fireEvent } from "@testing-library/react";
import Tab from "../Components/app/Tab";

describe("Tab Component", () => {
  test("renders tab with correct label", () => {
    render(
      <Tab
        label="Ad Groups"
        isActive={false}
        showBorder={true}
        onClick={() => {}}
      />
    );
    expect(screen.getByText("Ad Groups")).toBeInTheDocument();
  });

  test("applies 'font-semibold' when isActive is true", () => {
    render(
      <Tab
        label="Ad Groups"
        isActive={true}
        showBorder={true}
        onClick={() => {}}
      />
    );
    expect(screen.getByText("Ad Groups")).toHaveClass("font-semibold");
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Tab
        label="Ad Groups"
        isActive={false}
        showBorder={true}
        onClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText("Ad Groups"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

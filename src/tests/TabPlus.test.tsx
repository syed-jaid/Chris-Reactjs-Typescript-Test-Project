import { render, screen, fireEvent } from "@testing-library/react";
import TabPlus from "../Components/app/TabPlus";

// Mock function for handling dropdown click
const handleDropdownClick = jest.fn();

describe("TabPlus Component", () => {
  const setActiveTab = jest.fn();

  test("renders the tab and dropdown correctly", () => {
    const dropdownItems = ["Item 1", "Item 2"];

    render(
      <TabPlus
        setActiveTab={setActiveTab}
        activeTab="+"
        dropdownItems={dropdownItems}
        handleDropdownClick={handleDropdownClick}
      />
    );

    // Check if the tab (+) is rendered
    expect(screen.getByText("+")).toBeInTheDocument();

    // Check if the dropdown is visible when active
    const dropdown = screen.getByText("Item 1");
    expect(dropdown).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  test("does not render dropdown when no items are available", () => {
    const dropdownItems: string[] = [];

    render(
      <TabPlus
        setActiveTab={setActiveTab}
        activeTab="+"
        dropdownItems={dropdownItems}
        handleDropdownClick={handleDropdownClick}
      />
    );

    // Check if the "No items available" message is rendered
    expect(screen.getByText("No items available")).toBeInTheDocument();
  });

  test("calls handleDropdownClick on item click", () => {
    const dropdownItems = ["Item 1", "Item 2"];

    render(
      <TabPlus
        setActiveTab={setActiveTab}
        activeTab="+"
        dropdownItems={dropdownItems}
        handleDropdownClick={handleDropdownClick}
      />
    );

    // Click on the first dropdown item
    fireEvent.click(screen.getByText("Item 1"));

    // Check if handleDropdownClick was called with the correct item
    expect(handleDropdownClick).toHaveBeenCalledWith("Item 1");
  });

  test("calls setActiveTab when the tab is clicked", () => {
    const dropdownItems = ["Item 1", "Item 2"];

    render(
      <TabPlus
        setActiveTab={setActiveTab}
        activeTab="+"
        dropdownItems={dropdownItems}
        handleDropdownClick={handleDropdownClick}
      />
    );

    // Click on the tab to toggle active state
    fireEvent.click(screen.getByText("+"));

    // Check if setActiveTab was called with "+"
    expect(setActiveTab).toHaveBeenCalledWith("+");
  });

  test("renders the tab with correct styling when active", () => {
    const dropdownItems = ["Item 1", "Item 2"];

    render(
      <TabPlus
        setActiveTab={setActiveTab}
        activeTab="+"
        dropdownItems={dropdownItems}
        handleDropdownClick={handleDropdownClick}
      />
    );

    // Check if the tab has the correct styles when active
    const tabElement = screen.getByText("+");
    expect(tabElement).toHaveClass("font-semibold");
    expect(tabElement).toHaveClass("border-r-[1px]");
  });
});

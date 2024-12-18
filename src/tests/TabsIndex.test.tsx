import { render, screen, fireEvent } from "@testing-library/react";
import TabsIndex from "../Components/app/TabsIndex";

// Mock necessary child components
jest.mock("../Components/app/Tab", () => ({
  __esModule: true,
  default: ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button data-testid={`tab-${label}`} onClick={onClick}>
      {label}
    </button>
  ),
}));

jest.mock("../Components/app/TabPlus", () => ({
  __esModule: true,
  default: ({
    handleDropdownClick,
  }: {
    handleDropdownClick: (item: string) => void;
  }) => <button onClick={() => handleDropdownClick("Leads")}>+ Add Tab</button>,
}));

jest.mock("../Components/app/ResizableDrawer", () => ({
  __esModule: true,
  default: ({ isDrawerOpen }: { isDrawerOpen: boolean }) => (
    <div>{isDrawerOpen ? "Drawer is open" : "Drawer is closed"}</div>
  ),
}));

jest.mock("../Components/app/Tables", () => ({
  __esModule: true,
  default: () => <div>Table content</div>,
}));

describe("TabsIndex Component", () => {
  test("renders 'Coming Soon...' message for inactive tabs", () => {
    render(<TabsIndex />);

    // Initially, the "Ad Groups" tab is active, so we expect the table content to be shown
    expect(screen.getByText("Table content")).toBeInTheDocument();

    // Click on the "Leads" tab
    const leadsTab = screen.getByTestId("tab-Leads");
    fireEvent.click(leadsTab);

    // The "Leads" tab is now active, so "Coming Soon..." should be displayed
    expect(screen.getByText("Coming Soon...")).toBeInTheDocument();

    // Click on the "Settings" tab
    const settingsTab = screen.getByTestId("tab-Settings");
    fireEvent.click(settingsTab);

    // The "Settings" tab is now active, so "Coming Soon..." should be displayed
    expect(screen.getByText("Coming Soon...")).toBeInTheDocument();

    // Click on the "Ad Groups" tab again
    const adGroupsTab = screen.getByTestId("tab-Ad Groups");
    fireEvent.click(adGroupsTab);

    // The "Ad Groups" tab is active again, so the table content should be shown
    expect(screen.getByText("Table content")).toBeInTheDocument();
  });

  test("should render 'Coming Soon...' when a tab is clicked", () => {
    render(<TabsIndex />);

    // Click on the "Settings" tab
    const settingsTab = screen.getByTestId("tab-Settings");
    fireEvent.click(settingsTab);

    // Verify "Coming Soon..." message for the "Settings" tab
    expect(screen.getByText("Coming Soon...")).toBeInTheDocument();
  });
});

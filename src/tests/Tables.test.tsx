import { render, screen, fireEvent } from "@testing-library/react";
import Tables from "../Components/app/Tables";

// Mock data
const rows = [
  {
    name: "Lorem Ipsum",
    QS: 3.5,
    CTR: 7.8,
    CVR: 2.9,
    Leads: 36,
    CPA: 78,
    Costs: 1345,
    Revenue: 56607,
    ROAS: 14.1,
  },
  {
    name: "Aliquam Tincidunt",
    QS: 7,
    CTR: 16.3,
    CVR: 6.7,
    Leads: 12,
    CPA: 56,
    Costs: 4567,
    Revenue: 8678,
    ROAS: 1.8,
  },
];

describe("Tables Component", () => {
  test("renders table with correct number of rows and columns", () => {
    render(
      <Tables
        setIsDrawerOpen={() => {}}
        tabRowIndex={null}
        setTabRowIndex={() => {}}
        rows={rows}
      />
    );

    // Check if the correct rows are rendered
    rows.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(`${row.QS}/10`)).toBeInTheDocument();
      expect(screen.getByText(`${row.CTR}%`)).toBeInTheDocument();
      expect(screen.getByText(`${row.CVR}%`)).toBeInTheDocument();
      expect(screen.getByText(row.Leads)).toBeInTheDocument();
      expect(screen.getByText(`$${row.CPA}`)).toBeInTheDocument();
      expect(screen.getByText(`$${row.Costs}`)).toBeInTheDocument();
      expect(screen.getByText(`$${row.Revenue}`)).toBeInTheDocument();
      expect(screen.getByText(`${row.ROAS}x`)).toBeInTheDocument();
    });
  });

  test("handles row toggle correctly", () => {
    const setTabRowIndex = jest.fn();
    const setIsDrawerOpen = jest.fn();

    render(
      <Tables
        setIsDrawerOpen={setIsDrawerOpen}
        tabRowIndex={null}
        setTabRowIndex={setTabRowIndex}
        rows={rows}
      />
    );

    // Click on the first row to toggle
    fireEvent.click(screen.getAllByRole("img")[0]);

    expect(setTabRowIndex).toHaveBeenCalledWith(0); // Check if the row index is set
    expect(setIsDrawerOpen).toHaveBeenCalledWith(true); // Check if drawer is opened
  });

  test("closes drawer when same row is clicked", () => {
    const setTabRowIndex = jest.fn();
    const setIsDrawerOpen = jest.fn();

    render(
      <Tables
        setIsDrawerOpen={setIsDrawerOpen}
        tabRowIndex={0}
        setTabRowIndex={setTabRowIndex}
        rows={rows}
      />
    );

    // Click on the first row to toggle again (should close the drawer)
    fireEvent.click(screen.getAllByRole("img")[0]);

    expect(setTabRowIndex).toHaveBeenCalledWith(null); // Check if the row index is reset
    expect(setIsDrawerOpen).toHaveBeenCalledWith(false); // Check if drawer is closed
  });
});

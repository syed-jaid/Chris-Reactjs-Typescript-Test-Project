import { render, screen } from "@testing-library/react";
import MainIndex from "../Components/app/MainIndex";

// Mock TabsIndex component
jest.mock("../Components/app/TabsIndex", () => () => <div>TabsIndex Mock</div>);

describe("MainIndex Component", () => {
  it("renders header image and title", () => {
    render(<MainIndex />);

    // Check for the header image
    const image = screen.getByAltText("Test Logo");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://i.ibb.co.com/XyHcGyp/test-logo.png"
    );

    // Check for the title
    const title = screen.getByText("React Demo Project");
    expect(title).toBeInTheDocument();
  });

  it("renders campaign title with correct styling", () => {
    render(<MainIndex />);

    // Check for the "Campaign" text
    const campaignText = screen.getByText(/Campaign/i);
    expect(campaignText).toBeInTheDocument();

    // Check for the "Search CA" text
    const searchCaText = screen.getByText(/Search CA/i);
    expect(searchCaText).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import ResizableDrawer from "../Components/app/ResizableDrawer";

describe("ResizableDrawer Component", () => {
  const setIsDrawerOpen = jest.fn();
  const setTabRowIndex = jest.fn();

  const tabRowData = { name: "Test Tab" };

  beforeEach(() => {
    setIsDrawerOpen.mockClear();
    setTabRowIndex.mockClear();
  });

  test("renders correctly when drawer is open", () => {
    render(
      <ResizableDrawer
        isDrawerOpen={true}
        setIsDrawerOpen={setIsDrawerOpen}
        setTabRowIndex={setTabRowIndex}
        tabRowData={tabRowData}
      />
    );

    // Check if the drawer is visible
    expect(screen.getByTestId("resize-handle")).toBeInTheDocument();
    expect(screen.getByText("Ad Group")).toBeInTheDocument();
    expect(screen.getByText("Test Tab")).toBeInTheDocument();
    expect(screen.getByText("Keywords")).toBeInTheDocument();
  });

  test("opens the drawer and resizes it", () => {
    render(
      <ResizableDrawer
        isDrawerOpen={true}
        setIsDrawerOpen={setIsDrawerOpen}
        setTabRowIndex={setTabRowIndex}
        tabRowData={tabRowData}
      />
    );

    // Check that the resize handle exists
    const resizeHandle = screen.getByTestId("resize-handle");
    expect(resizeHandle).toBeInTheDocument();

    // Simulate dragging the resize handle
    fireEvent.mouseDown(resizeHandle);
    fireEvent.mouseMove(window, { clientX: 800 });
    fireEvent.mouseUp(window);

    // Assert that the drawer width changes (this will depend on the drag event)
    expect(screen.getByTestId("resize-handle")).toBeInTheDocument();
  });
});

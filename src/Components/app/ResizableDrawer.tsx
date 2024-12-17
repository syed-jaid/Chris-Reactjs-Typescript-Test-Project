import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { FaAnglesRight } from "react-icons/fa6";
import Tab from "./Tab";
import TabPlus from "./TabPlus";

interface ResizableDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setTabRowIndex: Dispatch<SetStateAction<any>>;
  tabRowData: { name: string } | null;
}

const MIN_DRAWER_WIDTH_RATIO = 0.3; // 30% of window width
const MAX_DRAWER_WIDTH_RATIO = 0.8; // 80% of window width
const INITIAL_DRAWER_WIDTH_RATIO = 0.5; // 50% of window width

const ResizableDrawer: React.FC<ResizableDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  setTabRowIndex,
  tabRowData,
}) => {
  const [drawerWidth, setDrawerWidth] = useState(
    window.innerWidth * INITIAL_DRAWER_WIDTH_RATIO
  );
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("Keywords");
  const [tabs, setTabs] = useState<Array<{ label: string; isActive: boolean }>>(
    [
      { label: "Keywords", isActive: true },
      { label: "Leads", isActive: false },
      { label: "Settings", isActive: false },
    ]
  );
  const [dropdownItems, setDropdownItems] = useState<string[]>([
    "Item 1",
    "Item 2",
    "Item 3",
  ]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () =>
      setDrawerWidth(window.innerWidth * INITIAL_DRAWER_WIDTH_RATIO);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle dragging logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newWidth = window.innerWidth - e.clientX;
        const minWidth = window.innerWidth * MIN_DRAWER_WIDTH_RATIO;
        const maxWidth = window.innerWidth * MAX_DRAWER_WIDTH_RATIO;

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setDrawerWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "auto";
    };

    if (isDragging) {
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Handle active tab change
  const setActiveTabByIndex = (index: number) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab, i) => ({ ...tab, isActive: i === index }))
    );
    setActiveTab(tabs[index].label);
  };

  const handleDropdownClick = (item: string) => {
    setTabs((prevTabs) => [
      ...prevTabs.map((tab) => ({ ...tab, isActive: false })),
      { label: item, isActive: true },
    ]);
    setDropdownItems((items) => items.filter((i) => i !== item));
    setActiveTab(item);
  };

  return (
    <div>
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
        style={{ width: drawerWidth }}
      >
        {/* Close Button */}
        <FaAnglesRight
          onClick={() => {
            setIsDrawerOpen(false);
            setTabRowIndex(null);
          }}
          className="cursor-pointer text-gray-400"
        />

        {/* Drawer Content */}
        <div className="p-6 mt-6">
          <Text className="text-lg font-roboto">
            <span className="text-gray-500">Ad Group </span>
            <span className="text-gray-800 font-bold">
              {tabRowData?.name || ""}
            </span>
          </Text>

          {/* Tabs Section */}
          <div className="mt-5 border rounded-lg border-gray-300">
            <Flex className="text-sm border-b">
              {tabs.map((tab, index) => (
                <Tab
                  key={tab.label}
                  label={tab.label}
                  isActive={tab.isActive}
                  showBorder={activeTab === tab.label}
                  onClick={() => setActiveTabByIndex(index)}
                />
              ))}
              <TabPlus
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                dropdownItems={dropdownItems}
                handleDropdownClick={handleDropdownClick}
              />
            </Flex>

            <div className="p-4 w-full min-h-[200px] flex justify-center items-center text-sm">
              <Text align="center" weight="medium">
                {activeTab}
                <br />
                Coming Soon...
              </Text>
            </div>
          </div>
        </div>

        {/* Drag Handle */}
        <div
          onMouseDown={() => setIsDragging(true)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "100%",
            cursor: "ew-resize",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  );
};

export default ResizableDrawer;

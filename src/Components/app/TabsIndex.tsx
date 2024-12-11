import React, { useState, FC } from "react";
import { Box, Flex } from "@radix-ui/themes";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  hasDropdown?: boolean;
  dropdownItems?: string[];
  onDropdownClick?: (item: string) => void;
}

const Tab: FC<TabProps> = ({
  label,
  isActive,
  onClick,
  hasDropdown = false,
  dropdownItems = [],
  onDropdownClick,
}) => (
  <div
    onClick={onClick}
    className={`cursor-pointer px-4 py-2 relative ${
      label !== "+" || isActive ? "border-r-[1px]" : ""
    } ${isActive ? "font-semibold" : ""}`}
  >
    {isActive && (
      <>
        <div
          className={`${
            label === "Ad Groups" ? "w-[93%]" : "w-full"
          } absolute h-[1px] bg-[#292929] top-[-1px] right-0`}
        ></div>
        <div className="absolute w-full h-[2px] bg-white bottom-[-2px] right-0 z-10"></div>
      </>
    )}
    {label}
    {hasDropdown && isActive && (
      <div className="absolute left-0 top-[36px] w-[110px] z-10 bg-white rounded-b-[6px] drop-shadow-lg py-[10px] px-[5px]">
        {dropdownItems.length === 0 ? (
          <p className="rounded-[6px] text-[10px] px-[7px] py-[2px] font-normal cursor-pointer">
            No items available
          </p>
        ) : (
          dropdownItems.map((item, index) => (
            <p
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onDropdownClick?.(item);
              }}
              className="hover:bg-[#F3F4F6] rounded-[6px] text-[10px] px-[7px] py-[2px] font-normal cursor-pointer"
            >
              {item}
            </p>
          ))
        )}
      </div>
    )}
  </div>
);

const TabsIndex: FC = () => {
  const [activeTab, setActiveTab] = useState("Ad Groups");
  const [tabs, setTabs] = useState([
    { label: "Ad Groups" },
    { label: "Leads" },
    { label: "Settings" },
    { label: "+", hasDropdown: true },
  ]);
  const [dropdownItems, setDropdownItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDropdownClick = (item: string) => {
    setTabs((prevTabs) => [
      ...prevTabs.slice(0, -1),
      { label: item },
      ...prevTabs.slice(-1),
    ]);
    setDropdownItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  return (
    <Box className="border border-[#9797974E] rounded-[6px] mt-4">
      <Flex className="text-[13px] border-b">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            isActive={activeTab === tab.label}
            onClick={() => setActiveTab(tab.label)}
            hasDropdown={tab.hasDropdown}
            dropdownItems={dropdownItems}
            onDropdownClick={handleDropdownClick}
          />
        ))}
      </Flex>
      <div className="p-4 w-full min-h-[200px] flex justify-center items-center">
        <p className="text-center font-medium">
          {activeTab === "+" ? "Coming soon..." : activeTab}
        </p>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Click Now
        </button>
      </div>

      {/* Right-side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[40%] bg-white shadow-lg transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Close
        </button>
        <div className="p-6">
          <h2 className="text-lg font-semibold">Drawer Content</h2>
          <p className="mt-4 text-sm">This is your right-side drawer.</p>
        </div>
      </div>
    </Box>
  );
};

export default TabsIndex;

// TabsIndex.tsx
import React, { useState, FC, useEffect } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import Tables from "./Tables";
import ResizableDrawer from "./ResizableDrawer";

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
  const [activeTab, setActiveTab] = useState<string>("Ad Groups");
  const [tabs, setTabs] = useState<{ label: string; hasDropdown?: boolean }[]>([
    { label: "Ad Groups" },
    { label: "Leads" },
    { label: "Settings" },
    { label: "+", hasDropdown: true },
  ]);
  const [dropdownItems, setDropdownItems] = useState<string[]>([
    "Item 1",
    "Item 2",
    "Item 3",
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [tabRowIndex, setTabRowIndex] = useState<number | null>(null);
  const [tabRowData, setTabRowData] = useState<object | null>(null);

  const rows: {
    name: string;
    QS: number;
    CTR: number;
    CVR: number;
    Leads: number;
    CPA: number;
    Costs: number;
    Revenue: number;
    ROAS: number;
  }[] = [
    {
      name: "Account A 123-456-7890",
      QS: 3.4,
      CTR: 6.1,
      CVR: 2.34,
      Leads: 36,
      CPA: 8,
      Costs: 1323445,
      Revenue: 56607,
      ROAS: 14.1,
    },
    {
      name: "Account B 123-443-7890",
      QS: 8.4,
      CTR: 7.8,
      CVR: 3.9,
      Leads: 36,
      CPA: 3,
      Costs: 1345,
      Revenue: 56607,
      ROAS: 14.1,
    },
    {
      name: "Account C 123-456-3450",
      QS: 5.4,
      CTR: 4.1,
      CVR: 3.67,
      Leads: 83,
      CPA: 8,
      Costs: 23445,
      Revenue: 243607,
      ROAS: 156.1,
    },
  ];

  const handleDropdownClick = (item: string) => {
    setTabs((prevTabs) => [
      ...prevTabs.slice(0, -1),
      { label: item },
      ...prevTabs.slice(-1),
    ]);
    setDropdownItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  useEffect(() => {
    if (tabRowIndex != null && rows[tabRowIndex]) {
      const data = rows[tabRowIndex];
      setTabRowData(data);
    }
  }, [tabRowIndex]);

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
        {activeTab === "Ad Groups" ? (
          <Tables
            {...{
              setIsDrawerOpen,
              tabRowIndex,
              setTabRowIndex,
              rows,
            }}
          />
        ) : activeTab === "+" ? (
          <Text align="center">
            <span style={{ fontWeight: "600" }}>Add Items</span>
            <br />
            {dropdownItems.length === 0
              ? "No items available"
              : "Select items from the dropdown to add"}
            .
          </Text>
        ) : (
          <Text align="center">
            <span style={{ fontWeight: "600" }}>{activeTab}</span>
            <br />
            Coming Soon...
          </Text>
        )}
      </div>

      <ResizableDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        tabRowData={tabRowData}
      />
    </Box>
  );
};

export default TabsIndex;

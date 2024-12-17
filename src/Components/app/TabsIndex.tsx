import React, { FC, useState, useEffect } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import Tables from "./Tables";
import ResizableDrawer from "./ResizableDrawer";
import Tab from "./Tab";
import TabPlus from "./TabPlus";

// Row Data Type
interface RowData {
  name: string;
  QS: number;
  CTR: number;
  CVR: number;
  Leads: number;
  CPA: number;
  Costs: number;
  Revenue: number;
  ROAS: number;
}

// Tab Type
interface TabItem {
  label: string;
  isActive: boolean;
}

const TabsIndex: FC = () => {
  // States
  const [activeTab, setActiveTab] = useState<string>("Ad Groups");
  const [tabs, setTabs] = useState<TabItem[]>([
    { label: "Ad Groups", isActive: true },
    { label: "Leads", isActive: false },
    { label: "Settings", isActive: false },
  ]);
  const [dropdownItems, setDropdownItems] = useState<string[]>([
    "Item 1",
    "Item 2",
    "Item 3",
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [tabRowIndex, setTabRowIndex] = useState<number | null>(null);
  const [tabRowData, setTabRowData] = useState<RowData | null>(null);

  const rows: RowData[] = [
    {
      name: "Lorem Ipsum Dolor Sit Amet",
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
    {
      name: "Vestibulum Auctor Dapibus",
      QS: 9.8,
      CTR: 25.5,
      CVR: 12,
      Leads: 3,
      CPA: 345,
      Costs: 578,
      Revenue: 401,
      ROAS: -0.8,
    },
  ];

  // Handle Dropdown Click
  const handleDropdownClick = (item: string) => {
    setTabs((prevTabs) => [
      ...prevTabs.map((tab) => ({ ...tab, isActive: false })),
      { label: item, isActive: true },
    ]);
    setDropdownItems((prevItems) => prevItems.filter((i) => i !== item));
    setActiveTab(item);
  };

  // Sync Row Data on tabRowIndex Change
  useEffect(() => {
    if (tabRowIndex !== null) {
      setTabRowData(rows[tabRowIndex] || null);
    }
  }, [tabRowIndex]);

  // Handle Tab Click
  const handleTabClick = (index: number, label: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab, i) => ({ ...tab, isActive: i === index }))
    );
    setActiveTab(label);
  };

  return (
    <Box className="border border-[#9797974E] rounded-[6px] mt-4">
      {/* Tabs Header */}
      <Flex className="text-[13px] border-b">
        {tabs.map((tab, index) => (
          <Tab
            key={tab.label}
            label={tab.label}
            isActive={tab.isActive}
            showBorder={tab.isActive}
            onClick={() => handleTabClick(index, tab.label)}
          />
        ))}
        <TabPlus
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          dropdownItems={dropdownItems}
          handleDropdownClick={handleDropdownClick}
        />
      </Flex>

      {/* Content Area */}
      <div className="p-4 w-full min-h-[200px] flex justify-center items-center">
        {activeTab === "Ad Groups" ? (
          <Tables
            setIsDrawerOpen={setIsDrawerOpen}
            tabRowIndex={tabRowIndex}
            setTabRowIndex={setTabRowIndex}
            rows={rows}
          />
        ) : (
          <Text align="center">
            <span style={{ fontWeight: "600", fontSize: "13px" }}>
              {activeTab}
            </span>
            <br />
            <span style={{ fontSize: "13px" }}>Coming Soon...</span>
          </Text>
        )}
      </div>

      {/* Resizable Drawer */}
      <ResizableDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        setTabRowIndex={setTabRowIndex}
        tabRowData={tabRowData}
      />
    </Box>
  );
};

export default TabsIndex;

import React, { useState } from "react";
import { Box, Flex } from "@radix-ui/themes";

const Tab = ({
  label,
  isActive,
  onClick,
  hasDropdown,
  onDropdownClick,
}: any) => (
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
      <div className="absolute left-[0] top-[36px] w-[100px] z-10 bg-white rounded-b-[6px] drop-shadow-lg py-[10px] px-[5px]">
        {["Item 1", "Item 2", "Item 3"].map(
          (item, index) =>
            onDropdownClick && (
              <p
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onDropdownClick(item);
                }}
                className="hover:bg-[#F3F4F6] rounded-[6px] text-[10px] px-[7px] py-[2px] font-normal cursor-pointer"
              >
                {item}
              </p>
            )
        )}
      </div>
    )}
  </div>
);

const TabsIndex = () => {
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
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            label={tab.label}
            isActive={activeTab === tab.label}
            onClick={() => setActiveTab(tab.label)}
            hasDropdown={tab.hasDropdown}
            onDropdownClick={tab.hasDropdown ? handleDropdownClick : null}
          />
        ))}
      </Flex>
      <div className="p-4 w-full min-h-[200px] flex justify-center items-center">
        <p className="text-center font-medium">
          {activeTab === "+" ? "Coming soon..." : activeTab}
        </p>
      </div>
    </Box>
  );
};

export default TabsIndex;

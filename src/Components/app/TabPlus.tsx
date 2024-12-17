import React, { FC, MouseEvent } from "react";

interface TabPlusProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
  dropdownItems: string[];
  handleDropdownClick?: (item: string) => void;
}

const TabPlus: FC<TabPlusProps> = ({
  setActiveTab,
  activeTab,
  dropdownItems,
  handleDropdownClick,
}) => {
  const handleClick = (e: MouseEvent, item: string) => {
    e.stopPropagation();
    handleDropdownClick?.(item);
  };

  const isActive = activeTab === "+";

  return (
    <div
      onClick={() => setActiveTab("+")}
      className={`cursor-pointer px-4 py-2 relative ${
        isActive ? "border-r-[1px] font-semibold" : ""
      }`}
    >
      {isActive && (
        <>
          {/* Top Border */}
          <div className="absolute w-full h-[1px] bg-[#292929] top-[-1px] right-0" />
          {/* Bottom Active Border */}
          <div className="absolute w-full h-[2px] bg-white bottom-[-2px] right-0 z-10" />
        </>
      )}
      +
      {isActive && (
        <div className="absolute left-0 top-[36px] w-[110px] z-10 bg-white rounded-b-[6px] drop-shadow-lg py-[10px] px-[5px]">
          {dropdownItems.length === 0 ? (
            <p className="rounded-[6px] text-[10px] px-[7px] py-[2px] font-normal cursor-pointer">
              No items available
            </p>
          ) : (
            dropdownItems.map((item, index) => (
              <p
                key={index}
                onClick={(e) => handleClick(e, item)}
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
};

export default TabPlus;

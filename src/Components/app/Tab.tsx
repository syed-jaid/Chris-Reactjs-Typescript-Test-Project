import { FC } from "react";

interface TabProps {
  label: string;
  showBorder: boolean;
  isActive: boolean;
  onClick: () => void;
}

const Tab: FC<TabProps> = ({ label, isActive, showBorder, onClick }) => {
  const topBorderWidth =
    label === "Ad Groups" || label === "Keywords" ? "w-[93%]" : "w-full";

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-4 py-2 relative border-r-[1px] ${
        isActive ? "font-semibold" : ""
      }`}
      style={{ whiteSpace: "nowrap" }}
    >
      {showBorder && (
        <>
          {/* Top Border */}
          <div
            className={`${topBorderWidth} absolute h-[1px] bg-[#292929] top-[-1px] right-0`}
          />
          {/* Bottom Active Border */}
          <div className="absolute w-full h-[2px] bg-white bottom-[-2px] right-0 z-10" />
        </>
      )}
      {label}
    </div>
  );
};

export default Tab;

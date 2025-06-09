import React from "react";

interface CellProps {
  label: string;
  marked: boolean;
  isWinning: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ label, marked, isWinning, onClick }) => (
  <div
    className={`
        aspect-square 
        flex items-center justify-center 
        text-center
        border border-gray-300 rounded-md 
        p-1 cursor-pointer select-none 
        transition-all 
        overflow-hidden
        text-ellipsis
        ${
          marked
            ? isWinning
              ? "bg-yellow-400 text-white shadow-md scale-105"
              : "bg-green-500 text-white"
            : "bg-white hover:bg-gray-100"
        }
      `}
    onClick={onClick}
  >
    <span className="block overflow-hidden text-ellipsis leading-tight line-clamp-3 text-[6px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base">
      {label}
    </span>
  </div>
);

export default Cell;

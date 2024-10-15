import React from "react";

type ButtonType = "add" | "edit" | "delete" | "excel" | "save" | "back";

interface ActionButtonProps {
  type: ButtonType;
  onClick?: () => void; // Optional custom click handler
  label?: string;       // Custom label
  disabled?: boolean; 
  className?: string;   // Optional className
}
const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick, label, disabled,className }) => {
  const handleButtonClick = () => {
    // Only invoke onClick if    is provided
    if (onClick) {
      onClick();
    }
  };

  // Determine button classes based on type
  const getButtonClasses = (type: ButtonType) => {
    switch (type) {
      case "add":
      case "edit":
        return "bg-[#1ABC9C] hover:bg-[#16A085] text-white py-2 px-4 rounded";
      case "delete":
        return "bg-[#E74C3C] hover:bg-[#C0392B] text-white py-2 px-4 rounded";
      case "excel":
        return "bg-[#F39C12] hover:bg-[#E67E22] text-white py-2 px-4 rounded";
      case "save":
        return "bg-[#635bff] hover:bg-[#635bff] text-white py-2 px-4 rounded";
      case "back":
        return "bg-[#00B894] hover:bg-[#009D80] text-white py-2 px-4 rounded";
      default:
        return "";
    }
  };

  // Determine button label based on type
  const getButtonLabel = (type: ButtonType) => {
    switch (type) {
      case "add":
        return "Add";
      case "edit":
        return "Edit";
      case "delete":
        return "Delete";
      case "excel":
        return "Export to Excel";
      case "save":
        return "Save";
      case "back":
        return "Back";
      default:
        return "";
    }
  };

  const buttonLabel = label || getButtonLabel(type);

  return (
    <button
      className={`${getButtonClasses(type)} ${className}||""}`}
      onClick={handleButtonClick}  // Safely call the function only if defined
      disabled={disabled}
    >
      {buttonLabel}
    </button>
  );
};

export default ActionButton;

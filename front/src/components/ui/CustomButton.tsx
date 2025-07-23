"use client";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  additionalStyles?: string;
  type?: "button" | "submit";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  disabled = false,
  additionalStyles = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full h-10 bg-blue-600 text-white font-medium rounded 
        hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
        transition-colors duration-200 ${additionalStyles}
      `}
    >
      {label}
    </button>
  );
};

export default CustomButton;

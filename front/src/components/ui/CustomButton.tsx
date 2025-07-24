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
  const baseClasses =
    "monkeycode-button w-full flex items-center justify-center font-medium cursor-pointer";
  const normalClasses = "text-white";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  const getBackgroundStyle = () => {
    if (disabled) return { backgroundColor: "#4f545c" };
    if (additionalStyles.includes("bg-green"))
      return { backgroundColor: "var(--monkeycode-success)" };
    if (additionalStyles.includes("bg-red"))
      return { backgroundColor: "var(--monkeycode-danger)" };
    if (additionalStyles.includes("bg-gray"))
      return { backgroundColor: "#4f545c" };
    return { backgroundColor: "var(--monkeycode-accent)" };
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${
        disabled ? disabledClasses : normalClasses
      } ${additionalStyles}`}
      style={getBackgroundStyle()}
    >
      {label}
    </button>
  );
};

export default CustomButton;

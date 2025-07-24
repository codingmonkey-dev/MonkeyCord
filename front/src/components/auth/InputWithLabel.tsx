"use client";

interface InputWithLabelProps {
  label: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  type,
  value,
  setValue,
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col mb-5">
      <label
        className="text-xs font-semibold mb-2 uppercase tracking-wide"
        style={{ color: "var(--monkeycode-text-secondary)" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="monkeycode-input"
      />
    </div>
  );
};

export default InputWithLabel;

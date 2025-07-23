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
    <div className="flex flex-col mb-4">
      <label className="text-gray-300 text-sm font-semibold mb-2 uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-10 px-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default InputWithLabel;

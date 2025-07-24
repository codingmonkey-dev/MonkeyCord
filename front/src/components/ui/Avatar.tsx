"use client";

interface AvatarProps {
  username: string;
  large?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ username, large = false }) => {
  const size = large ? "w-20 h-20 text-2xl" : "w-8 h-8 text-sm";
  const colors = [
    "#7289da",
    "#99aab5",
    "#2c2f33",
    "#23272a",
    "#ffffff",
    "#f04747",
    "#faa61a",
    "#43b581",
    "#593695",
    "#ff73fa",
  ];

  const getColorFromUsername = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div
      className={`${size} monkeycode-avatar rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0`}
      style={{ backgroundColor: getColorFromUsername(username) }}
    >
      {username.substring(0, 2).toUpperCase()}
    </div>
  );
};

export default Avatar;

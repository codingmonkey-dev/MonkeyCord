"use client";

interface AvatarProps {
  username: string;
  large?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ username, large = false }) => {
  const size = large ? "w-20 h-20 text-2xl" : "w-10 h-10 text-lg";

  return (
    <div
      className={`${size} bg-blue-600 rounded-full flex items-center justify-center font-bold text-white`}
    >
      {username.substring(0, 2).toUpperCase()}
    </div>
  );
};

export default Avatar;

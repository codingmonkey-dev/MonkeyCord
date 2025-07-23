"use client";

import Avatar from "@/components/ui/Avatar";

interface MessageProps {
  content: string;
  sameAuthor: boolean;
  username: string;
  date: string;
  sameDay: boolean;
}

const Message: React.FC<MessageProps> = ({
  content,
  sameAuthor,
  username,
  date,
  sameDay,
}) => {
  if (sameAuthor && sameDay) {
    return (
      <div className="w-full text-gray-300 mb-1">
        <span className="ml-14">{content}</span>
      </div>
    );
  }

  return (
    <div className="w-full flex mt-2 mb-1">
      <div className="w-14 flex-shrink-0">
        <Avatar username={username} />
      </div>
      <div className="flex flex-col ml-2">
        <div className="flex items-center">
          <span className="text-white font-semibold text-base">{username}</span>
          <span className="text-gray-500 text-xs ml-2">{date}</span>
        </div>
        <div className="text-gray-300">{content}</div>
      </div>
    </div>
  );
};

export default Message;

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
      <div className="monkeycode-message hover:bg-opacity-5 hover:bg-black pl-14 py-1">
        <span style={{ color: "var(--monkeycode-text-secondary)" }}>
          {content}
        </span>
      </div>
    );
  }

  return (
    <div className="monkeycode-message hover:bg-opacity-5 hover:bg-black">
      <div className="flex items-start">
        <div className="w-10 flex-shrink-0 mr-4">
          <Avatar username={username} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline mb-1">
            <span
              className="font-semibold mr-2"
              style={{ color: "var(--monkeycode-text-primary)" }}
            >
              {username}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--monkeycode-text-muted)" }}
            >
              {date}
            </span>
          </div>
          <div
            className="text-sm leading-relaxed break-words"
            style={{ color: "var(--monkeycode-text-secondary)" }}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

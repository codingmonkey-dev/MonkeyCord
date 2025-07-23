"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { chosenChatDetailsAtom, messagesAtom } from "@/store/atoms/chat";
import { getDirectChatHistory } from "@/lib/socket";
import { convertDateToHumanReadable } from "@/lib/utils";
import Message from "./Message";
import Avatar from "@/components/ui/Avatar";

const Messages: React.FC = () => {
  const [chosenChatDetails] = useAtom(chosenChatDetailsAtom);
  const [messages] = useAtom(messagesAtom);

  useEffect(() => {
    if (chosenChatDetails) {
      getDirectChatHistory({ receiverUserId: chosenChatDetails.id });
    }
  }, [chosenChatDetails]);

  if (!chosenChatDetails) return null;

  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col mb-4">
          <Avatar username={chosenChatDetails.name} large />
          <h4 className="text-white text-2xl font-bold mt-2">
            {chosenChatDetails.name}
          </h4>
          <p className="text-gray-400">
            {chosenChatDetails.name}님과의 대화 시작입니다.
          </p>
        </div>

        {messages.map((message, index) => {
          const sameAuthor =
            index > 0 &&
            messages[index].author._id === messages[index - 1].author._id;

          const sameDay =
            index > 0 &&
            convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") ===
              convertDateToHumanReadable(
                new Date(messages[index - 1].date),
                "dd/mm/yy"
              );

          return (
            <div key={message._id} className="w-full">
              {(!sameDay || index === 0) && (
                <div className="relative my-4">
                  <div className="w-full h-px bg-gray-600"></div>
                  <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 px-2 text-gray-400 text-sm">
                    {convertDateToHumanReadable(
                      new Date(message.date),
                      "dd/mm/yy"
                    )}
                  </span>
                </div>
              )}
              <Message
                content={message.content}
                username={message.author.username}
                sameAuthor={sameAuthor}
                date={convertDateToHumanReadable(
                  new Date(message.date),
                  "dd/mm/yy"
                )}
                sameDay={sameDay}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;

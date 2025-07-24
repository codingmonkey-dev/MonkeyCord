"use client";

import { useState, useEffect } from "react";
import { sendFriendInvitation } from "@/lib/api";
import { validateEmail } from "@/lib/validators";
import InputWithLabel from "@/components/auth/InputWithLabel";
import CustomButton from "@/components/ui/CustomButton";

const AddFriendDialog: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsFormValid(validateEmail(mail));
  }, [mail]);

  const handleSendInvitation = async () => {
    setIsLoading(true);
    setMessage("");

    const response = await sendFriendInvitation({ targetMailAddress: mail });

    if (response.error) {
      setMessage(
        response.exception?.response?.data || "초대 발송에 실패했습니다."
      );
    } else {
      setMessage("초대가 발송되었습니다.");
      setMail("");
      setTimeout(() => {
        setIsDialogOpen(false);
        setMessage("");
      }, 2000);
    }

    setIsLoading(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setMail("");
    setMessage("");
  };

  return (
    <>
      <CustomButton
        label="친구 추가"
        onClick={() => setIsDialogOpen(true)}
        additionalStyles="bg-success w-full"
      />

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div
            className="monkeycode-card w-96 max-w-md p-6 mx-4"
            style={{ backgroundColor: "var(--monkeycode-bg-modal)" }}
          >
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--monkeycode-text-primary)" }}
            >
              친구 초대
            </h3>
            <p
              className="mb-6"
              style={{ color: "var(--monkeycode-text-secondary)" }}
            >
              초대할 친구의 이메일을 입력하세요
            </p>

            <InputWithLabel
              label="이메일"
              type="email"
              value={mail}
              setValue={setMail}
              placeholder="친구의 이메일을 입력하세요"
            />

            {message && (
              <div
                className={`text-sm mb-4 px-3 py-2 rounded ${
                  message.includes("실패")
                    ? "text-red-400 bg-red-900 bg-opacity-20"
                    : "text-green-400 bg-green-900 bg-opacity-20"
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex gap-3">
              <CustomButton
                label={isLoading ? "전송 중..." : "초대 전송"}
                onClick={handleSendInvitation}
                disabled={!isFormValid || isLoading}
                additionalStyles="flex-1"
              />
              <CustomButton
                label="취소"
                onClick={handleCloseDialog}
                additionalStyles="flex-1 bg-gray"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFriendDialog;

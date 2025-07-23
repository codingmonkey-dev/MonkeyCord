"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/atoms/auth";
import { register } from "@/lib/api";
import { validateRegisterForm } from "@/lib/validators";
import InputWithLabel from "./InputWithLabel";
import CustomButton from "../ui/CustomButton";
import Link from "next/link";

const RegisterForm: React.FC = () => {
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const setUser = useSetAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    setIsFormValid(validateRegisterForm(mail, password, username));
  }, [mail, password, username]);

  const handleRegister = async () => {
    setIsLoading(true);
    setError("");

    const response = await register({ mail, password, username });

    if (response.error) {
      setError(
        response.exception?.response?.data || "회원가입에 실패했습니다."
      );
    } else {
      const { userDetails } = response.data;
      localStorage.setItem("user", JSON.stringify(userDetails));
      setUser(userDetails);
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">회원가입</h2>

      <InputWithLabel
        label="이메일"
        type="email"
        value={mail}
        setValue={setMail}
        placeholder="이메일을 입력하세요"
      />

      <InputWithLabel
        label="이름"
        type="text"
        value={username}
        setValue={setUsername}
        placeholder="이름을 입력하세요"
      />

      <InputWithLabel
        label="비밀번호"
        type="password"
        value={password}
        setValue={setPassword}
        placeholder="비밀번호를 입력하세요"
      />

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <CustomButton
        label={isLoading ? "회원가입 중..." : "회원가입"}
        onClick={handleRegister}
        disabled={!isFormValid || isLoading}
        additionalStyles="mb-4"
      />

      <div className="text-gray-400 text-sm">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-blue-400 hover:underline">
          로그인
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;

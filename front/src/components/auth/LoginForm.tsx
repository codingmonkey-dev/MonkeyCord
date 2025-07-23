"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/atoms/auth";
import { login } from "@/lib/api";
import { validateLoginForm } from "@/lib/validators";
import InputWithLabel from "./InputWithLabel";
import CustomButton from "../ui/CustomButton";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const setUser = useSetAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    setIsFormValid(validateLoginForm(mail, password));
  }, [mail, password]);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    const response = await login({ mail, password });

    if (response.error) {
      setError(response.exception?.response?.data || "로그인에 실패했습니다.");
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
      <h2 className="text-2xl font-bold text-white mb-2">반가워요!</h2>
      <p className="text-gray-400 mb-6">
        디스코드와 함께 즐거운 시간 보내세요~
      </p>

      <InputWithLabel
        label="이메일"
        type="email"
        value={mail}
        setValue={setMail}
        placeholder="이메일을 입력하세요"
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
        label={isLoading ? "로그인 중..." : "로그인"}
        onClick={handleLogin}
        disabled={!isFormValid || isLoading}
        additionalStyles="mb-4"
      />

      <div className="text-gray-400 text-sm">
        계정이 필요하신가요?{" "}
        <Link href="/register" className="text-blue-400 hover:underline">
          회원가입
        </Link>
      </div>
    </>
  );
};

export default LoginForm;

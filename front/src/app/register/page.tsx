"use client";

import AuthBox from "@/components/auth/AuthBox";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthBox>
      <RegisterForm />
    </AuthBox>
  );
}

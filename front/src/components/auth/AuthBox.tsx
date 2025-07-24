"use client";

import { ReactNode } from "react";

interface AuthBoxProps {
  children: ReactNode;
}

const AuthBox: React.FC<AuthBoxProps> = ({ children }) => {
  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--monkeycode-accent)" }}
    >
      <div className="monkeycode-card w-full max-w-md p-8 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AuthBox;

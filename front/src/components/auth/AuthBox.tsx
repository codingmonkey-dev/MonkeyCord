"use client";

import { ReactNode } from "react";

interface AuthBoxProps {
  children: ReactNode;
}

const AuthBox: React.FC<AuthBoxProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-600">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AuthBox;

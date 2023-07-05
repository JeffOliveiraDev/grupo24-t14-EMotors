"use client";
import { Context } from "@/context/HomeContext";
import React, { useContext } from "react";

const Button = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { setClearFilter } = useContext(Context);
  return (
    <button
      onClick={() => setClearFilter((e) => !e)}
      className={className && className}
    >
      {children}
    </button>
  );
};

export default Button;

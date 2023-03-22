import React, { ReactNode } from "react";

interface FormButtonProps {
  children: ReactNode;
  buttonType: "submit" | "normal";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  "data-testid"?: string;
}

const FormButton: React.FC<FormButtonProps> = ({
  children,
  buttonType,
  onClick,
  disabled = false,
  className = "",
  "data-testid": testId,
}) => {
  const buttonClass =
    buttonType === "submit"
      ? "bg-[#374151] text-white py-2 px-[11px] rounded border border-[#E5E7EB] disabled:bg-[#E5E7EB]"
      : "p-[7.73px] hover:bg-[#7786D2] bg-[#C7D1F4] rounded disabled:hover:bg-[#C7D1F4]";

  return (
    <button
      type={buttonType === "submit" ? "submit" : "button"}
      className={`${className} ${buttonClass}`}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </button>
  );
};

export default FormButton;

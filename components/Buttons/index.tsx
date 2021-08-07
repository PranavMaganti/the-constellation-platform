import classNames from "classnames";
import React from "react";

interface RoundedButtonProps {
  text: string;
  className: string;
  onClick: () => void;
}

export function RedRoundedButton(props: RoundedButtonProps) {
  const { text, className, onClick } = props;
  return (
    <button
      className={classNames(
        "py-2 px-5",
        "bg-primary hover:bg-primary-dark text-white text-xl font-bold",
        "rounded-full",
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export function TransparentRoundedButton(props: RoundedButtonProps) {
  const { text, className, onClick } = props;
  return (
    <button
      className={classNames(
        "py-2",
        "bg-transparent text-black font-bold text-xl",
        "rounded-full",
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

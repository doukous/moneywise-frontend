import { useState, useRef } from "react";

export const usePasswordConformityCheck = () => {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmationPasswordRef = useRef<HTMLInputElement | null>(null);
  const [samePasswords, setSamePasswords] = useState(true);

  function checkPasswordsConformity() {
    if (passwordRef.current?.value !== confirmationPasswordRef.current?.value) {
      setSamePasswords(false);
    } else {
      setSamePasswords(true);
    }
  }

  return {
    passwordRef: passwordRef,
    confirmationPasswordRef: confirmationPasswordRef,
    samePasswords: samePasswords,
    checkPasswordsConformity: checkPasswordsConformity,
  };
};

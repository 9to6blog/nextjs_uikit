"use client";
import { useRef, useState } from "react";
/** The caller owns persistence. Success is shown only after its promise resolves. */
export function useSubmission(successMessage: string) {
  const lock = useRef(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  async function run(action: () => void | Promise<void>) {
    if (lock.current) return;
    lock.current = true;
    setPending(true);
    setMessage("");
    setFailed(false);
    try {
      await action();
      setMessage(successMessage);
    } catch (error) {
      setFailed(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "처리하지 못했습니다. 다시 시도해 주세요.",
      );
    } finally {
      lock.current = false;
      setPending(false);
    }
  }
  return {
    pending,
    run,
    feedback: message ? (
      <p
        className={failed ? "n-error" : "n-block-muted"}
        role={failed ? "alert" : "status"}
      >
        {message}
      </p>
    ) : null,
  };
}

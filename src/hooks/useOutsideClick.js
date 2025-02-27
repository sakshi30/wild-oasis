import { useEffect, useRef } from "react";

export function useOutsideClick(handler) {
  const ref = useRef();

  useEffect(() => {
    function handleClickEvent(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("clicked");
        handler();
      }
    }
    document.addEventListener("click", handleClickEvent, true);

    return () => document.removeEventListener("click", handleClickEvent);
  }, [handler]);
  return { ref };
}

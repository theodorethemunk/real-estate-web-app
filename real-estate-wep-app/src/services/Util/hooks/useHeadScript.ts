import { useEffect } from "react";

export const useHeadScript = (scriptId: string, scriptSrc: string) => {
  useEffect(() => {
    if (!scriptSrc || document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = scriptSrc;

    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) document.head.removeChild(existing);
    };
  }, [scriptId, scriptSrc]);
};

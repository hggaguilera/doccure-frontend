import { Tooltip as BsTooltip } from "bootstrap";
import React, { useEffect, useRef } from "react";

function Tooltip({ children, text }) {
  const childRef = useRef();

  useEffect(() => {
    const t = new BsTooltip(childRef.current, {
      title: text,
      placement: "right",
      trigger: "hover",
    });
    return () => t.dispose();
  }, [text]);

  return React.cloneElement(children, { ref: childRef });
}

export default Tooltip;

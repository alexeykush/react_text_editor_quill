import { useCallback } from "react";

const useActiveClassName = (isActive, activeClass="active") => {
    return useCallback(className => `${className} ${isActive ? activeClass : ""}`.trim(), [isActive]);
};

export default useActiveClassName;
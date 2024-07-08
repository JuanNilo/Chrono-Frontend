import { use, useCallback, useEffect, useState } from "react";

export default function useScroll() {
    const [scrollY, setScrollY] = useState(false);

    const onScroll = useCallback(() => {
        setScrollY(window.scrollY > 0);
    }, [window.scrollY]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll]);

    useEffect(() => {
        onScroll();
    }, [onScroll]);

    return scrollY;
}
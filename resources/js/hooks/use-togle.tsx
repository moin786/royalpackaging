import { useEffect, useState } from 'react';

export function useToggle() {
    // 1️⃣ Initialize from localStorage
    const [isShow, setIsShow] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false; // SSR safety
        const stored = localStorage.getItem('isShow');
        return stored ? JSON.parse(stored) : false;
    });

    // 2️⃣ Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('isShow', JSON.stringify(isShow));
    }, [isShow]);

    // 1️⃣ Initialize from localStorage
    const [topen, setTopen] = useState<boolean>(() => {
        if (typeof window === 'undefined') return true; // SSR safety
        const stored = localStorage.getItem('topen');
        return stored ? JSON.parse(stored) : false;
    });

    // 2️⃣ Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('topen', JSON.stringify(topen));
    }, [topen]);

    // 3️⃣ Toggle visibility
    function toggleShow() {
        setIsShow((prev) => !prev);
        setTopen(false);
    }

    function toggleShowOnProductClick() {
        setIsShow((prev) => !prev);
        setTopen(true);
    }

    function handleProduct() {
        toggleShow();
    }

    function handleCartItem() {
        toggleShowOnProductClick();
    }

    return {
        isShow,
        topen,
        toggleShow,
        toggleShowOnProductClick,
        handleProduct,
        handleCartItem,
    };
}

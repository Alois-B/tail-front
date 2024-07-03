"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        router.push('http://localhost:3000/logout');
    }, [router]);

    return null;
}
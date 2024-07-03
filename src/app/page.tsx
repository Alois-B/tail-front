"use client"; 

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return null;
  
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Intro from "./Components/Intro";


const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/User/Home");
    }, 5000); // 7 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>

      <Intro/>
    </>
  );
};

export default Page;
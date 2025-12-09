"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLogin } from "../hooks/useLogin";
import { useRouter } from "next/navigation";

export default function Login() {

  const [email , setEmail] = React.useState('');
  const [password , setPassword] = React.useState('');
  const [error , setError] = React.useState('');

  const router = useRouter();

  const handleLogin = async () =>{
    try{
      const {result} = await useLogin(email , password);
      if(result.success){
        router.push('/dashboard');
      }
    }
    catch(err:any){
      setError(err.response.data.message);
      return;
    }
  }
  return (
    <div className="flex h-screen">
      <div className="w-[70%] h-full relative">
        <Image
          src="/fancy1.jpg"
          alt="Login"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>

      <div className="w-[30%] flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-[300px] flex flex-col gap-4">
          <h2 className="text-3xl font-semibold mb-4">Login</h2>

          <Input placeholder="Email" className="border-amber-600 focus-visible:ring-3 focus-visible:ring-amber-400" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" className="border-amber-600 focus-visible:ring-3 focus-visible:ring-amber-400 " value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={handleLogin}>Login</Button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Link href="/signup" className="text-sm text-center text-amber-600 hover:underline mt-2">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

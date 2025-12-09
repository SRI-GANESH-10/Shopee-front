'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSignup } from "../hooks/useSignup";
import { useRouter } from "next/navigation";

export default function SignUp() {

  const [name  , setName] = React.useState('');
  const [email , setEmail] = React.useState('');
  const [password , setPassword] = React.useState('');
  const [confirmPassword , setConfirmPassword] = React.useState('');
  const [error , setError] = React.useState('');

  const router = useRouter();

  const handleSignUp = async () => {
    // Sign up logic to be implemented
   try{
     if(password !== confirmPassword){
      setError("Passwords do not match");
      return;
    }

    const { result } = await useSignup(name , email , password);
    if(!result.success){
      setError(result.message);
      return;
    }
    else{
      router.replace('/login');
    }
   }
    catch(err:any){
      console.log(err , "EE")
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
          <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
          <Input placeholder="Name" className="border-amber-600 focus-visible:ring-3 focus-visible:ring-amber-400" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" className="border-amber-600 focus-visible:ring-3 focus-visible:ring-amber-400" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" className="border-amber-600 focus-visible:ring-3 focus-visible:ring-amber-400 " value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="Confirm Password" type="password" className="border-amber-600 focus-visible:ring-3 focus-visible:ring-amber-400 " value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={handleSignUp}>SignUp</Button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Link href="/login" className="text-sm text-center text-amber-600 hover:underline mt-2">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

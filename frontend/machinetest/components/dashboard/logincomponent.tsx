"use client";
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


import { getUserId, handleLogin } from "@/lib/actions";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import apiService from "@/services/apiService"

export function Logincomp() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  
  useEffect(() => {
    const checkUser = async () => {
      const userId = await getUserId();
      if (userId) {
        router.push('/home');
      }
    }
    checkUser();
  }, []);
  
  const submitLogin = async () => {
    const formData = {
        email: email,
        password: password
    }

    const response = await apiService.postWithoutToken('/auth/', JSON.stringify(formData))

    if (response.access) {
        handleLogin( response.access, response.refresh);


        router.push('/home')
    } else {
        setErrors(response.non_field_errors);
    }
}

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Welcome Back
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>

            <Button type="submit" className="w-full"  onClick={submitLogin}>
              Login
            </Button>
            <Button variant="outline" className="w-full" >
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
          {errors.map((error, index) => {
                    return (
                        <div 
                            key={`error_${index}`}
                            className="p-5   text-red-500 rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                        
                    )
                })}
          
        </div>
        
      </div>

      
      <div className="hidden bg-primary lg:block items-center justify-center relative">
      
      <div className="flex items-center justify-center  py-52">
    
                
                
                </div>
                
                
      </div>
      
      
    </div>
  )
}


import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GlobeDemo from "../homepage/world"

import { getUserId, handleLogin } from "@/app/lib/actions";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import apiService from "@/services/apiService"

export function Registercomp() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
      };
      const router = useRouter();
      const [email, setEmail] = useState('');
      const [password1, setPassword1] = useState('');
      const [password2, setPassword2] = useState('');
      const [errors, setErrors] = useState<string[]>([]);
      
      useEffect(() => {
        const checkUser = async () => {
          const userId = await getUserId();
          if (userId) {
            router.push('/dashboard');
          }
        }
        checkUser();
      }, []);
      
      const submitSignup = async () => {
        if (password1 !== password2) {
          setErrors(['Passwords do not match']);
          return;
      }

        const formData = {
            email: email,
            password: password1
        }
    
        const response = await apiService.postWithoutToken('/api/auth/register/', JSON.stringify(formData));
    
        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh);
    
            
            router.push('/dashboard')
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            })
    
            setErrors(tmpErrors);
        }
    }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Create Account
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
                <Label htmlFor="password">Enter a Password</Label>
                
              </div>
              <Input id="password1" onChange={(e) => setPassword1(e.target.value)} type="password" required />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm the Password</Label>
               
              </div>
              <Input id="password2" onChange={(e) => setPassword2(e.target.value)} type="password" required />
            </div>
           
            <Button type="submit" className="w-full"  onClick={submitSignup}>
              Register
            </Button>
            <Button variant="outline" className="w-full" >
              Register with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Aleardy have an account?{" "}
            <Link href="/login" className="underline">
              Login
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
      
        <div className="max-w-md xl:max-w-xl items-center justify-center">
                    <a href="#" className="mb-4 flex items-center text-2xl font-semibold text-white">
                        <img className="mr-2 h-8 w-8" src="https://imgur.com/oJDxg2r.png" alt="logo"/>
                        Virtual Emulators                  </a>
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-white xl:text-5xl">
                        Your Game, Our World: Hosting Perfected</h1>
                       
                    <p className="text-primary-200 mb-4 font-light lg:mb-8">Here you might want to explain how everything works. You can edit this in Admin -&gt; configuration -&gt; Theme Settings                    </p>
                    <div className="divide-primary-500 flex items-center divide-x">
                        <div className="flex -space-x-4 pr-3 sm:pr-5">
                            <img className="h-10 w-10 rounded-full border-2 border-white" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="bonnie avatar" />
                            <img className="h-10 w-10 rounded-full border-2 border-white" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="jese avatar" />
                            <img className="h-10 w-10 rounded-full border-2 border-white" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="roberta avatar" />
                            <img className="h-10 w-10 rounded-full border-2 border-white" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png" alt="thomas avatar0" />
                        </div>
                        <div className="pl-3 text-white dark:text-white sm:pl-5">
                            <span className="text-primary-200 text-sm">Join over 3.2k members</span>
                        </div>
                        
                    </div>
                    
                </div>
                {/* <GlobeDemo/> */}
                
                </div>
                
                
      </div>
      
      
    </div>
  )
}

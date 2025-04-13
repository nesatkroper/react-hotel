import Signin from "./components/signin";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import React from "react";

const Auth = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4'>
      <div className='w-full max-w-md'>
        {/* Admin branding header */}
        <div className='text-center mb-6'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 mb-4 shadow-lg'>
            <ShieldCheck className='h-8 w-8 text-white' />
          </div>
          <h1 className='text-2xl font-bold text-slate-900'>Admin Portal</h1>
          <p className='text-slate-500 mt-1'>
            Secure access to management dashboard
          </p>
        </div>

        <Card className='border-0 shadow-xl'>
          <CardContent className='p-0'>
            <Tabs defaultValue='signin' className='w-full'>
              <div className='border-b'>
                <TabsList className='w-full rounded-none bg-transparent h-14'>
                  <TabsTrigger
                    value='signin'
                    className='flex-1 data-[state=active]:border-b-2 data-[state=active]:border-slate-900 data-[state=active]:shadow-none rounded-none'>
                    <LockKeyhole className='mr-2 h-4 w-4' />
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value='signup'
                    className='flex-1 data-[state=active]:border-b-2 data-[state=active]:border-slate-900 data-[state=active]:shadow-none rounded-none'>
                    <ShieldCheck className='mr-2 h-4 w-4' />
                    New Admin
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className='px-8 py-6'>
                <TabsContent value='signin' className='mt-0'>
                  <Signin />
                  <div className='mt-6 text-center'>
                    <p className='text-sm text-slate-500'>
                      Trouble signing in? Contact{" "}
                      <span className='text-slate-900 font-medium'>
                        IT Support
                      </span>
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value='signup' className='mt-0'>
                  <div className='py-8 text-center'>
                    <ShieldCheck className='mx-auto h-12 w-12 text-slate-300 mb-4' />
                    <h3 className='text-lg font-medium text-slate-900 mb-2'>
                      Admin Registration
                    </h3>
                    <p className='text-sm text-slate-500 mb-4'>
                      New admin accounts require authorization from a super
                      admin.
                    </p>
                    <p className='text-sm text-slate-500'>
                      Please contact your system administrator to request
                      access.
                    </p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className='mt-6 text-center'>
          <p className='text-xs text-slate-500'>
            © {new Date().getFullYear()} Your Company •{" "}
            <span className='hover:underline cursor-pointer'>
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

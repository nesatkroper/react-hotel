import React, { useState, useEffect } from "react";
import Signin from "./components/signin";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  LockKeyhole,
  ShieldCheck,
  Bell,
  Globe,
  Clock,
  Info,
} from "lucide-react";

const Auth = () => {
  const [t] = useTranslation("admin");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900'>
      <div className='w-full md:w-1/2 p-8 flex flex-col justify-between'>
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-center space-x-3'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg'>
              <ShieldCheck className='h-6 w-6 text-white' />
            </div>
            <div>
              <p className='text-md font-bold text-white'>{t("app-name")}</p>
              <p className='text-slate-400 text-sm'>{t("subtitle")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className='mt-16 md:mt-24 max-w-md'>
            <h2 className='text-center text-xl md:text-4xl font-bold text-white leading-tight'>
              {t("auth.title")}
            </h2>
            <p className='mt-4 text-center text-slate-300'>{t("auth.label")}</p>

            <div className='mt-8 grid grid-cols-2 gap-4'>
              {[
                {
                  icon: Globe,
                  title: t("auth.globe"),
                  desc: t("auth.globe-desc"),
                },
                {
                  icon: Bell,
                  title: t("auth.bell"),
                  desc: t("auth.bell-desc"),
                },
                {
                  icon: Clock,
                  title: t("auth.clock"),
                  desc: t("auth.clock-desc"),
                },
                {
                  icon: Info,
                  title: t("auth.info"),
                  desc: t("auth.info-desc"),
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className='flex items-start space-x-3'>
                  <div className='w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center'>
                    <feature.icon className='h-4 w-4 text-indigo-400' />
                  </div>
                  <div>
                    <h3 className='text-sm font-medium text-white'>
                      {feature.title}
                    </h3>
                    <p className='text-xs text-slate-400'>{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className='mt-8 md:mt-0 text-slate-400 text-sm flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 rounded-full bg-green-500'></div>
            <span>{t("auth.sys")}</span>
          </div>
          <div>{currentTime}</div>
        </motion.div>
      </div>

      <div className='w-full md:w-1/2 bg-white flex items-center justify-center p-4'>
        <div className='w-full max-w-md'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <div className='text-center mb-8'>
              <h2 className='text-xl font-bold text-slate-900'>
                {t("auth.admin")}
              </h2>
              <p className='text-slate-500 mt-1'>{t("auth.pls")}</p>
            </div>

            <Card className='border-0 shadow-xl overflow-hidden'>
              <div className='h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
              <CardContent className='p-0'>
                <Tabs defaultValue='signin' className='w-full'>
                  <div className='border-b'>
                    <TabsList className='w-full rounded-none bg-transparent h-14'>
                      <TabsTrigger
                        value='signin'
                        className='flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none'>
                        <LockKeyhole className='mr-2 h-4 w-4' />
                        Administrator
                      </TabsTrigger>
                      <TabsTrigger
                        value='signup'
                        className='flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none'>
                        <ShieldCheck className='mr-2 h-4 w-4' />
                        Request Access
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className='px-8 py-6'>
                    <TabsContent value='signin' className='mt-0 space-y-4'>
                      <Signin />

                      <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                          <div className='w-full border-t border-slate-200'></div>
                        </div>
                        <div className='relative flex justify-center text-xs uppercase'>
                          <span className='bg-white rounded-lg px-2 text-slate-500'>
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <button className='flex items-center justify-center space-x-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors'>
                          <svg className='w-5 h-5' viewBox='0 0 24 24'>
                            <path
                              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                              fill='#4285F4'
                            />
                            <path
                              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                              fill='#34A853'
                            />
                            <path
                              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                              fill='#FBBC05'
                            />
                            <path
                              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                              fill='#EA4335'
                            />
                          </svg>
                          <span className='text-sm text-slate-600'>
                            Google SSO
                          </span>
                        </button>
                        <button className='flex items-center justify-center space-x-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors'>
                          <svg
                            className='w-5 h-5'
                            fill='currentColor'
                            viewBox='0 0 24 24'>
                            <path d='M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.55-1.29-1.28-1.65-1.28-1.65-1.03-.7.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.76.4-1.27.73-1.57-2.42-.28-4.97-1.21-4.97-5.38 0-1.19.42-2.16 1.13-2.92-.11-.28-.49-1.4.11-2.91 0 0 .93-.3 3.05 1.13.88-.25 1.83-.36 2.77-.37.94 0 1.89.13 2.77.36 2.12-1.43 3.05-1.13 3.05-1.13.6 1.51.22 2.64.1 2.91.7.76 1.13 1.73 1.13 2.92 0 4.17-2.55 5.1-4.98 5.37.39.34.74 1.01.74 2.02v3c0 .29.19.63.74.53A11 11 0 0012 1.27' />
                          </svg>
                          <span className='text-sm text-slate-600'>GitHub</span>
                        </button>
                      </div>

                      <div className='mt-6 text-center'>
                        <p className='text-sm text-slate-500'>
                          Need assistance?{" "}
                          <span className='text-indigo-600 font-medium hover:underline cursor-pointer'>
                            Contact IT Support
                          </span>
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value='signup' className='mt-0'>
                      <div className='py-6 text-center'>
                        <div className='w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4'>
                          <ShieldCheck className='h-8 w-8 text-indigo-500' />
                        </div>
                        <h3 className='text-lg font-medium text-slate-900 mb-2'>
                          Admin Registration
                        </h3>
                        <p className='text-sm text-slate-500 mb-6'>
                          New administrator accounts require approval from a
                          system administrator.
                        </p>

                        <div className='space-y-4'>
                          <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                              <label className='text-sm font-medium text-slate-700'>
                                First Name
                              </label>
                              <input className='w-full p-2 border border-slate-300 rounded-lg text-sm' />
                            </div>
                            <div className='space-y-2'>
                              <label className='text-sm font-medium text-slate-700'>
                                Last Name
                              </label>
                              <input className='w-full p-2 border border-slate-300 rounded-lg text-sm' />
                            </div>
                          </div>

                          <div className='space-y-2'>
                            <label className='text-sm font-medium text-slate-700'>
                              Work Email
                            </label>
                            <input
                              className='w-full p-2 border border-slate-300 rounded-lg text-sm'
                              type='email'
                            />
                          </div>

                          <div className='space-y-2'>
                            <label className='text-sm font-medium text-slate-700'>
                              Department
                            </label>
                            <select className='w-full p-2 border border-slate-300 rounded-lg text-sm'>
                              <option>IT Operations</option>
                              <option>Security</option>
                              <option>Development</option>
                              <option>Management</option>
                              <option>Other</option>
                            </select>
                          </div>

                          <button className='w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors'>
                            Submit Request
                          </button>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className='mt-8 text-center'>
            <div className='text-xs text-slate-500 space-x-4'>
              <span className='hover:text-slate-700 cursor-pointer'>
                Privacy Policy
              </span>
              <span className='hover:text-slate-700 cursor-pointer'>
                Terms of Service
              </span>
              <span className='hover:text-slate-700 cursor-pointer'>
                Help Center
              </span>
            </div>
            <div className='mt-2 text-xs text-slate-400'>
              © {new Date().getFullYear()} Dev Suon Phanun. All rights reserved.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

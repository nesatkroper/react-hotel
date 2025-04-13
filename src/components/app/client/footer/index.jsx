import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GitBranchPlus, LinkIcon, X } from "lucide-react";

const FooterClient = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Card className='rounded-none mt-10 py-4 w-full bottom-0 z-50'>
        <CardContent className='py-0 md:container md:mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='text-sm text-gray-600 dark:text-gray-300'>
            <p>© {year} MyAppName. All rights reserved.</p>
          </div>
          <div className='flex gap-4 text-gray-600 dark:text-gray-300'>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
              <X size={20} />
            </a>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
              <GitBranchPlus size={20} />
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
              <LinkIcon size={20} />
            </a>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
};

export default FooterClient;

import React from "react";
import Logo from "@/assets/images/logo1.png";
import LanguageToggle from "../lang/lang-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "../theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ReceiptIcon, User } from "lucide-react";

const HeaderClient = () => {
  return (
    <header className='sticky top-0 z-50'>
      <Card className='rounded-none py-2 mb-6 w-full '>
        <CardContent className='py-0 md:container md:mx-auto px-4 flex justify-between'>
          <img src={Logo} className='h-8' alt='logo' />
          <div className='flex gap-2'>
            <ModeToggle />
            <LanguageToggle />

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ReceiptIcon />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className='text-red-500'>
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </header>
  );
};

export default HeaderClient;

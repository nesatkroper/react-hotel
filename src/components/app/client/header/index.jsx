import React from "react";
import Logo from "@/assets/images/logo.png";
import LanguageToggle from "../../lang/lang-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "../../theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, LogOut, ReceiptIcon, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import "@/assets/css/client.css";

const HeaderClient = () => {
  const isMobile = useIsMobile();
  return (
    <header className='sticky top-0 z-50'>
      <Card className='rounded-none py-2 mb-6 w-full '>
        <CardContent className='py-0 md:container md:mx-auto px-4 flex justify-between'>
          <a href='/home' className='flex items-center gap-2'>
            <img src={Logo} className='h-8 rounded-lg' alt='logo' />
            <p className='font-bold text-md'>Nun Hotel</p>
          </a>
          <div className='flex gap-3'>
            <ModeToggle />
            <LanguageToggle />
            {isMobile ? (
              <Sheet>
                <SheetTrigger>
                  <AlignJustify className='ms-1 cursor-pointer' />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className='flex flex-row gap-3 items-center'>
                    <Avatar>
                      <AvatarImage src='https://github.com/shadcn.png' />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <SheetTitle className='text-md m-0'>Suon Phanun</SheetTitle>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            ) : (
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
            )}
          </div>
        </CardContent>
      </Card>
    </header>
  );
};

export default HeaderClient;

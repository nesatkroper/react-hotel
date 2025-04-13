import React from "react";
import LanguageToggle from "../../lang/lang-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../../theme/mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const UserNav = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col w-32 p-0 mx-2'>
        <Button variant='ghost' className='flex justify-between'>
          Profile
        </Button>
        <Button variant='ghost' className='flex justify-between'>
          Billing
        </Button>
        <Button variant='ghost' className='flex justify-between'>
          Theme
          <ModeToggle />
        </Button>
        <Button variant='ghost' className='flex justify-between'>
          Language
          <LanguageToggle />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserNav;

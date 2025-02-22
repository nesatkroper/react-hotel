import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropTypes } from "prop-types";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import axiosAuth from "@/providers/axios-auth";
import { useDispatch } from "react-redux";
import { clearAuthData } from "@/app/reducer/role-slice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const image =
  "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/469352317_1283607016000100_1286030378446066601_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_aid=0&_nc_eui2=AeG79Rk1zvUWghTCrIv12dogzDtT2mYYYOfMO1PaZhhg55m2Jw2hyLLaQl2d54ScWrnwyYcYK1ZJTNwaDUc489nj&_nc_ohc=GOXytN4QOAgQ7kNvgE8InN7&_nc_oc=Adh2jRDlY2hr1bmegpdGTseNgeb6vBOXpbwFE7TVy74fhGCuJUzlyrW_aC8_4gt9lv0&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=ALZdhwE0TEIpSPD3FpIoTYy&oh=00_AYClzxVIcga6N7ULINVuFzXSuRtxDufpOwFdrFxE_kPBkw&oe=67B69B27";

export function NavUser({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMobile } = useSidebar();

  const handleLogout = async () => {
    try {
      Cookies.remove("token");
      Cookies.remove("user-info");
      navigate("/auth");
      window.location.reload();
      await axiosAuth.post("/logout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={image} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={image} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

NavUser.propTypes = {
  user: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

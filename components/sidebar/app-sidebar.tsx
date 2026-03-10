"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Settings, LogOut, RefreshCw } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { signOutAndClear } from "@/lib/sign-out";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: RefreshCw, label: "Auto Conversion", href: "/dashboard/auto-conversion" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const clerk = useClerk();
  const email = user?.emailAddresses[0]?.emailAddress;
  const displayName = email
    ? email.split("@")[0].charAt(0) + email.split("@")[0].slice(1)
    : "User";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <span className="font-bold text-sm">CR</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-base">ComplyRemit</span>
                  <span className="truncate text-xs text-sidebar-foreground/60">Business Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className={(item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href)) ? "bg-primary text-primary-foreground shadow-md hover:bg-primary hover:text-primary-foreground" : ""}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-default hover:bg-transparent active:bg-transparent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="font-semibold text-xs">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{displayName}</span>
                <span className="truncate text-xs text-sidebar-foreground/50">{email}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOutAndClear(clerk)}
              tooltip="Sign Out"
              className="text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

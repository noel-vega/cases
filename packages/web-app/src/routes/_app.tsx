import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
export const Route = createFileRoute("/_app")({
  component: Layout,
});

const navLinks = [
  {
    to: "/clients",
    label: "Clients",
  },
  {
    to: "/matters",
    label: "Matters",
  },
  {
    to: "/tasks",
    label: "Tasks",
  },
] as const;

function Layout() {
  const { pathname } = useLocation();
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState<null | number>(
    null
  );
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState<null | number>(null);
  const tabsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    function setTabPosition() {
      const index = navLinks.findIndex((link) => pathname.startsWith(link.to));
      const currentTab = tabsRef.current[index];
      setTabUnderlineLeft(currentTab?.offsetLeft);
      setTabUnderlineWidth(currentTab?.clientWidth);
    }
    setTabPosition();

    window.addEventListener("resize", setTabPosition);
    return () => window.removeEventListener("resize", setTabPosition);
  }, [pathname]);

  return (
    <>
      <header className="border-b bg-white px-6">
        <div className="flex justify-between items-center py-3">
          <div>Firm name here</div>
          <div>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>NV</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <ul className="flex  relative text-gray-700">
          {navLinks.map((link, index) => {
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  ref={(el) => (tabsRef.current[index] = el!)}
                  // onClick={() => setActiveTabIndex(index)}
                  className={cn("px-4 py-2.5 block text-gray-500 ", {
                    "text-black": pathname.startsWith(link.to),
                  })}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}

          <span
            style={{
              left: tabUnderlineLeft ?? "",
              width: tabUnderlineWidth ?? "",
            }}
            className="absolute bottom-0 block h-[2px] bg-black transition-all duration-300 rounded-lg"
          />
        </ul>
      </header>
      <Outlet />
    </>
  );
}

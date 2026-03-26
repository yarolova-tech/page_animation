"use client";
import React, { useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const LightDark = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const iconClass = (value: "light" | "dark" | "system") =>
    mounted && theme === value ? "text-primary" : "text-foreground";

  return (
    <div className="fixed  -right-2 p-2 border-2 border-card rounded-l-2xl top-[50%] transform -translate-y-[50%] z-50 flex items-center flex-col gap-4 bg-background">
      <div onClick={() => setTheme("light")}>
        <Sun className={iconClass("light")} />
      </div>
      <div onClick={() => setTheme("dark")}>
        <Moon className={iconClass("dark")} />
      </div>
      <div onClick={() => setTheme("system")}>
        <Laptop className={iconClass("system")} />
      </div>
    </div>
  );
};

export default LightDark;

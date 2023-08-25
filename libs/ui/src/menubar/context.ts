import { createContext } from "@rafty/utils";

export const [MenuBarProvider, useMenuBarContext] =
  createContext<MenuBarContext>({
    name: "MenuBarContext",
    hookName: "useMenuBarContext",
    providerName: "<MenuBar />",
  });

export interface MenuBarContext {
  size: "sm" | "md" | "lg";
  isBarebone: boolean;
}
import { createContext } from "react";
import type { ThemeContextValue } from "./theme-context";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

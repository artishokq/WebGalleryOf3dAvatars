import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/shared/theme";
import { I18nProvider } from "@/shared/i18n";
import { router } from "./router";

export function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <RouterProvider router={router} />
      </I18nProvider>
    </ThemeProvider>
  );
}

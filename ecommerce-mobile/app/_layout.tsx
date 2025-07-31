import "@/global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

// This is the root layout component for the application
// It wraps the entire application in the Gluestack UI provider to apply global styles and themes
export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <Stack />
    </GluestackUIProvider>
  );
}

import "@/global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new QueryClient instance to manage server state
// This client will be used to fetch and cache data from the server
const queryClient = new QueryClient();

// This is the root layout component for the application
// It wraps the entire application in the Gluestack UI provider to apply global styles and themes
// It also sets up the React Query client to manage server state
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Shop" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

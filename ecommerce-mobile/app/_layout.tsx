import "@/global.css";
import { Link, Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, User } from "lucide-react-native";
import { Pressable } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";

// Create a new QueryClient instance to manage server state
// This client will be used to fetch and cache data from the server
const queryClient = new QueryClient();

// This is the root layout component for the application
// It wraps the entire application in the Gluestack UI provider to apply global styles and themes
// It also sets up the React Query client to manage server state
export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerRight: () => (
              <Link href={"/cart"} asChild>
                <Pressable className="flex-row gap-2 mr-2">
                  <Icon as={ShoppingCart} />
                  <Text>{cartItemsNum}</Text>
                </Pressable>
              </Link>
            ),
            headerLeft: () => (
              <Link href={"/login"} asChild>
                <Pressable className="flex-row gap-2 ml-2">
                  <Icon as={User} />
                </Pressable>
              </Link>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "Shop" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

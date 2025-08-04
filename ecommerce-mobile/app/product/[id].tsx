import { useLocalSearchParams, Stack } from "expo-router";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/products";
import { ActivityIndicator } from "react-native";
import { useCart } from "@/store/cartStore";

// This screen displays the details of a product based on the product ID passed in the URL
// It retrieves the product ID from the URL parameters and finds the corresponding product in the products list
// If the product is not found, it displays a "Product not found" message

export default function ProductDetailsScreen() {
  // Get the product ID from the URL parameters
  const { id } = useLocalSearchParams<{ id: string }>();

  // Use the Zustand store to access the addProduct function
  const addProduct = useCart((state) => state.addProduct);

  // Fetch the product details using React Query
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProductById(Number(id)),
  });

  const addToCart = () => {
    addProduct(product);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Product not found</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  // Display product details
  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen name="product/[id]" options={{ title: product.name }} />
      <Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">
        <Image
          source={{ uri: product.image }}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
          alt={`${product.name} image`}
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            $ {product.price.toFixed(2)}
          </Heading>
          <Text size="sm">{product.description}</Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button
            onPress={addToCart}
            className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
          >
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

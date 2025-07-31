import { useLocalSearchParams } from "expo-router";
import products from "@/assets/products.json";

import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";

// This screen displays the details of a product based on the product ID passed in the URL
// It retrieves the product ID from the URL parameters and finds the corresponding product in the products list
// If the product is not found, it displays a "Product not found" message

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Validate that id is a number
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <Text>Product not found</Text>;
  }

  // Display product details
  return (
    <Card className="p-5 rounded-lg max-w-[560px] flex-1">
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
          ${product.price.toFixed(2)}
        </Heading>
        <Text size="sm">{product.description}</Text>
      </VStack>
      <Box className="flex-col sm:flex-row">
        <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
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
  );
}

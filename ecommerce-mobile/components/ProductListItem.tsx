import { Link } from "expo-router";
import { Pressable } from "react-native";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";

// This component displays a product item in a list format
// It includes the product image, name, price, description, and buttons for adding to cart
// The product details are passed as props to this component
// When the product item is pressed, it navigates to the product details screen using the product

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

// Props interface defines the expected structure of the product prop
type Props = {
  product: Product;
};

// ProductListItem component displays a single product item
// It uses the Link component to navigate to the product details screen when pressed
export default function ProductListItem({ product }: Props) {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="p-5 rounded-lg flex-1">
          <Image
            source={{ uri: product.image }}
            className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
            alt={`${product.name} image`}
            resizeMode="contain"
          />
          <Text className="text-sm font-normal mb-2 text-typography-700">
            {product.name}
          </Text>
          <Heading size="md" className="mb-4">
            ${product.price.toFixed(2)}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}

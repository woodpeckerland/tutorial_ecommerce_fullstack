import { HStack } from "@/components/ui/hstack";
import { useCart } from "@/store/cartStore";
import { Text, FlatList } from "react-native";

export default function CartScreen() {
  const items = useCart((state) => state.items);

  console.log(items);

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <HStack>
          <Text>{item.product.name}</Text>
          <Text>{item.quantity}</Text>
        </HStack>
      )}
    />
  );
}

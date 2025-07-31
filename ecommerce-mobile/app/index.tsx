import { FlatList } from "react-native";
import products from "../assets/products.json";
import ProductListItem from "../components/ProductListItem";

// This is the main screen of the application
// It displays a list of products using the ProductListItem component
// The products (dummy data) are fetched from a local JSON file and displayed in a grid format
export default function HomeScreen() {
  return (
    <FlatList
      data={products}
      numColumns={2}
      contentContainerClassName="gap-2"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}

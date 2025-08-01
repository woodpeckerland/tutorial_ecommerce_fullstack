import { Text, ActivityIndicator, FlatList } from "react-native";
import ProductListItem from "../components/ProductListItem";
import { listProducts } from "@/api/products";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { useQuery } from "@tanstack/react-query";

// This is the home screen component that displays a list of products
// It uses React Query to fetch products from the API and displays them in a grid layout
export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  // Get the number of columns based on the screen size
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  }) as number;

  // If the data is still loading, show a loading indicator
  if (isLoading) {
    return <ActivityIndicator />;
  }

  // If there was an error fetching the data, show an error message
  if (error) {
    return <Text>Error loading products</Text>;
  }

  return (
    <FlatList
      key={numColumns} // Use numColumns as key to re-render when it changes
      data={data}
      numColumns={numColumns} // Set number of columns for grid layout
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}

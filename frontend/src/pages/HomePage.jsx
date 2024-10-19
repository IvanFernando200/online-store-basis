import React, { useEffect } from "react";
import { useProductStore } from "../store/product";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductCard from "../components/HomePage/ProductCard";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          bgGradient="linear(to-r, #6B46C1, #D53F8C)"
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products ⭐
        </Text>
        {products.length === 0 ? (
          <Text fontSize="xl" textAlign={"center"} fontWeight={"bold"}>
            No Products found 🤕 .{""}
            <Link to="/create">
              <Text
                as="span"
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Add Product
              </Text>
            </Link>
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;

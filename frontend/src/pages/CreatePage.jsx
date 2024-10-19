import {
  Container,
  Heading,
  Box,
  useColorModeValue,
  VStack,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const { addProduct } = useProductStore();
  const toast = useToast();

  const handleAddProduct = async () => {
    const { success, message } = await addProduct(newProduct);
    if (success) {
      toast({
        title: "Product added successfully",
        description: message,
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
    setNewProduct({
      name: "",
      price: "",
      description: "",
      image: "",
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius={"lg"}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              type="url"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Textarea
              placeholder="Product Description"
              resize={"none"}
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <Button w={"full"} colorScheme="blue" onClick={handleAddProduct}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;

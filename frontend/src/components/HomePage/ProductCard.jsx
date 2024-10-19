import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const bgColor = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toast({
        title: "Product deleted successfully",
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
        duration: 3000,
      });
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleUpdate = () => {
    onOpen();
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      updatedProduct._id,
      updatedProduct
    );
    if (success) {
      toast({
        title: "Product updated successfully",
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
        duration: 3000,
      });
    }
    onClose();
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s ease"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit={"cover"}
        objectPosition={"center"}
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor}>
          $ {product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<FaRegEdit />}
            colorScheme="blue"
            onClick={() => handleUpdate()}
          />
          <IconButton
            icon={<MdDelete />}
            colorScheme="red"
            onClick={() => handleDelete(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                value={updatedProduct.name}
                placeholder="Product Name"
                name="name"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                value={updatedProduct.price}
                placeholder="Product Price"
                name="price"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                value={updatedProduct.image}
                placeholder="Product Image"
                name="image"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
              <Textarea
                value={updatedProduct.description}
                placeholder="Product Description"
                name="description"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;

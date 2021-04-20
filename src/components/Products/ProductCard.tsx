import {
  Box,
  Image,
  Text,
  Button,
  HTMLChakraProps,
  chakra,
  Icon,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import { motion, HTMLMotionProps } from "framer-motion";

import { RiHeart2Line } from "react-icons/ri";

import { formatPrice } from "../../util/formatPrice";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import { FaunaProduct } from "../../@Types";
import { useProfile } from "../../context/ProfileContext";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

export const ProductCard = ({
  id,
  category,
  image,
  name,
  price,
}: FaunaProduct): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCar } = useCart();
  const { addToWishlist } = useProfile().wishlist;
  const toast = useToast();

  async function handleAddButton() {
    setIsLoading(true);
    try {
      await addToCar({
        category,
        id,
        image,
        name,
        price,
      });
      setIsLoading(false);

      toast({
        title: "Cart",
        description: "successful add to cart",
        duration: 3000,
        isClosable: true,
        status: "success",
      });

    } catch (err) {
      if (err.message === "its already on the card") {
        toast({
          title: "Cart",
          description: err.message,
          duration: 1500,
          isClosable: true,
          status: "info",
        });
        setIsLoading(false)
      }
    }

  }

  function handleAddToWishlist() {
    addToWishlist({
      category,
      id,
      image,
      name,
      price,
    });
  }

  return (
    <MotionBox
      display="flex"
      position="relative"
      color="gray.700"
      padding="2"
      borderRadius="md"
      flexDirection="column"
      backgroundColor="white"
      whileHover={{
        y: -4,
      }}
      cursor="pointer"
    >
      <Image src={image} alt="product_image" />
      <Box flex={1} padding="2">
        <Text fontSize="sm">{category}</Text>
        <Text fontWeight="bold" fontSize="sm">
          {name}
        </Text>
        <Text fontWeight="semibold" color="blue.500" fontSize="sm">
          {formatPrice(price.value)}
        </Text>
      </Box>
      <Button
        isLoading={isLoading}
        onClick={handleAddButton}
        size="sm"
        w="100%"
        colorScheme="pink"
      >
        Add to your Cart
      </Button>
      <Tooltip label="Wishlist" backgroundColor="gray.600" color="white">
        <Box
          position="absolute"
          top="1"
          right="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="1"
          backgroundColor="gray.200"
          borderRadius="full"
          cursor="pointer"
          onClick={handleAddToWishlist}
          _hover={{
            color: "pink.500",
          }}
        >
          <Icon as={RiHeart2Line} />
        </Box>
      </Tooltip>
    </MotionBox>
  );
};

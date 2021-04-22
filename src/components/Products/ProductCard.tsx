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
import { useState } from "react";
import { Product } from "../../@Types";
import { useProfile } from "../../context/ProfileContext";
import { useCartContext } from "../../context/CartContext";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

export const ProductCard = ({
  id,
  category,
  images,
  variants,
  name,
  price,
}: Product): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart, cartState } = useCartContext();
  const { addToWishlist } = useProfile().wishlist;
  const toast = useToast();

  async function handleAddButton() {
    const result = await addToCart({
      id,
      category,
      images,
      variants,
      name,
      price,
    });
  }

  function handleAddToWishlist() {
    const rodrigo = " rodrigo";
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
      <Image src={images[0].url} alt="product_image" />
      <Box flex={1} padding="2">
        <Text fontSize="sm">{category}</Text>
        <Text fontWeight="bold" fontSize="sm">
          {name}
        </Text>
        <Text fontWeight="semibold" color="blue.500" fontSize="sm">
          {formatPrice(price)}
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

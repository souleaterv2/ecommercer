import { motion, HTMLMotionProps } from "framer-motion";
import { HTMLChakraProps, chakra } from "@chakra-ui/react";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

export  const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);


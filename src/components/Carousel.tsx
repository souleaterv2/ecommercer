import { Grid, Box, Text, Image, Center } from "@chakra-ui/react";

import SwiperCore, { Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselItem } from "../@Types";

SwiperCore.use([Navigation, Pagination]);

interface CarouselProps {
  content: CarouselItem[];
}
export const Carousel = ({ content }: CarouselProps) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {content.map((item) => (
        <SwiperSlide key={item.id}>
          <Box padding="6">
            <Grid
              borderRadius="md"
              padding="2"
              color="gray.700"
              backgroundColor="white"
              gridTemplateColumns={{
                base: "1fr",
                md: "1fr 1fr",
              }}
              gridTemplateRows={{
                base: "1fr 1fr",
                md: "1fr",
              }}
            >
              <Center textAlign="center" flexDirection="column">
                <Text
                  fontSize={{
                    base: "2xl",
                    md: "3xl",
                  }}
                >
                  {item.text.paragraph1}
                </Text>
                <Text
                  fontWeight="semibold"
                  fontSize={{
                    base: "3xl",
                    md: "4xl",
                  }}
                >
                  {item.text.paragraph2}
                </Text>
                <Text
                  fontSize={{
                    base: "2xl",
                    md: "3xl",
                  }}
                >
                  {item.text.paragraph3}
                </Text>
              </Center>
              <Center>
                <Image src={item.image} alt="slide_image" objectFit="contain" />
              </Center>
            </Grid>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

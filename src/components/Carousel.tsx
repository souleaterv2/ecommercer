import { Grid, Box, Text, Image, Center } from "@chakra-ui/react";

import SwiperCore, { Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselItem } from "../@Types";

SwiperCore.use([Navigation, Pagination]);

interface CarouselProps {
  content: CarouselItem[];
}
export const Carousel = ({ content }: CarouselProps): JSX.Element => {
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
                {item.text.map((text, index) => (
                  <Text
                    key={index}
                    fontSize={{
                      base: "2xl",
                      md: "3xl",
                    }}
                  >
                    {text}
                  </Text>
                ))}
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

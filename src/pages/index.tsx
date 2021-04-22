import Head from "next/head";
import { GetStaticProps } from "next";

import { Heading, Divider, Box, SimpleGrid } from "@chakra-ui/react";
import { db } from "../firebase";

import { Carousel } from "../components/Carousel";
import { Container } from "../components/Container";
import { Products } from "../components/Products";

import { Product, CarouselItem } from "../@Types";

interface HomeProps {
  carouselData: CarouselItem[];
  products: Product[];
}

export default function Home({
  carouselData,
  products,
}: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>StylesUP | Home</title>
      </Head>
      <Container>
        <Carousel content={carouselData} />
        <Box padding="6">
          <Heading marginY="4" textAlign="left">
            Theding products
          </Heading>
          <Divider marginBottom="6" />
          <SimpleGrid spacing="2" minChildWidth={200}>
            <Products content={products} />
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const carouselData = await db.getCollection<CarouselItem>("carousel");
  const products = await db.getCollection<Product>("products");

  return {
    props: {
      carouselData,
      products,
    },
  };
};

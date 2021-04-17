import Head from "next/head";
import { GetStaticProps } from "next";

import { query as q } from "faunadb";

import { Heading, Divider, Box, SimpleGrid } from "@chakra-ui/react";

import {
  CarouselItem,
  FaunaCollections,
  FaunaGetCollection,
  FaunaProduct,
} from "../@Types";

import { Carousel } from "../components/Carousel";
import { Container } from "../components/Container";
import { jsonApi } from "../services/api";
import { fauncaClient } from "../services/fauna";
import { Products } from "../components/Products";

interface HomeProps {
  carouselData: CarouselItem[];
  products: FaunaProduct[];
}

export default function Home({ carouselData, products }: HomeProps) {
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
  const carouselData = (await jsonApi.get("/carousel")).data;

  const productsData = await fauncaClient.query<
    FaunaGetCollection<FaunaProduct>
  >(
    q.Map(
      q.Paginate(q.Documents(q.Collection(FaunaCollections.products))),
      q.Lambda((doc) => q.Get(doc))
    )
  );

  const products = productsData.data.map((doc) => ({
    id: doc.ref.id,
    ...doc.data,
  }));

  return {
    props: {
      carouselData,
      products,
    },
  };
};

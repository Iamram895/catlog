import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { request } from "graphql-request";
import { getQuery } from "./constants";
import { Box, Container, Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Image } from "@chakra-ui/react";


const Home: NextPage = ({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Flex wrap="wrap" gap="2">
      {result.map((item: any) => {
        return (
          <>
            <Box pl="4" mt="4">
              <Container py="20px" border="2px">
                <Link href={`/track/${item.id}`}>
                  <Image src={item.thumbnail} alt="" width="200px" />
                </Link>

                <Text key={item.id} fontSize="20px">
                  {item.title}
                </Text>

                <Box>
                  <Flex mt="6">
                    <HStack>
                      <Image src={item.author.photo} alt="pic" width="30px" />

                      <Text color="red">{item.author.name}</Text>
                    </HStack>
                  </Flex>
                  <Box pl="40px">
                    <Flex>
                      <HStack spacing="2px">
                        <h1>{item.modulesCount},</h1>
                        <h1>{item.length} m</h1>
                      </HStack>
                    </Flex>
                  </Box>
                </Box>
              </Container>
            </Box>
          </>
        );
      })}
    </Flex>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  //the first argument is the URL of our GraphQL server
  const res = await request("http://localhost:4000/graphql", getQuery);
  //console.log(res);
  const result = res.tracksForHome;
  //console.log(result);
  return {
    props: {
      result,
    }, // will be passed to the page component as props
  };
};

export default Home;

// import type {
//   NextPage,
//   GetServerSideProps,
//   InferGetServerSidePropsType,
// } from "next";
// import request from "graphql-request";
// import { GET_TRACK } from "../constants";
// import { Box, Container, Flex, HStack } from "@chakra-ui/react";

// import React from "react";

// const track: NextPage = ({
//   result,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
//   return (
//     <Box>
//       {result.map((item: any) => {
//         return <h1 key={item.id}>{item.id}</h1>;
//       })}
//     </Box>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   //const id = query.id;
//   const response = await request("http://localhost:4000/graphql", GET_TRACK, {
//     trackId: 'c_1'
//   });
//   console.log(response);
//   const result = response.GetTrack;
//   //   console.log(result);
//   return {
//     props: {
//       result,
//     },
//   };
// };

// export default track;
import { GraphQLClient, gql } from "graphql-request";
import { GET_TRACK } from "../constants";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";



const home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  //console.log({ data });

  return (
    <Container>
      <Image
        src={data.track.thumbnail}
        alt=""
        width="550px"
        alignItems="center"
        pt="10px"
        ml="30px"
      />

      <Grid bg="white" w="600px" ml="0px">
        <GridItem mt="30px" border="2px" textAlign="center">
          <Box fontSize="30px" fontWeight="bold" ml="20px" mt="30px" w="550px">
            {data.track.title}
          </Box>
          <Flex>
            <Box mt="50px">
              <Text fontSize="20px" fontWeight="bold" w="200px">
                Tack Details
              </Text>
              <Text>{data.track.numberOfViews} views</Text>
              <Text pl="20px">{data.track.modulesCount} modules</Text>
              <Text>{Math.round(data.track.length / 60)} m</Text>
            </Box>
            <Box mt="50px" ml="200px">
              <Text fontWeight="bold" fontSize="20px">
                Author
              </Text>
              <Text>{data.track.author.name}</Text>

              <Box mt="50px">
                <Text fontSize="20px" fontWeight="bold">
                  Module
                </Text>
                <Box w="300px">
                  {data.track.modules.map((item: any) => {
                    return (
                      <>
                        <HStack spacing="20px">
                          <Text key={item.id}>{item.title}</Text>
                          <Box mt="20px">
                            <Text>{Math.round(item.length / 60)}m</Text>
                          </Box>
                        </HStack>
                      </>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params.id);
  const id = params.id;

  const endpoint = "http://localhost:4000/graphql";

  const graphQLClient = new GraphQLClient(endpoint);

  const data = await graphQLClient.request(GET_TRACK, { trackId: id });
  //console.log(JSON.stringify(data, undefined, 2));
  return { props: { data } };
};
export default home;

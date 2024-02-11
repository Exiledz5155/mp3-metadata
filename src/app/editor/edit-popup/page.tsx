"use client";

import { Flex, Card, useColorModeValue, CardBody } from "@chakra-ui/react";
import { ImagForm } from "../../../components/ImagForm";
import { Edit } from "../../../components/Edit";

export default function editPopUp() {
  return (
    //glex outside is for the center
    // <Flex w={"200%"} justifyContent={"center"} alignItems={"center"}>
    //   <Card
    //     bg={useColorModeValue("FFFFFF", "gray.900")}
    //     padding={"2.5%"}
    //     borderRadius={"2.5%/6.25%"}
    //     w={"auto"}
    //     overflow={"hidden"}
    //   >
    //     {/* row flex */}
    //     <Flex flexDirection={"row"}>
    //       <ImagForm />
    //       <EditInput />
    //     </Flex>
    //   </Card>
    // </Flex>

    <Card
      bg={useColorModeValue("FFFFFF", "gray.900")}
      padding={"2.5%"}
      borderRadius={"2.5%/6.25%"}
      w={"auto"}
      overflow={"hidden"}
    >
      {/* row flex */}
      <CardBody>
        <ImagForm />
        <Edit />
      </CardBody>
    </Card>
  );
}

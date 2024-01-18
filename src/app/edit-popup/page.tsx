"use client";

import {
  Flex,
  Stack,
  Button,
  Card,
  useColorModeValue,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { UploadForm } from "../../components/UploadForm";
import { ImagForm } from "../../components/ImagForm";
import { EditInput } from "../../components/EditInput";

export default function editPopUp() {
  return (
    //glex outside is for the center
    <Flex w={"200%"} justifyContent={"center"} alignItems={"center"}>
      <Card
        bg={useColorModeValue("FFFFFF", "gray.900")}
        padding={"2.5%"}
        borderRadius={"2.5%/6.25%"}
        w={"50%"}
      >
        {/* row flex */}
        <Flex  flexDirection={"row"}>
          < ImagForm />
          < EditInput/>
        </Flex>
      </Card>
    </Flex>
  );
}

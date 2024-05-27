// components/Landing.js
"use client";

import { ArrowForwardIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
  Image,
  Flex,
  HStack,
  Icon,
  IconButton,
  useDisclosure,
  Square,
  keyframes,
  SimpleGrid,
  Card,
  ButtonGroup,
  CardBody,
  CardFooter,
  Divider,
  Circle,
  Avatar,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdMusicNote } from "react-icons/md";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import ContributorCard from "./ContributerCard";
import { Octokit } from "@octokit/rest";
import { useState, useEffect } from "react";

// const glow = keyframes`
//   0% {
//     box-shadow: 0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4;
//   }
//   50% {
//     box-shadow: 0 0 10px 2px #8795D5, 0 0 13px 3px #CF97F4;
//   }
//   100% {
//     box-shadow: 0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4;
//   }
// `;

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  stats: {
    totalCommits: number;
    totalInsertions: number;
    totalDeletions: number;
  };
  role: string;
  social: string;
}

const glow = keyframes`
  0% {
    box-shadow: 0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4;
  }
  25% {
    box-shadow: 0 0 9px 2.5px #8795D5, 0 0 13px 3.5px #CF97F4;
  }
  50% {
    box-shadow: 0 0 10px 3px #8795D5, 0 0 14px 4px #CF97F4;
  }
  75% {
    box-shadow: 0 0 9px 2.5px #8795D5, 0 0 13px 3.5px #CF97F4;
  }
  100% {
    box-shadow: 0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4;
  }
`;

const contributorRoles: Record<string, string> = {
  Exiledz5155: "Fullstack/Team Lead",
  ducttri: "Frontend",
  "marcus-gustafson": "Backend",
  nicholashinds: "Frontend",
  "Ethan-Harris07": "Frontend/UI Design",
  "Aidan-R-1032": "Frontend",
  AitanSingh: "Backend",
  CalvinDudd: "Backend",
  DanielTran24: "Frontend",
};

const contributorSocial: Record<string, string> = {
  Exiledz5155: "https://www.linkedin.com/in/dannybui51/",
  ducttri: "https://www.linkedin.com/in/ducttrinh/",
  "marcus-gustafson": "https://www.linkedin.com/in/marcus-gustafson/",
  nicholashinds: "https://www.linkedin.com/in/nicholashinds/",
  "Ethan-Harris07": "https://www.linkedin.com/in/ethan-harris-920b91271/",
  "Aidan-R-1032": "https://www.linkedin.com/in/aidan-ruiz-6ba9b0238/",
  AitanSingh: "https://www.linkedin.com/in/aitan-singh/",
  CalvinDudd: "https://www.linkedin.com/in/calvinduddingston/",
  DanielTran24: "https://www.linkedin.com/in/daniel-tran-54ab85216/",
};

export function Landing() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const exclude = process.env.NEXT_PUBLIC_EXCLUDE;

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch("/api/contributors");
        const data = await response.json();

        const contributorsData = data
          .filter((contributor: any) => contributor.login !== exclude)
          .map((contributor: any) => {
            const role = contributorRoles[contributor.login] || "Contributor";
            const social =
              contributorSocial[contributor.login] ||
              "https://www.linkedin.com/";

            return {
              login: contributor.login,
              name: contributor.name || contributor.login,
              avatar_url: contributor.avatar_url,
              html_url: contributor.html_url,
              contributions: contributor.contributions,
              stats: contributor.stats,
              role,
              social,
            };
          });

        // Sort contributors by contributions in descending order
        const sortedContributors = contributorsData.sort(
          (a, b) => b.contributions - a.contributions
        );

        setContributors(sortedContributors);
      } catch (error) {
        console.error("Failed to fetch contributors:", error);
      }
    };

    fetchContributors();
  }, [exclude]);

  return (
    <>
      <Box bg="brand.50" color="white" minH="100vh">
        {/* NAV BAR */}
        <Box bg="brand.50" px={600}>
          <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            px={10}
          >
            <Flex alignItems={"center"}>
              <Box
                bgGradient={"linear(to-r, linear.100, linear.200)"}
                borderRadius={5}
                p={1}
                h={10}
                w={10}
              >
                <Icon as={MdMusicNote} boxSize={8} color={"brand.100"} />
              </Box>
              <Link href={"/"}>
                <Text
                  fontSize="xl"
                  fontWeight="extrabold"
                  ml={3}
                  bgClip={"text"}
                  bgGradient={"linear(to-r, linear.100, linear.200)"}
                >
                  MP3 Metadata
                </Text>
              </Link>
            </Flex>
            <HStack
              spacing={4}
              alignItems={"center"}
              display={{ base: "none", md: "flex" }}
            >
              <Link href={"#"}>
                <Button
                  variant={"ghost"}
                  px={"45px"}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                  _hover={{
                    boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                    transition: "all 0.3s ease-in-out",
                  }}
                  bgClip={"text"}
                  bgGradient={"linear(to-r, linear.100, linear.200)"}
                  fontWeight={"bold"}
                  fontSize="xl"
                >
                  Home
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  variant={"ghost"}
                  px={"45px"}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                  _hover={{
                    boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                    transition: "all 0.3s ease-in-out",
                  }}
                  bgClip={"text"}
                  bgGradient={"linear(to-r, linear.100, linear.200)"}
                  fontWeight={"bold"}
                  fontSize="xl"
                >
                  About
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  variant={"ghost"}
                  px={"45px"}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                  _hover={{
                    boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                    transition: "all 0.3s ease-in-out",
                  }}
                  bgClip={"text"}
                  bgGradient={"linear(to-r, linear.100, linear.200)"}
                  fontWeight={"bold"}
                  fontSize="xl"
                >
                  Design
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  variant={"ghost"}
                  rounded={"md"}
                  px={"45px"}
                  w={"80px"}
                  textAlign={"center"}
                  _hover={{
                    boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                    transition: "all 0.3s ease-in-out",
                  }}
                  bgClip={"text"}
                  bgGradient={"linear(to-r, linear.100, linear.200)"}
                  fontWeight={"bold"}
                  fontSize="xl"
                >
                  Contact
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Box>
        {/* INTRO */}
        <Box maxW="container.lg" mx="auto">
          <Box pt={20}>
            <Heading
              size="4xl"
              bgGradient={"linear(to-r, linear.100, linear.200)"}
              bgClip="text"
              p={5}
              textAlign={"center"}
              mb={5}
            >
              MP3 Tagging made easy
            </Heading>
            <Text
              textAlign="center"
              fontSize="2xl"
              mb={10}
              mx={"auto"}
              maxW={"70%"}
            >
              MP3 Metadata is a powerful yet simple tool for tagging MP3 Files.
              Upload your files, edit, save and download.
            </Text>
            <HStack justifyContent={"center"} spacing={5}>
              <Button
                w={"150px"}
                h={"50px"}
                bgGradient={"linear(to-r, linear.100, linear.200)"}
                _hover={{
                  color: "white",
                  bg: "brand.300",
                  transition: "all 0.3s ease-in-out",
                }}
                color={"brand.100"}
              >
                Try the demo
              </Button>
              <Button
                w={"150px"}
                h={"50px"}
                bgGradient={"linear(to-r, linear.100, linear.200)"}
                _hover={{
                  color: "white",
                  bg: "brand.300",
                  transition: "all 0.3s ease-in-out",
                }}
                color={"brand.100"}
              >
                Features
              </Button>
            </HStack>
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"center"} py={"70px"}>
          <Image
            maxH={"700px"}
            src="https://i.imgur.com/amcyT9X.png"
            alt="app img"
            borderRadius={15}
            boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
            // animation={`${glow} 4s infinite alternate cubic-bezier(0.68, -0.55, 0.27, 1.55)`}
            animation={`${glow} 4s infinite alternate ease-in-out`}
          ></Image>
        </Box>
        <Box p={20}>
          <Box maxW="container.lg" mx="auto" pt={50}>
            <HStack alignItems={"center"} spacing={"50px"}>
              <Image
                maxH={"400px"}
                src="https://i.imgur.com/amcyT9X.png"
                alt="app img"
                borderRadius={15}
                boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                // animation={`${glow} 4s infinite alternate cubic-bezier(0.68, -0.55, 0.27, 1.55)`}
                animation={`${glow} 4s infinite alternate ease-in-out`}
              ></Image>
              <Box>
                <Heading size="xl" mb={5}>
                  Lorem ipsum dolor sit amet
                </Heading>
                <Text fontSize={"lg"} mb={5}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Link href="/*">
                  <HStack>
                    <Button
                      variant={"ghost"}
                      px={"45px"}
                      rounded={"md"}
                      textAlign={"center"}
                      w={"150px"}
                      _hover={{
                        boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                        transition: "all 0.3s ease-in-out",
                      }}
                      bgClip={"text"}
                      bgGradient={"linear(to-r, linear.100, linear.200)"}
                      fontWeight={"bold"}
                      fontSize="xl"
                      rightIcon={<ArrowForwardIcon color={"white"} />}
                    >
                      Try it now
                    </Button>
                  </HStack>
                </Link>
              </Box>
            </HStack>
          </Box>
          <Box maxW="container.lg" mx="auto" pt={150}>
            <HStack alignItems={"center"} spacing={"50px"}>
              <Box>
                <Heading size="xl" mb={5}>
                  Lorem ipsum dolor sit amet
                </Heading>
                <Text fontSize={"lg"} mb={5}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Link href="/*">
                  <HStack>
                    <Button
                      variant={"ghost"}
                      px={"45px"}
                      rounded={"md"}
                      textAlign={"center"}
                      w={"150px"}
                      _hover={{
                        boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                        transition: "all 0.3s ease-in-out",
                      }}
                      bgClip={"text"}
                      bgGradient={"linear(to-r, linear.100, linear.200)"}
                      fontWeight={"bold"}
                      fontSize="xl"
                      rightIcon={<ArrowForwardIcon color={"white"} />}
                    >
                      Try it now
                    </Button>
                  </HStack>
                </Link>
              </Box>
              <Image
                maxH={"400px"}
                src="https://i.imgur.com/amcyT9X.png"
                alt="app img"
                borderRadius={15}
                boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                // animation={`${glow} 4s infinite alternate cubic-bezier(0.68, -0.55, 0.27, 1.55)`}
                animation={`${glow} 4s infinite alternate ease-in-out`}
              ></Image>
            </HStack>
          </Box>
        </Box>
        <Box p={20}>
          <Box maxW="container.lg" mx="auto">
            <Heading size={"xl"} textAlign={"center"} mb={"50px"}>
              Contributors
            </Heading>
            <SimpleGrid columns={3} spacing={"40px"}>
              {contributors.map((contributor) => (
                <ContributorCard
                  key={contributor.login}
                  contributor={contributor}
                />
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

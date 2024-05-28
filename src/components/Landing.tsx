// components/Landing.js
"use client";

import {
  ArrowForwardIcon,
  DownloadIcon,
  EditIcon,
  InfoOutlineIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  Flex,
  HStack,
  Icon,
  useDisclosure,
  keyframes,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdMusicNote, MdOutlineFilePresent } from "react-icons/md";
import ContributorCard from "./ContributerCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoCloudUploadOutline } from "react-icons/io5";

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
  name: string;
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

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const technologies = [
  "Next.js",
  "React",
  "Chakra UI",
  "Azure Blob",
  "Azure MySQL",
  "Prisma",
  "Figma",
];

function Technology({ name }: { name: string }) {
  return (
    <Button
      h={"60px"}
      fontWeight={"bold"}
      fontSize={"2xl"}
      bg={"brand.200"}
      w={"100%"}
    >
      {name}
    </Button>
  );
}

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
                  px={"55px"}
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
                  Features
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
                  Team
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
          {/* About */}
          <Box maxW="container.lg" mx="auto" pt={50}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
              <Heading size={"2xl"} textAlign={"center"} mb={150}>
                Features
              </Heading>
            </motion.div>
            <HStack alignItems={"center"} spacing={"50px"}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
              >
                <Image
                  maxH={"1000px"}
                  src="https://i.imgur.com/amcyT9X.png"
                  alt="app img"
                  borderRadius={15}
                  boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                  animation={`${glow} 4s infinite alternate ease-in-out`}
                />
              </motion.div>
              <VStack alignItems={"left"}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.2,
                      },
                    },
                  }}
                >
                  <HStack alignItems="center" mb={5}>
                    <Icon as={MdOutlineFilePresent} boxSize={7} />
                    <Heading size="xl">Upload</Heading>
                  </HStack>
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.3,
                      },
                    },
                  }}
                >
                  <Text fontSize={"lg"} mb={5}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
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
                          boxShadow:
                            "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
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
                </motion.div>
              </VStack>
            </HStack>
          </Box>
          <Box maxW="container.lg" mx="auto" pt={150}>
            <HStack alignItems={"center"} spacing={"50px"}>
              <VStack alignItems={"left"}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.2,
                      },
                    },
                  }}
                >
                  <HStack alignItems="center" mb={5}>
                    <Icon as={Search2Icon} boxSize={6} />
                    <Heading size="xl">Search, Sort, Select</Heading>
                  </HStack>
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.3,
                      },
                    },
                  }}
                >
                  <Text fontSize={"lg"} mb={5}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
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
                          boxShadow:
                            "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
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
                </motion.div>
              </VStack>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
              >
                <Image
                  maxH={"1000px"}
                  src="https://i.imgur.com/amcyT9X.png"
                  alt="app img"
                  borderRadius={15}
                  boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                  animation={`${glow} 4s infinite alternate ease-in-out`}
                />
              </motion.div>
            </HStack>
          </Box>
          <Box maxW="container.lg" mx="auto" pt={150}>
            <HStack alignItems={"center"} spacing={"50px"}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
              >
                <Image
                  maxH={"1000px"}
                  src="https://i.imgur.com/amcyT9X.png"
                  alt="app img"
                  borderRadius={15}
                  boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                  animation={`${glow} 4s infinite alternate ease-in-out`}
                />
              </motion.div>
              <VStack alignItems={"left"}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.2,
                      },
                    },
                  }}
                >
                  <HStack alignItems="center" mb={5}>
                    <Icon as={InfoOutlineIcon} boxSize={6}></Icon>
                    <Heading size="xl">View Properties</Heading>
                  </HStack>
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.3,
                      },
                    },
                  }}
                >
                  <Text fontSize={"lg"} mb={5}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
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
                          boxShadow:
                            "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
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
                </motion.div>
              </VStack>
            </HStack>
          </Box>
          <Box maxW="container.lg" mx="auto" pt={150}>
            <HStack alignItems={"center"} spacing={"50px"}>
              <VStack alignItems={"left"}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.2,
                      },
                    },
                  }}
                >
                  <HStack alignItems="center" mb={5}>
                    <Icon as={EditIcon} boxSize={6}></Icon>
                    <Heading size="xl">Edit</Heading>
                  </HStack>
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.3,
                      },
                    },
                  }}
                >
                  <Text fontSize={"lg"} mb={5}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
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
                          boxShadow:
                            "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
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
                </motion.div>
              </VStack>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
              >
                <Image
                  maxH={"1000px"}
                  src="https://i.imgur.com/amcyT9X.png"
                  alt="app img"
                  borderRadius={15}
                  boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                  animation={`${glow} 4s infinite alternate ease-in-out`}
                />
              </motion.div>
            </HStack>
          </Box>
          <Box maxW="container.lg" mx="auto" pt={150}>
            <HStack alignItems={"center"} spacing={"50px"}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
              >
                <Image
                  maxH={"1000px"}
                  src="https://i.imgur.com/amcyT9X.png"
                  alt="app img"
                  borderRadius={15}
                  boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                  animation={`${glow} 4s infinite alternate ease-in-out`}
                />
              </motion.div>
              <VStack alignItems={"left"}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.2,
                      },
                    },
                  }}
                >
                  <HStack alignItems="center" mb={5}>
                    <Icon as={DownloadIcon} boxSize={6}></Icon>
                    <Heading size="xl">Download</Heading>
                  </HStack>
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.3,
                      },
                    },
                  }}
                >
                  <Text fontSize={"lg"} mb={5}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
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
                          boxShadow:
                            "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
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
                </motion.div>
              </VStack>
            </HStack>
          </Box>
        </Box>
        {/* Design */}
        <Box p={20}>
          <Box maxW="container.lg" mx="auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
              <Heading size={"xl"} textAlign={"center"} mb={"50px"}>
                Built with
              </Heading>
            </motion.div>
            <SimpleGrid columns={5} mb={20} spacing={"35px"}>
              {technologies.map((technology, index) => (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.2 + index * 0.05,
                      },
                    },
                  }}
                >
                  <Technology name={technology} />
                </motion.div>
              ))}
            </SimpleGrid>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
              <Box display="flex" justifyContent="center">
                <Link
                  href={
                    "https://docs.google.com/document/d/1bkD40GM4VroXaYY5UScWF6WjU58Q6NS_1-z4f8bT9y4/edit?usp=sharing"
                  }
                >
                  <Button
                    w={"200px"}
                    h={"50px"}
                    bgGradient={"linear(to-r, linear.100, linear.200)"}
                    _hover={{
                      color: "white",
                      bg: "brand.300",
                      transition: "all 0.3s ease-in-out",
                    }}
                    color={"brand.100"}
                  >
                    Design Doc
                  </Button>
                </Link>
              </Box>
            </motion.div>
          </Box>
        </Box>
        {/* Team */}
        <Box p={20}>
          <Box maxW="container.lg" mx="auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
              <Heading size={"xl"} textAlign={"center"} mb={"50px"}>
                Contributors
              </Heading>
            </motion.div>
            <SimpleGrid columns={3} spacing={"40px"}>
              {contributors.map((contributor, index) => (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInVariants,
                    visible: {
                      ...fadeInVariants.visible,
                      transition: {
                        ...fadeInVariants.visible.transition,
                        delay: 0.2 + index * 0.05,
                      },
                    },
                  }}
                >
                  <ContributorCard
                    key={contributor.login}
                    contributor={contributor}
                  />
                </motion.div>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

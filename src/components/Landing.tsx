"use client";

import {
  ArrowForwardIcon,
  ChevronUpIcon,
  DownloadIcon,
  EditIcon,
  HamburgerIcon,
  InfoOutlineIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  keyframes,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdMusicNote, MdOutlineFilePresent } from "react-icons/md";
import {
  Element,
  Link as ScrollLink,
  animateScroll as scroll,
} from "react-scroll";
import ContributorCard from "./ContributerCard";

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

const technologyLinks: Record<string, string> = {
  TypeScript: "https://www.typescriptlang.org/",
  "Next.js": "https://nextjs.org/",
  React: "https://reactjs.org/",
  "Chakra UI": "https://chakra-ui.com/",
  "Azure Blob": "https://azure.microsoft.com/en-us/services/storage/blobs/",
  "Azure Functions": "https://azure.microsoft.com/en-us/services/functions/",
  MySQL: "https://www.mysql.com/",
  Prisma: "https://www.prisma.io/",
  Figma: "https://www.figma.com/",
};

function Technology({ name, link }: { name: string; link: string }) {
  return (
    <Link href={link} target="_blank">
      <Button
        h={"60px"}
        fontWeight={"bold"}
        fontSize={"2xl"}
        bg={"brand.200"}
        w={"100%"}
        _hover={{
          bg: "brand.300",
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        transition="all 0.2s"
      >
        {name}
      </Button>
    </Link>
  );
}

export function Landing() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [showUpButton, setShowUpButton] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowUpButton(true);
      } else {
        setShowUpButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box bg="brand.50" color="white" minH="100vh">
      {/* NAV BAR */}
      <Box bg="brand.50" maxW="container.xl" mx="auto" px={5}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
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
                fontSize={{ base: "md", md: "xl", lg: "xl", xl: "xl" }}
                fontWeight="extrabold"
                ml={3}
                bgClip={"text"}
                bgGradient={"linear(to-r, linear.100, linear.200)"}
              >
                MP3 Metadata
              </Text>
            </Link>
          </Flex>
          <HStack display={{ base: "flex", md: "none" }}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="ghost"
                _hover={{
                  boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                  transition: "all 0.3s ease-in-out",
                }}
                _expanded={{ bg: "brand.200" }}
              />
              <MenuList bg="brand.200">
                <ScrollLink to="home" smooth={true} duration={1000}>
                  <MenuItem bg={"brand.200"} _hover={{ bg: "brand.400" }}>
                    Home
                  </MenuItem>
                </ScrollLink>
                <ScrollLink to="features" smooth={true} duration={1000}>
                  <MenuItem bg={"brand.200"} _hover={{ bg: "brand.400" }}>
                    Features
                  </MenuItem>
                </ScrollLink>
                <ScrollLink to="design" smooth={true} duration={1000}>
                  <MenuItem bg={"brand.200"} _hover={{ bg: "brand.400" }}>
                    Design
                  </MenuItem>
                </ScrollLink>
                <ScrollLink to="team" smooth={true} duration={1000}>
                  <MenuItem bg={"brand.200"} _hover={{ bg: "brand.400" }}>
                    Team
                  </MenuItem>
                </ScrollLink>
              </MenuList>
            </Menu>
          </HStack>
          <HStack
            spacing={4}
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <ScrollLink to="home" smooth={true} duration={1000}>
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
            </ScrollLink>
            <ScrollLink to="features" smooth={true} duration={1000}>
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
            </ScrollLink>
            <ScrollLink to="design" smooth={true} duration={1000}>
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
            </ScrollLink>
            <ScrollLink to="team" smooth={true} duration={1000}>
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
            </ScrollLink>
          </HStack>
        </Flex>
      </Box>
      {/* INTRO */}
      <Element name="home">
        <Box maxW="container.xl" mx="auto">
          <Box pt={10}>
            <Heading
              size={{ base: "xl", md: "2xl", lg: "3xl", xl: "4xl" }}
              bgGradient={"linear(to-r, linear.100, linear.200)"}
              bgClip="text"
              p={5}
              textAlign={"center"}
              mb={5}
              mt={{ base: "none", md: "70" }}
            >
              MP3 Tagging made easy
            </Heading>
            <Text
              textAlign="center"
              fontSize={{ base: "lg", md: "xl", lg: "xl", xl: "2xl" }}
              mb={10}
              mx={"auto"}
              maxW={"70%"}
            >
              MP3 Metadata is a powerful yet simple tool for tagging MP3 Files.
              Upload your files, edit, save and download.
            </Text>
            <HStack justifyContent={"center"} spacing={5}>
              <Link href="/editor/albums">
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
              </Link>
              <ScrollLink to="features" smooth={true} duration={1000}>
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
              </ScrollLink>
            </HStack>
          </Box>
        </Box>
      </Element>
      <Box
        display={"flex"}
        justifyContent={"center"}
        py={"70px"}
        px={"30px"}
        mx={"auto"}
        maxW={"container.xl"}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
        >
          <Image
            maxH={"700px"}
            src="https://i.imgur.com/amcyT9X.png"
            // src="https://i.imgur.com/DBlzU0T.png"
            alt="app img"
            borderRadius={15}
            boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
            // animation={`${glow} 4s infinite alternate cubic-bezier(0.68, -0.55, 0.27, 1.55)`}
            animation={`${glow} 4s infinite alternate ease-in-out`}
          />
        </motion.div>
      </Box>
      <Box p={5}>
        {/* Features */}
        <Element name="features">
          <Box maxW="container.xl" mx="auto" pt={50}>
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
            <Stack
              direction={["column", "column", "column", "row"]}
              alignItems={"center"}
              spacing={"50px"}
            >
              <Box order={[2, 2, 2, 1]} w="100%">
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
                    borderRadius={10}
                    // boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                    // animation={`${glow} 4s infinite alternate ease-in-out`}
                  />
                </motion.div>
              </Box>
              <VStack alignItems={"left"} order={[1, 1, 1, 2]} maxW="100%">
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
                  <Link href="/editor/albums">
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
            </Stack>
          </Box>
        </Element>
        <Box maxW="container.xl" mx="auto" pt={150}>
          <Stack
            direction={["column", "column", "column", "row"]}
            alignItems={"center"}
            spacing={"50px"}
          >
            {/* Missing order!!!!!!!!!! */}
            {/* sdasdasdsa */}
            <VStack alignItems={"left"} order={[1, 1, 1, 2]} maxW="100%">
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
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Link href="/editor/albums">
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
              </motion.div>
            </VStack>
            <Box order={[1, 1, 1, 2]} w="100%">
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
                  borderRadius={10}
                  // boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                  // animation={`${glow} 4s infinite alternate ease-in-out`}
                />
              </motion.div>
            </Box>
          </Stack>
        </Box>
        <Box maxW="container.xl" mx="auto" pt={150}>
          <Stack
            direction={["column", "column", "column", "row"]}
            alignItems={"center"}
            spacing={"50px"}
          >
            <Box order={[2, 2, 2, 1]} w="100%">
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
                  borderRadius={10}
                  // boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                  // animation={`${glow} 4s infinite alternate ease-in-out`}
                />
              </motion.div>
            </Box>
            <VStack alignItems={"left"} order={[1, 1, 1, 2]} maxW="100%">
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
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Link href="/editor/albums">
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
              </motion.div>
            </VStack>
          </Stack>
        </Box>
        <Box maxW="container.xl" mx="auto" pt={150}>
          <Stack
            direction={["column", "column", "column", "row"]}
            alignItems={"center"}
            spacing={"50px"}
          >
            <VStack alignItems={"left"} order={[1, 1, 1, 2]} maxW="100%">
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
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Link href="/editor/albums">
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
              </motion.div>
            </VStack>
            <Box order={[1, 1, 1, 2]} w="100%">
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
                  borderRadius={10}
                  // boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                  // animation={`${glow} 4s infinite alternate ease-in-out`}
                />
              </motion.div>
            </Box>
          </Stack>
        </Box>
        <Box maxW="container.xl" mx="auto" pt={150}>
          <Stack
            direction={["column", "column", "column", "row"]}
            alignItems={"center"}
            spacing={"50px"}
          >
            <Box order={[2, 2, 2, 1]} w="100%">
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
                  borderRadius={10}
                  // boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
                  // animation={`${glow} 4s infinite alternate ease-in-out`}
                />
              </motion.div>
            </Box>
            <VStack alignItems={"left"} order={[1, 1, 1, 2]} maxW="100%">
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
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Link href="/editor/albums">
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
              </motion.div>
            </VStack>
          </Stack>
        </Box>
      </Box>
      {/* Design */}
      <Element name="design">
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
            <SimpleGrid
              minChildWidth={"250px"}
              columns={5}
              mb={10}
              spacing={"20px"}
            >
              {Object.entries(technologyLinks).map(
                ([technology, link], index) => (
                  <motion.div
                    key={technology}
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
                    <Technology name={technology} link={link} />
                  </motion.div>
                )
              )}
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
      </Element>
      {/* Team */}
      <Element name="team">
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
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
              spacing={{ base: "50px", md: "80px" }}
              justifyItems="center"
              maxW="container.xl"
              mx="auto"
              px={{ base: 4, md: 6 }}
            >
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
      </Element>
      {showUpButton && (
        <Button
          position="fixed"
          bottom="50px"
          right="25px"
          zIndex="tooltip"
          bgGradient={"linear(to-r, linear.100, linear.200)"}
          color="brand.200"
          onClick={() => scroll.scrollToTop()}
          _hover={{
            color: "white",
            bg: "brand.300",
            transition: "all 0.3s ease-in-out",
          }}
          _active={{
            bgGradient: "linear(to-r, linear.300, linear.400)",
          }}
          size="lg"
          borderRadius="full"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
          h="50px"
          w="50px"
        >
          <Icon as={ChevronUpIcon} boxSize={6} />
        </Button>
      )}
    </Box>
  );
}

// "use client";

// import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
// import {
//   Card,
//   CardBody,
//   VStack,
//   Avatar,
//   Heading,
//   HStack,
//   IconButton,
//   CardFooter,
//   Tooltip,
//   Divider,
//   Box,
//   Text,
// } from "@chakra-ui/react";
// import Link from "next/link";

// export default function ContributorCard() {
//   return (
//     <Card maxW="xs" borderRadius={10} bg={"brand.200"}>
//       <CardBody pb={0}>
//         <VStack>
//           <Avatar size="xl" src="https://i.imgur.com/amcyT9X.png"></Avatar>
//           <Heading size="md">Danny Bui</Heading>
//           <Text>Fullstack/Team Lead</Text>
//           <HStack>
//             <Link href={"/*"}>
//               <IconButton
//                 aria-label="Github"
//                 icon={<GithubOutlined style={{ fontSize: "24px" }} />}
//               />
//             </Link>
//             <Link href={"/*"}>
//               <IconButton
//                 aria-label="Github"
//                 icon={<LinkedinOutlined style={{ fontSize: "24px" }} />}
//               />
//             </Link>
//           </HStack>
//           <Box
//             bg={"brand.300"}
//             px={10}
//             py={2}
//             borderRadius={7}
//             fontWeight={"bold"}
//             mt={3}
//           >
//             400 Contirbutions
//           </Box>
//         </VStack>
//       </CardBody>

//       <CardFooter justifyContent={"center"} gap={10}>
//         <Tooltip
//           label="Insertions"
//           bg={"brand.300"}
//           color={"white"}
//           borderRadius={5}
//           hasArrow
//           placement="left"
//         >
//           <Text color={"green.400"}>32,882++</Text>
//         </Tooltip>

//         <Divider orientation="vertical" color={"white"} />
//         <Tooltip
//           label="Deletions"
//           bg={"brand.300"}
//           color={"white"}
//           borderRadius={5}
//           hasArrow
//           placement="right"
//         >
//           <Text color={"red.400"}>69,424--</Text>
//         </Tooltip>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import {
  Card,
  CardBody,
  VStack,
  Avatar,
  Heading,
  HStack,
  IconButton,
  CardFooter,
  Tooltip,
  Divider,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import axios from "axios";

interface ContributorCardProps {
  username: string;
  role: string;
}

interface Profile {
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
}

interface Stats {
  totalCommits: number;
  totalInsertions: number;
  totalDeletions: number;
}

interface WeekStats {
  a: number;
  d: number;
  c: number;
}

interface ContributorStats {
  total: number;
  weeks: WeekStats[];
  author: {
    login: string;
  };
}

export default function ContributorCard({
  username,
  role,
}: ContributorCardProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user profile
        const profileResponse = await axios.get<Profile>(
          `https://api.github.com/users/${username}`
        );
        setProfile(profileResponse.data);

        let totalInsertions = 0;
        let totalDeletions = 0;
        let totalCommits = 0;

        // Fetch commit stats for the specific repository
        const commitResponse = await axios.get<ContributorStats[]>(
          `https://api.github.com/repos/Exiledz5155/mp3-metadata/stats/contributors`
        );

        // Log the response to see its structure
        console.log("Commit Response Data:", commitResponse.data);

        // Check if commitResponse.data is an array
        if (Array.isArray(commitResponse.data)) {
          const userStats = commitResponse.data.find(
            (contributor) => contributor.author.login === username
          );

          // Log the user stats to see what we get
          console.log("User Stats:", userStats);

          if (userStats) {
            totalCommits = userStats.total;
            userStats.weeks.forEach((week) => {
              totalInsertions += week.a;
              totalDeletions += week.d;
            });
          }
        }

        setStats({
          totalCommits,
          totalInsertions,
          totalDeletions,
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  if (loading) {
    return <Spinner />;
  }

  if (!profile || !stats) {
    return <Text>Failed to load data.</Text>;
  }
  return (
    <Card maxW="xs" borderRadius={10} bg={"brand.200"}>
      <CardBody pb={0}>
        <VStack>
          <Avatar size="xl" src={profile.avatar_url} />
          <Heading size="md">{profile.name}</Heading>
          <Text>{role}</Text>
          <HStack>
            <Link href={profile.html_url} isExternal>
              <IconButton
                aria-label="Github"
                icon={<GithubOutlined style={{ fontSize: "24px" }} />}
              />
            </Link>
            <Link href={`https://www.linkedin.com/in/${username}`} isExternal>
              <IconButton
                aria-label="LinkedIn"
                icon={<LinkedinOutlined style={{ fontSize: "24px" }} />}
              />
            </Link>
          </HStack>
          <Box
            bg={"brand.300"}
            px={10}
            py={2}
            borderRadius={7}
            fontWeight={"bold"}
            mt={3}
          >
            {stats.totalCommits} Contributions
          </Box>
        </VStack>
      </CardBody>

      <CardFooter justifyContent={"center"} gap={10}>
        <Tooltip
          label="Insertions"
          bg={"brand.300"}
          color={"white"}
          borderRadius={5}
          hasArrow
          placement="left"
        >
          <Text color={"green.400"}>{stats.totalInsertions}++</Text>
        </Tooltip>

        <Divider orientation="vertical" color={"white"} />
        <Tooltip
          label="Deletions"
          bg={"brand.300"}
          color={"white"}
          borderRadius={5}
          hasArrow
          placement="right"
        >
          <Text color={"red.400"}>{stats.totalDeletions}--</Text>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

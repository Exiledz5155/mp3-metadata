// ContributorCard.tsx
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

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

interface ContributorCardProps {
  contributor: Contributor;
}

export default function ContributorCard({ contributor }: ContributorCardProps) {
  return (
    <Card
      key={contributor.login}
      width="250px"
      height="350px"
      borderRadius={10}
      bg={"brand.200"}
      overflow="hidden"
    >
      <CardBody pb={0}>
        <VStack>
          <Avatar size="xl" src={contributor.avatar_url} />
          <Heading size="md" noOfLines={1}>
            {contributor.name}
          </Heading>
          <Text noOfLines={1}>{contributor.role}</Text>
          <HStack>
            <Link href={contributor.html_url}>
              <IconButton
                aria-label="Github"
                icon={<GithubOutlined style={{ fontSize: "24px" }} />}
              />
            </Link>
            <Link href={contributor.social}>
              <IconButton
                aria-label="LinkedIn"
                icon={<LinkedinOutlined style={{ fontSize: "24px" }} />}
              />
            </Link>
          </HStack>
          <Link
            href={`https://github.com/Exiledz5155/mp3-metadata/commits?author=${contributor.login}`}
          >
            <Button
              bg={"brand.300"}
              px={4}
              py={2}
              borderRadius={7}
              fontWeight={"bold"}
              mt={3}
              _hover={{ bg: "brand.400" }}
              width="100%"
            >
              {contributor.stats.totalCommits} Contributions
            </Button>
          </Link>
        </VStack>
      </CardBody>
      <CardFooter justifyContent={"center"} gap={4}>
        <Tooltip
          label="Insertions"
          bg={"brand.300"}
          color={"white"}
          borderRadius={5}
          hasArrow
          placement="left"
        >
          <Text color={"green.400"} fontSize="sm">
            {contributor.stats.totalInsertions}++
          </Text>
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
          <Text color={"red.400"} fontSize="sm">
            {contributor.stats.totalDeletions}--
          </Text>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

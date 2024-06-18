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
      maxW="sm"
      minW={"xs"}
      borderRadius={10}
      bg={"brand.200"}
    >
      <CardBody pb={0}>
        <VStack>
          <Avatar size="xl" src={contributor.avatar_url} />
          <Heading size="md">{contributor.name}</Heading>
          <Text>{contributor.role}</Text>
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
              px={10}
              py={2}
              borderRadius={7}
              fontWeight={"bold"}
              mt={3}
              _hover={{ bg: "brand.400" }}
            >
              {contributor.stats.totalCommits} Contributions
            </Button>
          </Link>
        </VStack>
      </CardBody>
      <CardFooter justifyContent={"center"} gap={8}>
        <Tooltip
          label="Insertions"
          bg={"brand.300"}
          color={"white"}
          borderRadius={5}
          hasArrow
          placement="left"
        >
          <Text color={"green.400"}>{contributor.stats.totalInsertions}++</Text>
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
          <Text color={"red.400"}>{contributor.stats.totalDeletions}--</Text>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

// // app/providers.tsx
// "use client";

// import { CacheProvider } from "@chakra-ui/next-js";
// import { Providers } from "../providers";

// // THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// // DO NOT MODIFY OR DELETE - Danny

// export default function Download({ children }: { children: React.ReactNode }) {
//   return (
//     <CacheProvider>
//       {/* Place stuff above providers */}
//       <Providers>{children}</Providers>
//     </CacheProvider>
//   );
// }

import { Flex, Heading, Container, Stack, Box } from "@chakra-ui/react";
import { UploadForm } from "../../components/UploadForm";

export default function UploadPage() {
  return (
    <Container centerContent>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 4, md: 10 }}
        py={{ base: 20, md: 36 }}>
      <Heading>File Upload</Heading>
      <UploadForm />
    </Stack>
    </Container>
  );
}

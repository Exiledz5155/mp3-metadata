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

import { UploadForm } from "../../components/UploadForm";

export default function UploadPage() {
  return (
    <div>
      <h1>File Upload Page</h1>
      <UploadForm />
    </div>
  );
}
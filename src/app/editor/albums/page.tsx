"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../../providers";
import { AlbumDisplay } from "../../../components/AlbumDisplay";

export default function EditPage({ children }: { children: React.ReactNode }) {

  return (
    <AlbumDisplay></AlbumDisplay>
  );
}

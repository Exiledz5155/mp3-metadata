import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

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

export function StyledVideo() {
  return (
    <Box
      maxH="700px"
      borderRadius={15}
      overflow="hidden"
      boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
      animation={`${glow} 4s infinite alternate ease-in-out`}
    >
      <video
        src="/full.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          maxHeight: "700px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "15px",
        }}
      />
    </Box>
  );
}

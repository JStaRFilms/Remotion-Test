import "./index.css";
import { Composition } from "remotion";
import { OrbitComposition } from "./Composition";
import { loadFont } from "@remotion/google-fonts/Inter";

// Load Inter font with weights 400, 500, 600, 700, 800, and 900
loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OrbitCommercial"
        component={OrbitComposition}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

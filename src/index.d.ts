import { BarLoaderProps } from "./components/BarLoader";
import { BouncyDotProps } from "./components/BouncyDotLoader";
import { CircleLoaderProps } from "./components/CircleLoader";
import { CircularBouncyLoaderProps } from "./components/CircularBouncyLoader";
import { DotProps } from "./components/DotLoader";
import { EclipseProps } from "./components/EclipseLoader";

declare module "react-native-loaders" {
  export const CircleLoader: React.FC<CircleLoaderProps>;
  export const BarLoader: React.FC<BarLoaderProps>;
  export const CircularBouncyLoader: React.FC<CircularBouncyLoaderProps>;
  export const EclipseLoader: React.FC<EclipseProps>;
  export const DotLoader: React.FC<DotProps>;
  export const BouncyDotLoader: React.FC<BouncyDotProps>;
}

import { BarLoaderProps } from "./components/BarLoader";
import { CircleLoaderProps } from "./components/CircleLoader";
import { CircularBouncyLoaderProps } from "./components/CircularBouncyLoader";
import { EclipseProps } from "./components/EclipseLoader";

declare module "react-native-loaders" {
  export const CircleLoader: React.FC<CircleLoaderProps>;
  export const BarLoader: React.FC<BarLoaderProps>;
  export const CircularBouncyLoader: React.FC<CircularBouncyLoaderProps>;
  export const EclipseLoader: React.FC<EclipseProps>;
}

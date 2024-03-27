import { BarLoaderProps } from "./components/BarLoader";
import { ViewStyle } from "react-native";
import { CircleLoaderProps } from "./components/CircleLoader";
import { CircularBouncyLoaderProps } from "./components/CircularBouncyLoader";

declare module "react-native-loaders" {
  export const CircleLoader: React.FC<CircleLoaderProps>;
  export const BarLoader: React.FC<BarLoaderProps>;
  export const CircularBouncyLoader: React.FC<CircularBouncyLoaderProps>;
}

// import original module declarations
import "styled-components";
import { StringLiteralType } from "typescript";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}

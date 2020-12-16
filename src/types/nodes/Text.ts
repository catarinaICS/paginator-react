export type AlignEnum = "inherit" | "left" | "center" | "right" | "justify";
export type ColorEnum = "initial" | "inherit" | "primary" | "secondary" | "textPrimary" | "textSecondary" | "error"
export type DisplayEnum = "initial" | "block" | "inline";
export type VariantEnum = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "srOnly" | "inherit";

export type TextType = {
  type: "text";
  id: string;
  props: {
    align?: AlignEnum
    color?: ColorEnum
    display?: DisplayEnum
    gutterBottom?: boolean;
    noWrap?: boolean;
    paragraph?: boolean;
    variant?: VariantEnum
  };
  content: string;
  parents: string[];
};
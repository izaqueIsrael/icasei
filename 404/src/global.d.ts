declare module "*.html" {
  const value: string;
  export default value;
}

declare module "*.css" {
  const value: { [className: string]: string };
  export default value;
}

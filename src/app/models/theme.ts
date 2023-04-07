export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {
    "--foreground-default": "#08090A",
    "--foreground-secondary": "#41474D",
    "--foreground-tertiary": "#797C80",
    "--foreground-quaternary": "#F4FAFF",
    "--foreground-light": "#41474D",

    "--background-default": "linear-gradient(180deg, rgba(145,221,161,1) 0%, rgba(63,196,218,1) 48%)",
    "--background-secondary": "rgb(145,221,161)",
    "--background-cards": "#fff",
    "--background-light": "rgb(66, 81, 110)",
    "--background-chip": "#ffffffc7",

    "--primary-default": "#ffff",
    "--primary-dark": "#24B286",
    "--primary-light": "#B2FFE7",

    "--error-default": "#EF3E36",
    "--error-dark": "#800600",
    "--error-light": "#FFCECC",

    "--background-button": "#ffff"
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--foreground-default": "#5C7D99",
    "--foreground-secondary": "#A3B9CC",
    "--foreground-tertiary": "#F4FAFF",
    "--foreground-quaternary": "#E5E5E5",
    "--foreground-light": "#FFFFFF",

    "--background-default": "linear-gradient(180deg, rgba(82,79,79,1) 24%, rgba(26,93,116,1) 100%, rgba(16,40,79,1) 100%)",
    "--background-secondary": "rgb(82,79,79);",
    "--background-cards": "#ffffffc7",
    "--background-light": "#ffffff",
    "--background-chip": "rgba(59, 37, 37, 0.356)",

    "--primary-default": "rgb(82,79,79)",
    "--primary-dark": "#24B286",
    "--primary-light": "#B2FFE7",

    "--error-default": "#EF3E36",
    "--error-dark": "#800600",
    "--error-light": "#FFCECC",

    "--background-button": "rgb(82,79,79);"
  }
};
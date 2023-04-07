export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {
    "--background-default": "linear-gradient(180deg, rgba(145,221,161,1) 0%, rgba(63,196,218,1) 48%)",
    "--background-secondary": "rgb(145,221,161)",
    "--background-cards": "#fff",
    "--background-light": "rgb(66, 81, 110)",
    "--background-chip": "#ffffffc7",

    "--primary-default": "#ffff",
    "--background-button": "#ffff"
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--background-default": "linear-gradient(180deg, rgba(82,79,79,1) 24%, rgba(26,93,116,1) 100%, rgba(16,40,79,1) 100%)",
    "--background-secondary": "rgb(82,79,79);",
    "--background-cards": "#ffffffc7",
    "--background-light": "#ffffff",
    "--background-chip": "rgba(59, 37, 37, 0.356)",

    "--primary-default": "rgb(82,79,79)",
    "--background-button": "rgb(82,79,79);"
  }
};
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
// console.log(colors);
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      mobile: "420px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    fontFamily: {
      sans: ["Oswald", "Georgia"],
    },
    extend: {
      fontSize: {
        "1xs": "11px",
      },
      colors: {
        coolGray: colors.coolGray,
        gray: colors.gray,
        "turquoise-100": "#8dfcde",
        "turquoise-200": "#8dfcde",
        "turquoise-300": "#8dfcde",
        "turquoise-400": "#6effd8",
        "turquoise-500": "#6effd8",
        "turquoise-700": "#6effd8",
        "turquoise-800": "#6effd8",
        "turquoise-900": "#3ff3c3",
        "turquoise-950": "#3ff3c3",
        "turquoise-1000": "#3ff3c3",
        "turquoise-1100": "#3ff3c3",
        "indigo-950": "#1b1925",
        "indigo-1000": "#FFCC66",
        "indigo-1100": "#FFCC66",
        "black-400":"#00000",
        "black-500":"#00000",
        "black-600":"#00000",
        "black-700":"#00000",
        "black-900":"#00000",
      },
      height: {
        "60px": "60px",
        "20rem": "20rem",
        "25rem": "25rem",
      },
      maxWidth: {
        "16rem": "16rem",
      },
      minWidth: {
        "15rem": "15rem",
      },
      maxHeight: {
        "90vh": "90vh",
        "80vh": "80vh",
        "70vh": "70vh",
        "85%": "85%",
      },
      minHeight: {
        "10rem": "10rem",
        "18rem": "18rem",
        "24rem": "24rem",
        "80%": "80%",
      },
      width: {
        "20rem": "20rem",
        "30rem": "30rem",
        "40rem": "40rem",
      },
      padding: {
        "6%": "6%",
        "60px": "60px",
        "20%": "20%",
        "10%": "10%",
      },
      zIndex: {
        9999: "9999",
      },
    },
    default: {
      button: {
        "&:disabled": {
          cursor: "not-allowed",
          opacity: 0.4,
        },
      },
    },
  },
  variants: {
    cursor: ["hover", "focus"],
    backgroundColor: ["hover", "focus", "important", "responsive", "dark"],
    backgroundSize: ["important", "responsive"],
    backgroundRepeat: ["important", "responsive"],
    backgroundPosition: ["important", "responsive"],
    margin: ["first", "responsive"],
    display: ["responsive"],
    padding: ["important", "responsive"],
    borderRadius: ["important", "responsive"],
    textColor: ["important", "group-hover", "hover", "dark"],
    borderColor: ["important", "focus", "hover", "dark"],
    outlineOffset: ["hover"],
    boxShadow: ["responsive", "dark"],
    border: ["hover", "responsive"],
    extend: {
      cursor: ["disabled"],
      opacity: ["disabled", "readonly"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    plugin(function ({ addVariant, e }) {
      addVariant("readonly", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`readonly${separator}${className}`)}:read-only`;
        });
      });

      addVariant("focus", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`focus${separator}${className}`)}:read-only:focus`;
        });
      });

      addVariant("hover", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`hover${separator}${className}`)}:read-only:hover`;
        });
      });

      addVariant("important", ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });

      addVariant("before", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`before${separator}${className}`)}::before`;
        });
      });
      addVariant("after", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`;
        });
      });
    }),
    plugin(({ addUtilities }) => {
      const contentUtilities = {
        ".content": {
          content: "attr(data-content)",
        },
        ".content-before": {
          content: "attr(data-before)",
        },
        ".content-after": {
          content: "attr(data-after)",
        },
      };

      addUtilities(contentUtilities, ["before", "after"]);
    }),
  ],
};

module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "ePub": true,
        "JSZip": true
    },
    "extends": "eslint:recommended",
    "parser": "espree",
    "parserOptions": {
        "sourceType": "module"
    },
    "overrides": [
        {
            "files": ["*.{ts,tsx}"],
            "parser": "@typescript-eslint/parser",
            "plugins": ["@typescript-eslint"],
            "extends": ["plugin:@typescript-eslint/recommended"],
            "rules": {
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/ban-ts-comment": "off",
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": ["error", {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_"
                }],
                "indent": ["error", 2]
            }
        }
    ],
    "rules": {
        "indent": [
            "error",
            "tab",
            { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars" : ["warn"],
        "no-console" : ["warn"],
        "no-unused-vars": [
          "error",
          { "vars": "all", "args": "none" }
        ],
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "valid-jsdoc": ["warn"]
    }
};

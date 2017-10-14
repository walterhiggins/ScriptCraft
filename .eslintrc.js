module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "nashorn": true
  },
  "globals": {
    "__plugin": true,
    "server": true,
    "events": true,
    "addUnloadHandler": true,
    "__dirname": true,
    "persist": true,
    "isOp": true,
    "echo": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "no-fallthrough": [
      0
    ],
    "no-useless-escape": [
      0
    ],
    "quotes": [
      "error",
      "single"
        ],
    "no-console": [
      0
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};

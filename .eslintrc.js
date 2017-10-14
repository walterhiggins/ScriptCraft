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
    "echo": true,
    "scload": true,
    "nashorn": true,
    "plugin": true, // not the same as __plugin!!!
    "command": true,
    "config": true,
    "window": false,
    "document": false
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

module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "setupFiles": [
			"<rootDir>/src/setupTests.ts"
		]
  }
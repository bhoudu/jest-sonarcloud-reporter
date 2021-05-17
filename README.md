# jest-sonarcloud-reporter

This is a fork of [`jest-sonar-reporter`](https://www.npmjs.com/package/jest-sonar-reporter) in TypeScript.
It fixes the systemic generation of absolute paths in `test-report.xml` by adding the support of a new parameter:

    "jestSonar": {
        "withRelativePaths": true,
        ...
    }

When the flag `withRelativePaths` is set to true, test file paths will be generated with relativePaths instead of absolute paths.

That's it, there is nothing more, it just includes what is supported already in `jest-sonar-reporter`.

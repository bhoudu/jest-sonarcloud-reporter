import * as path from "path";

const JEST_SONAR_KEY = 'jestSonar';
const ENV_KEY = 'env';
const blacklist = [ENV_KEY];

function getPackageData(root: string): object {
  const packageJsonPath = path.join(root, 'package.json');
  return require(packageJsonPath);
}

export interface ReporterConfig {
  indent: number;
  reportPath: string;
  reportFile: string;
  sonar56x: boolean;
}

export function getReporterConfig(
  root: string = process.cwd(),
  env: string = 'default'
): ReporterConfig {
  const json = getPackageData(root);
  const jestSonarConfig = json[JEST_SONAR_KEY] || {};
  const envConfig = jestSonarConfig[ENV_KEY] || {};
  const allEnvConfig = Object.keys(jestSonarConfig)
    .filter(key => !blacklist.includes(key))
    .reduce((acc, key) => {
      acc[key] = jestSonarConfig[key]
      return acc
    }, {});
  return {
    indent: 2,
    reportPath: root,
    reportFile: 'test-report.xml',
    sonar56x: false,
    ...allEnvConfig,
    ...envConfig[env]
  };
}

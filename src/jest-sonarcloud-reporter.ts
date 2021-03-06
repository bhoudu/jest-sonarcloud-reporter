import * as fs from 'fs';
import * as path from 'path';
import { getReporterConfig } from './config/getReporterConfig';
import { getTestExecutions } from './xml/getTestExecutions';
import { AggregatedResult, Context, Reporter, ReporterOnStartOptions } from '@jest/reporters';

const xml = require('xml');
const root = process.cwd();
const config = getReporterConfig(root, process.env.NODE_ENV);

function xmlIndent(indent: number): string {
  let spaces = [];
  for (let i = 1; i <= indent; i += 1) {
    spaces.push(' ');
  }
  return spaces.join('');
}

export default class JestSonarcloudReporter implements Reporter {
  onRunStart(results: AggregatedResult, options: ReporterOnStartOptions): Promise<void> | void {
    return undefined;
  }

  onRunComplete(contexts: Set<Context>, results: AggregatedResult): Promise<void> | void {
    const testExecutions = getTestExecutions(root, results, config.sonar56x, config.withRelativePaths);
    const report = xml(testExecutions, { declaration: true, indent: xmlIndent(config.indent) });
    if (!fs.existsSync(config.reportPath)) {
      fs.mkdirSync(config.reportPath);
    }
    const reportFile = path.join(config.reportPath, config.reportFile);
    fs.writeFileSync(reportFile, report);
    if (process.env.DEBUG) {
      fs.writeFileSync('debug.json', JSON.stringify(results, null, 2));
    }
  }

  getLastError(): Error | void {
    return undefined;
  }
}

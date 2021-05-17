const filter = /([\u001b]\[.{1,2}m)/g;
const shorten = /[\n].*/g;

function failure(message) {
  const filteredMessage = message.replace(filter, '');
  const shortMessage = filteredMessage.replace(shorten, '');
  return {
    failure: {
      _attr: {
        message: shortMessage,
      },
      _cdata: filteredMessage,
    },
  };
}

function testCase(
  root: string,
  testResult: any,
): any {
  let failures;
  const aTestCase = {
    _attr: {
      name: testResult.fullName || testResult.title,
      duration: testResult.duration || 0,
    },
  };
  if (testResult.status === 'failed') {
    failures = testResult.failureMessages.map(failure);
    return { testCase: [aTestCase].concat(failures) };
  } else {
    return { testCase: aTestCase };
  }
}

function file(
  root: string,
  withRelativePaths: boolean,
  testResult: any,
) {
  const path = withRelativePaths ? testResult.testFilePath.substring(root.length) : testResult.testFilePath;
  const aFile = [{ _attr: { path } }];
  const testCases = testResult.testResults.map(testCase);
  return {
    file: aFile.concat(testCases),
  };
}

export function getTestExecutions(
  root: string,
  data: any,
  formatForSonar56: boolean,
  withRelativePaths: boolean,
): object {
  const aTestExecution = [{ _attr: { version: '1' } }];
  const testResults = data.testResults.map(r => {
    return file(root, withRelativePaths, r);
  });
  return formatForSonar56
    ? { unitTest: aTestExecution.concat(testResults) }
    : { testExecutions: aTestExecution.concat(testResults) };
}

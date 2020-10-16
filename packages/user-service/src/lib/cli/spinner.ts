import ora from 'ora';

export async function execWithSpinner<T>(func: () => Promise<T>, processingMessage: string) {
  if (process.env.NODE_ENV === 'test') {
    return func();
  }

  const spinner = ora(processingMessage).start();
  try {
    const result = await func();
    spinner.text += ' [OK]';
    spinner.succeed();
    return result;
  } catch (err) {
    spinner.text += ' [FAILURE]';
    spinner.fail();
    throw err;
  }
}

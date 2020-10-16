const eslint = require('eslint');

describe('javascript file', () => {
  it('load config in eslint to validate all rule syntax is correct', () => {
    const { CLIEngine } = eslint;

    const cli = new CLIEngine({
      useEslintrc: false,
      configFile: '.eslintrc.js',
    });

    const code = 'const foo = 1;\nconst bar = (a) => a;\nbar(foo);\n';

    expect(cli.executeOnText(code).errorCount).toStrictEqual(0);
  });
});

describe('typescript file', () => {
  it('load config in eslint to validate all rule syntax is correct', () => {
    const { CLIEngine } = eslint;

    const cli = new CLIEngine({
      useEslintrc: false,
      configFile: '.eslintrc.js',
    });

    const code = 'const foo = 1;\nconst bar = (a: string) => a;\nbar(foo);\n';

    expect(cli.executeOnText(code).errorCount).toStrictEqual(0);
  });
});

interface DotenvLoadOptions {
  findUp: boolean;
}

declare function dotenvLoad(options?: DotenvLoadOptions): void;

export = dotenvLoad;

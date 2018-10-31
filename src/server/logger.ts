import debug from 'debug';

export interface Logger {
  info(message: string): void;
  error(message: string, meta: { error: Error }): void;
}

export default (namespace: string): Logger => {
  const errorLog = debug(`app:${namespace}:error`);

  const info = debug(`app:${namespace}:info`);
  info.log = console.log.bind(console);

  return {
    info,
    error: (message, { error }) => errorLog(`${message}: ${error}`),
  };
};

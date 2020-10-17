import { Logger } from '../../../src/lib/logger';

describe('logger', () => {
  let debugSpy: jest.SpyInstance;
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    debugSpy = jest.spyOn(global.console, 'debug').mockImplementation(() => null);
    logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => null);
    warnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => null);
    errorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => null);
  });

  describe('when in test environement', () => {
    const logger = new Logger({ env: 'test' });

    describe('debug', () => {
      it('should not log anything', () => {
        logger.debug('message');
        expect(debugSpy).not.toHaveBeenCalled();
      });
    });

    describe('log', () => {
      it('should not log anything', () => {
        logger.log('message');
        expect(logSpy).not.toHaveBeenCalled();
      });
    });

    describe('warn', () => {
      it('should not log anything', () => {
        logger.warn('message');
        expect(warnSpy).not.toHaveBeenCalled();
      });
    });

    describe('error', () => {
      it('should not log anything', () => {
        logger.error('message');
        expect(errorSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('when not in test environement', () => {
    const logger = new Logger({ env: 'staging' });

    describe('debug', () => {
      it('should log something', () => {
        logger.debug('message');
        expect(debugSpy).toHaveBeenCalledTimes(1);
        expect(debugSpy).toHaveBeenCalledWith('message');
      });
    });

    describe('log', () => {
      it('should log something', () => {
        logger.log('message');
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith('message');
      });
    });

    describe('warn', () => {
      it('should log something', () => {
        logger.warn('message');
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith('message');
      });
    });

    describe('error', () => {
      it('should log something', () => {
        logger.error('message');
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledWith('message');
      });
    });
  });
});

import {encodePassword} from '../../../../src/lib/security/password';

describe('security/password', () => {
  describe('encodePassword', () => {
    it('should encode password', () => {
      const password = 'password';
      expect(encodePassword(password)).toStrictEqual(
        '2f01be6f8dacdc975bd1540ff8d94af9ece1ef0d6adb036ec726d5da084f48db',
      );
    });
  });
});

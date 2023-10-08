import * as crypto from 'node:crypto';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHashed = crypto.createHmac('sha256', salt);
  return shaHashed.update(line).digest('hex');
};

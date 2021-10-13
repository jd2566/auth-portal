import { format, createLogger, transports } from 'winston';

const { combine, timestamp, printf } = format;

const standardFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

export const logger = createLogger({
  format: combine(
    timestamp(),
    standardFormat
  ),
  transports: [
    new transports.Console()
  ]
});

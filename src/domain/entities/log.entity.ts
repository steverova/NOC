export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface Props {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(entity: Props) {
    const { level, message, origin, createdAt = new Date() } = entity;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJSON = (json: string): LogEntity => {
    const { level, message, createdAt = new Date(), origin } = JSON.parse(json);
    const log = new LogEntity({ level, message, createdAt, origin});
    return log;
  };
}

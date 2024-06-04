import fs from "fs";

import {
  LogEntity,
  LogSeverityLevel,
} from "../../domain/entities/log.entity";
import { LogDataSource } from "../../domain/datasources/log.datasource";


export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = "logs/";
  private readonly lowLogPath: string = "logs/low.log";
  private readonly mediumLogPath: string = "logs/medium.log";
  private readonly highLogPath: string = "logs/high.log";
  private readonly allLogsPath: string = "logs/all.log";

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [
      this.lowLogPath,
      this.mediumLogPath,
      this.highLogPath,
      this.allLogsPath,
    ].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
    });
  };

  async saveLog(newLog: LogEntity): Promise<void> {

    if (!newLog) throw new Error("Log is required")

    const logAsJSON = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJSON);

    if (newLog.level === LogSeverityLevel.low) {
      return Promise.resolve();
    };

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogPath, logAsJSON);
    } else {
      fs.appendFileSync(this.highLogPath, logAsJSON);
    }

    return Promise.resolve();
  }

  private getLogsFromPath = (path: string): LogEntity[] => {

    const content = fs.readFileSync(path, "utf-8");

    const logs = content.split("\n").map((log) => {
      return LogEntity.fromJSON(log);
    });

    return logs;

  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromPath(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromPath(this.mediumLogPath);
      case LogSeverityLevel.high:
        return this.getLogsFromPath(this.highLogPath);
      default:
        throw new Error(`${severityLevel} not implemented yet!`);
    }

    throw new Error("Method not implemented.");
  }
}

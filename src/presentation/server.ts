import { CronService } from "./cron/cron.services";
import { CheckService } from "../domain/use-cases/checks/check.services";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository-impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDataSource());

const url = "localhost:3000";

export const initCronJob = () => {
  CronService.createJob({
    cronTime: "*/5 * * * * *",
    onTick: () => {
      new CheckService(
        fileSystemRepository,
        () => console.log(`Success fetch ${url}`),
        (error) => console.error(error)
      ).execute(url);
    },
  });
};

export class Server {
  public static start() {
    console.log("Server started");
    initCronJob();
  }
}

import { CronJob } from "cron";

type props = {
  cronTime: string | Date;
  onTick: () => void;
};

export class CronService {
  public static start() {
    console.log("Cron job started");
  }

  public static createJob({ cronTime, onTick }: props): CronJob {
    const job = new CronJob(cronTime, onTick);
    job.start();
    return job;
  }
}

import { envs } from "./config/plugins/envs.pluging";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  Server.start();
  // console.log(envs.MAILER_EMAIL);
}

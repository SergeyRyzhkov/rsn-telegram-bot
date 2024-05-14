import { middlewareList } from "@/MiddlewareList";
import { onShutdown } from "node-graceful-shutdown";
import { setChatSleeptMode } from "./features/ChatSleeptMode";
import { getBotInstance } from "./BotInstanceFactory";

const startBot = () => {
  console.log("Try start TG bot");
  getBotInstance().start();
};

const stopBot = (reason?: string) => {
  if (!!getBotInstance()) {
    console.log("Try stop bot ", reason || "");
    getBotInstance().stop();
  }
};

getBotInstance().use(middlewareList);
startBot();

//-1002134841299 138
// -1002024704154 - voz и топик 5
setChatSleeptMode(-1002024704154, 5, getBotInstance().api);

onShutdown(() => {
  stopBot("onShutdown by node-graceful-shutdown");
});

process.on("SIGQUIT", () => stopBot("SIGQUIT"));
process.on("SIGINT", () => stopBot("SIGINT"));

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeFullReload", async () => {
    console.log("Vite HMR (reload )");
    stopBot();
  });
}

import { Api, RawApi, Bot } from "grammy";
import { CustomBotContext } from "./CustomBotContext";
import { autoChatAction } from "@grammyjs/auto-chat-action";
import { hydrate } from "@grammyjs/hydrate";
import { parseMode, hydrateReply } from "@grammyjs/parse-mode";
import { createErrorHandler } from "./ErrorHandler";

let botInstance: Bot<CustomBotContext, Api<RawApi>>;

const createBot = (token: string) => {
  const bot = new Bot<CustomBotContext, Api<RawApi>>(token, {});

  bot.api.config.use(parseMode("HTML"));

  bot.use(autoChatAction(bot.api));
  bot.use(hydrate());
  bot.use(hydrateReply);

  const errorHandler = createErrorHandler();
  bot.catch(errorHandler);
  bot.errorBoundary(errorHandler);

  return bot;
};

export const getBotInstance = () => {
  if (!botInstance) {
    botInstance = createBot(import.meta.env.VITE_BOT_TOKEN);
  }
  return botInstance;
};

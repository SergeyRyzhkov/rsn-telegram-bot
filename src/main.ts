import { setChatNightMode } from "./features/ChatNightMode";
import { CustomBotContext } from "./CustomBotContext";
import { middlewareList } from "@/MiddlewareList";
import { catchError } from "@/features/CatchError";
// https://github.com/bot-base/telegram-bot-template/blob/main/src/bot/index.ts
// https://github.com/bot-base/telegram-bot-template/blob/main/src/main.ts

import { autoChatAction } from "@grammyjs/auto-chat-action";
import { hydrate } from "@grammyjs/hydrate";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { Bot as TelegramBot } from "grammy";

export const createBot = (token: string) => {
  const bot = new TelegramBot<CustomBotContext>(token, {});

  bot.api.config.use(parseMode("HTML"));

  bot.use(autoChatAction(bot.api));
  bot.use(hydrate());
  bot.use(hydrateReply);

  bot.catch(catchError());

  return bot;
};
const bot = createBot("838925503:AAHfbuzzNJKXJjhJsnVmz_IjSKCNSCYo2Ok");
bot.use(middlewareList);

bot.start();

setChatNightMode(-1002024704154, 5, bot.api);

import { stopSwearWordsMiddleware } from "./features/SwearWordsMiddleware";
import { CustomBotContext } from "./CustomBotContext";
import { Composer } from "grammy";

const middlewareList = new Composer<CustomBotContext>();

middlewareList.on("message", stopSwearWordsMiddleware());

export { middlewareList };

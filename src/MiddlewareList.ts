import { Composer } from "grammy";
import { CustomBotContext } from "./CustomBotContext";
import { stopSwearWordsCommand } from "./features/SwearWordsCommand";

const middlewareList = new Composer<CustomBotContext>();

middlewareList.on("message", stopSwearWordsCommand());

export { middlewareList };

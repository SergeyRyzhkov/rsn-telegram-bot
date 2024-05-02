import { CustomBotContext } from "@/CustomBotContext";
import { BotError } from "grammy";

export const createErrorHandler = () => {
  return async (error: BotError<CustomBotContext>) => {
    try {
      const ctx = error?.ctx;
      console.log(`createErrorHandler: Error while handling update ${ctx.update.update_id}:`);
      const e = error.error;
      console.log("createErrorHandler: Unknown error:", error?.error);
    } catch {
      console.log("createErrorHandler: Error in catchError");
    }
  };
};

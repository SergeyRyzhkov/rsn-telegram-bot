import { AutoChatActionFlavor } from "@grammyjs/auto-chat-action";
import { HydrateFlavor } from "@grammyjs/hydrate";
import type { Context } from "grammy";
import type { ParseModeFlavor } from "@grammyjs/parse-mode";

export type CustomBotContext = ParseModeFlavor<
  HydrateFlavor<Context & AutoChatActionFlavor>
>;

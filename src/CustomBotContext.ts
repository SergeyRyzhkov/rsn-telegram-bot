import { AutoChatActionFlavor } from "@grammyjs/auto-chat-action";
import { HydrateFlavor } from "@grammyjs/hydrate";
import type { ParseModeFlavor } from "@grammyjs/parse-mode";
import type { Context } from "grammy";

export type CustomBotContext = ParseModeFlavor<HydrateFlavor<Context & AutoChatActionFlavor>>;

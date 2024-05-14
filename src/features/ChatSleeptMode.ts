import { Api, RawApi } from "grammy";
import { CustomBotContext } from "../CustomBotContext";

const openHour = 6;
const closeHour = 23;

const onCloseMessage = `ВНИМАНИЕ !\n
Спокойной ночи, всем приятных снов !
Размещение постов с 23.00 до 06.00 запрещено\n
<b>При ЧП - писать администраторам сообщества !</b>\n
Просим Вас соблюдать <a href="https://t.me/vozrozhdenie_spb/524/785">правила в группе</a> \n
Мы <a href = "https://vk.com/vozrozhdeny_spb">ВКонтакте</a>
<a href ="https://t.me/vozrojdenienovosti">Возрождние | Новости</a>
<a href ="https://t.me/detisos">Возрождние | SOS-дети</a>
`;

const onOpenMessage = `ВНИМАНИЕ !\n
Бодрое утро, всем хорошего дня !\n
Просим Вас соблюдать <a href="https://t.me/vozrozhdenie_spb/524/785">правила в группе</a> \n
Мы <a href = "https://vk.com/vozrozhdeny_spb">ВКонтакте</a>
<a href ="https://t.me/vozrojdenienovosti">Возрождние | Новости</a>
<a href ="https://t.me/detisos">Возрождние | SOS-дети</a>`;

const createPermissions = (enabled: boolean) => {
  return {
    can_send_messages: enabled,
    can_send_audios: enabled,
    can_send_documents: enabled,
    can_send_photos: enabled,
    can_send_videos: enabled,
    can_send_video_notes: enabled,
    can_send_voice_notes: enabled,
    can_send_other_messages: enabled,
    can_invite_users: true,
  };
};

export const planOpenChat = (api: Api<RawApi>, chitId: number, threadId: number) => {
  const diffForOpen = new Date().setHours(openHour, 0) - Date.now();
  setTimeout(() => {
    api.sendMessage(chitId, onOpenMessage, { message_thread_id: threadId });
    api.setChatPermissions(chitId, createPermissions(true));
  }, diffForOpen);
  console.log("planOpenChat: Plan OPEN chat throw hour", diffForOpen / 1000 / 60 / 60);

  const diffForClose = new Date().setHours(closeHour, 0) - Date.now();
  setTimeout(() => planCloseChat(api, chitId, threadId), diffForClose);
  console.log("planOpenChat: Plan CLOSE chat throw hour", diffForClose / 1000 / 60 / 60);
};

export const planCloseChat = (api: Api<RawApi>, chitId: number, threadId: number) => {
  const diffForClose = new Date().setHours(closeHour, 0) - Date.now();
  setTimeout(() => {
    api.sendMessage(chitId, onCloseMessage, { message_thread_id: threadId });
    api.setChatPermissions(chitId, createPermissions(false));
  }, diffForClose);
  console.log("planCloseChat: Plan CLOSE chat throw hour", diffForClose / 1000 / 60 / 60);

  const tomorrow = new Date().setDate(new Date().getDate() + 1);
  const diffForOpen = new Date(tomorrow).setHours(openHour, 0) - Date.now();
  setTimeout(() => planOpenChat(api, chitId, threadId), diffForOpen);
  console.log("planCloseChat: Plan OPEN chat throw hour", diffForOpen / 1000 / 60 / 60);
};

export const setChatSleeptMode = (chitId: number, threadId: number, api: Api<RawApi>) => {
  if (new Date().getHours() >= openHour) {
    planCloseChat(api, chitId, threadId);
  } else {
    planOpenChat(api, chitId, threadId);
  }
};

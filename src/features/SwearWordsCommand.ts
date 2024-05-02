import { CustomBotContext } from "@/CustomBotContext";

const regexp =
  /(?<![а-яё])(?:(?:(?:у|[нз]а|(?:хитро|не)?вз?[ыьъ]|с[ьъ]|(?:и|ра)[зс]ъ?|(?:о[тб]|п[оа]д)[ьъ]?|(?:S(?=[а-яё]))+?[оаеи-])-?)?(?:[её](?:б(?!о[рй]|рач)|п[уа](?:ц|тс))|и[пб][ае][тцд][ьъ]).*?|(?:(?:н[иеа]|ра[зс]|[зд]?[ао](?:т|дн[оа])?|с(?:м[еи])?|а[пб]ч)-?)?ху(?:[яйиеёю]|л+и(?!ган)).*?|бл(?:[эя]|еа?)(?:[дт][ьъ]?)?|S*?(?:п(?:[иеё]зд|ид[аое]?р|ед(?:р(?!о)|[аое]р|ик)|охую)|бля(?:[дбц]|тс)|[ое]ху[яйиеё]|хуйн).*?|(?:о[тб]?|про|на|вы)?м(?:анд(?:[ауеыи](?:л(?:и[сзщ])?[ауеиы])?|ой|[ао]в.*?|юк(?:ов|[ауи])?|е[нт]ь|ища)|уд(?:[яаиое].+?|е?н(?:[ьюия]|ей))|[ао]л[ао]ф[ьъ](?:[яиюе]|[еёо]й))|елд[ауые].*?|ля[тд]ь|(?:[нз]а|по)х)(?![а-яё])/;
const isMatch = (text: string) => {
  try {
    return regexp.test(text.toLowerCase());
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const stopSwearWordsCommand = () => {
  return async (ctx: CustomBotContext) => {
    const text = ctx.msg?.text;
    if (!!text && !!ctx.msg && isMatch(text)) {
      console.log("====МАТ " + ctx.msg.from?.username);
      console.log(ctx.msg.text);
      console.log("====МАТ=====");
      const sendText = `<tg-spoiler>${text}</tg-spoiler>\n@${ctx.msg.from?.username}\n<b>Не ругаемся матом 👍👍👍</b>`;
      await ctx.reply(sendText, {
        parse_mode: "HTML",
        reply_parameters: { message_id: ctx.msg.message_id },
      });
      ctx.msg.delete();
    }
  };
};

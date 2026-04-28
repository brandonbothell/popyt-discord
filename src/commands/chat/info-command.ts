import { ChatInputCommandInteraction, EmbedBuilder, PermissionsString } from 'discord.js';

import { InfoOption } from '../../enums/index.js';
import { Language } from '../../models/enum-helpers/index.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class InfoCommand implements Command {
    public names = [Lang.getRef('chatCommands.info', Language.Default)];
    public deferType = CommandDeferType.HIDDEN;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, data: EventData): Promise<void> {
        let args = {
            option: intr.options.getString(
                Lang.getRef('arguments.option', Language.Default), false
            ) as InfoOption,
        };

        let embed: EmbedBuilder;
        const buildEmbed = (): void => {
            for (let langCode of Language.Enabled) {
              embed.addFields([
                  {
                      name: Language.Data[langCode].nativeName,
                      value: Lang.getRef('meta.translators', langCode),
                  },
              ]);
          }
        }
        switch (args.option) {
            case InfoOption.TRANSLATE: {
                embed = Lang.getEmbed('displayEmbeds.translate', data.lang);
                buildEmbed()
                break
            }
            case InfoOption.ABOUT:
            default: {
                embed = Lang.getEmbed('displayEmbeds.about', data.lang)
                buildEmbed()
            }
        }

        await InteractionUtils.send(intr, embed);
    }
}

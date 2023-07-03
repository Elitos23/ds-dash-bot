import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getRepository } from 'typeorm';
import { GuildConfiguration } from '../../typeorms/entities/GuildConfiguration';

export default class ChwelcomechannelCommand extends BaseCommand {
  constructor(
    private readonly guildConfigRepository = getRepository
    (GuildConfiguration)
  ) {
    super('chwelcomechannel', 'mod', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args.length) {
      message.channel.send('No argument')
      return;
    }
    const [newChannelId] = args;
   try{
    const config = client.configs.get(message.guildId!);
    const updatedConfig = await this.guildConfigRepository.save({
      ...config,
      welcomeChannelID: newChannelId
    });
    console.log(updatedConfig)
      message.channel.send('Update welcome success')
      client.configs.set(message.guildId!, updatedConfig)
   } catch (err) {
    console.log(err)
    message.channel.send('error')
   }
  }
}
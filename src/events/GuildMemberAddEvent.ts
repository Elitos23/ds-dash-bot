// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, TextChannel } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client: DiscordClient, member: GuildMember) {
    console.log(`Guild member Joined`);
    console.log(`Guild member Joined ${member.guild.id} ${member.guild.name}`);
    const config = client.configs.get(member.guild.id);
    console.log(config);
    if (!config){
      return;
    }
    if (config.welcomeChannelID) {
      const channel = member.guild.channels.cache.get(config.welcomeChannelID) as TextChannel;
      if (!channel) {
        console.log("No welcome channel");
      } else {
        channel.send(`Welcome ${member}`)
      }
    } else {
      console.log('No welcome chnnel set.')
    }
  }
}
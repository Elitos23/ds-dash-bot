import { Channel, Message } from "discord.js";
import { getRepository } from "typeorm";
import DiscordClient from "../../client/client";
import { FCFS } from "../../typeorms/entities/FCFS";
import { GuildConfiguration } from "../../typeorms/entities/GuildConfiguration";
import BaseCommand from "../../utils/structures/BaseCommand";



export default class create extends BaseCommand {
  constructor(
    private readonly fcfsConfigRepository = getRepository
    (FCFS),
    private readonly guildConfigRepository = getRepository
    (GuildConfiguration)
  ) {
    super('create', 'mod', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args.length) {
      message.channel.send('No arguments')
      return;
    }

    let adminChannel = message.channel.id;

    const configA = await this.guildConfigRepository.findOne({
      where: {
        channel: adminChannel,
      }
    });

    if(!configA)
    {
            message.channel.send(`You can't use it here`)
            return;
    }

      const spots = args[0];
      const roleId = args[1];
      const channel = args[2];
      const nGuild = args[3];

      console.log(spots)
      console.log(roleId)
        console.log(channel)

        const config = await this.fcfsConfigRepository.findOne({
          where: {
            channel: channel,
          }
        });

if(config) {

  message.channel.send("This FCFS already running")
} else{







     const newConfig =  this.fcfsConfigRepository.create({

        channel: channel,
        roleId: roleId,
        spots: spots,
        nGuildId: nGuild


})
const savedConfig = await this.fcfsConfigRepository.save(newConfig)
await this.fcfsConfigRepository.save(savedConfig);
message.channel.send("FCFS created")
}}}  ;

import { Collection, Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { io } from 'socket.io-client';
//import { testMessage } from '../mod/soketcommands';
import { UserConfig } from '../../typeorms/entities/UserConfig';
import { getPartialGuilds } from '../../utils/requests/GetUserGuilds';



export default class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
  //  testMessage("lol")

    message.channel.send('Test command works');


  //  let b = await gG();
  //  console.log(b.toString() + "Я пытался ")



}}

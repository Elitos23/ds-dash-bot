
import { io } from 'socket.io-client';
import axios from 'axios';

import { Collection, Guild, Message, User } from 'discord.js';
import { getRepository } from 'typeorm';
import BaseCommand from '../../utils/structures/BaseCommand';
import { UserConfig } from '../../typeorms/entities/UserConfig';
import DiscordClient from '../../client/client';
import { getPartialGuilds } from '../../utils/requests/GetUserGuilds';
import { FCFS } from '../../typeorms/entities/FCFS';








export default class find extends BaseCommand {
  constructor(
    private readonly fcfsConfigRepository = getRepository
    (FCFS),
    private readonly guildConfigRepository = getRepository
    (UserConfig)
  ) {
    super('claim', 'mod', []);
  }




  async run(client: DiscordClient, message: Message) {
  let userId = message.author.id;
  console.log(userId);



  let channel = await message.channel.id;



  let config = await this.guildConfigRepository.findOne({ where: {discordId: userId} });

  if(config){
    console.log(config.accessToken + " Geted access token");

    const configC = await this.fcfsConfigRepository.findOne({
      where: {
        channel: channel,
      }
    });



    let accessToken = config.accessToken;
if(configC){
  let nGi = (configC.nGuildId).toString()
  console.log((nGi) + " Getted Needed Guild Id")

  let userRoles = await getPartialGuilds(accessToken, nGi);
 console.log(userRoles.toString() + "   Returned value ")
  const configR = await this.fcfsConfigRepository.findOne({
    where: {
      roleId: userRoles,
    }
  });
if(configR){

console.log("role find")
message.channel.send("Spot Claimed")

let spotsNumString = (configC.spots).toString();

let spotsNum = Number(spotsNumString);

console.log(spotsNumString + " Workaet")
console.log(spotsNum);
let updatedSpots = (spotsNum - 1).toString();
console.log(updatedSpots)


}else{
  message.channel.send("You don't have needed holder role for this FCFS")
}

}else{
  message.channel.send("No runnig FCFS")
return;


}

  } else {
    message.channel.send('No User Id, or No active fcfs, or wrong channel')
    console.log('Discord User ID not found in the Database')
    return;
  }

}
}











//создание функций
/*export function testMessage (data: string){

  const socket = io('http://localhost:3001');//connection
  data= "lol test passed "
  socket.emit("testing", data)
  console.log('message sended ')}




*/

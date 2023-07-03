
require('dotenv').config();
import 'reflect-metadata';
import { registerCommands, registerEvents } from './utils/registry';
import config from '../slappey.json';
;
import DiscordClient from './client/client';
import { Collection, Intents } from 'discord.js';
import { createConnection, getRepository } from 'typeorm';
import { GuildConfiguration } from './typeorms/entities/GuildConfiguration';
import { io } from 'socket.io-client';
import { UserConfig } from './typeorms/entities/UserConfig';
import { FCFS } from './typeorms/entities/FCFS';



const client = new DiscordClient({ intents: [
   Intents.FLAGS.GUILDS,
   Intents.FLAGS.GUILD_MESSAGES,
   Intents.FLAGS.GUILD_MEMBERS,

  ]
});

(async () => {









  const socket = io('http://localhost:3001');//connection
  socket.on('testGuilds', (data: string) => {

      console.log('message: ' + data);
    });

  //event listener
  socket.on('guildPrefixUpdate',(config: GuildConfiguration) => {
    console.log('guildPrefixUpdate');

    client.configs.set(config.guildId, config);
  })

  socket.on('wlroleUpdate',(config: GuildConfiguration) => {
    console.log('wlroleUpdate');

    client.configs.set(config.guildId, config);
  })

  socket.on('channelUpdate',(config: GuildConfiguration) => {
    console.log('channelUpdate');

    client.configs.set(config.guildId, config);
  })









  await createConnection({
    type: 'mariadb',
    host: process.env.MYSQL_DB_HOST,
    port: 3306,
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
    synchronize: true,
    entities: [GuildConfiguration, UserConfig, FCFS ]
    });
    console.log('Connected')


//  client.prefix = config.prefix || client.prefix;
const configRepo = getRepository(GuildConfiguration);
const guildConfigs = await configRepo.find();
const configs = new Collection<string, GuildConfiguration>();

guildConfigs.forEach((config) =>
configs.set(config.guildId, config)
)


client.configs = configs;




  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DJS_BOT_TOKEN);

})();

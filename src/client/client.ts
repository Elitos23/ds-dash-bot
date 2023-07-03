import { Client, ClientOptions, Collection, User } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import BaseCommand from '../utils/structures/BaseCommand';
import { GuildConfiguration } from '../typeorms/entities/GuildConfiguration';
import { UserConfig } from '../typeorms/entities/UserConfig';
import { FCFS } from '../typeorms/entities/FCFS';


export default class DiscordClient extends Client {

  private _commands = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _prefix: string = '!';
  private _configs = new Collection<string, GuildConfiguration>();
  private _userConfigs = new Collection<string, UserConfig>();
  private _fcfsconfigs = new Collection<string, FCFS>();

  constructor(options: ClientOptions) {
    super(options);
  }

  get commands(): Collection<string, BaseCommand> {
    return this._commands;
   }

  get events(): Collection<string, BaseEvent> {
    return this._events;
   }

  get prefix(): string {
    return this._prefix;
  }

  set prefix(prefix: string) {
     this._prefix = prefix;
     }

     get wlrole(): string {
       return this._prefix;
     }

     set wlrole(prefix: string) {
        this._prefix = prefix;
        }

  set configs(guildConfigs: Collection<string, GuildConfiguration>){
    this._configs = guildConfigs;
  }
  get configs() {
    return this._configs;
  }

  set fcfsconfigs(fcfsConfig: Collection<string, FCFS>){
    this._fcfsconfigs = fcfsConfig;
  }
  get fcfsConfigs() {
    return this._fcfsconfigs;
  }
  set userConfigurations(userConfigs: Collection<string, UserConfig>){
    this._userConfigs = userConfigs;

  }

  get userConfigurations() {
    return this._userConfigs;
  }


  }

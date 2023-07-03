import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'fcfs_config'})

export class FCFS {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'spots', default: '20'})
spots: string;

  @Column({name: 'roleId'})
  roleId: string;

  @Column({name: 'channel'})
  channel: string;

  @Column({name: 'message'})
  message: string;

  @Column({name: 'nGuildId'})
  nGuildId: string;





}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })

export class UserConfig {
  

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: 'discord_id'})
  discordId: string;

  @Column({name: 'accessToken' })
  accessToken: string;

  @Column({ name: 'refreshToken'})
  refreshToken: string;


    @Column()
    username: string;

    @Column()
    discriminator: string;
}

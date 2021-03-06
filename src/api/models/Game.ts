import { IsNotEmpty } from 'class-validator';
import {
  BeforeInsert, Column, CreateDateColumn, DefaultNamingStrategy, Entity, Generated, JoinTable,
  ManyToMany, OneToMany, PrimaryColumn, Unique, UpdateDateColumn
} from 'typeorm';

import * as types from '../../constants';
import { Log } from '../models/Log';
import { User } from '../models/User';

@Entity()
@Unique(['number'])
export class Game extends DefaultNamingStrategy {

  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  @Generated('increment')
  public number: number;

  @IsNotEmpty()
  @Column()
  public name: string;

  @IsNotEmpty()
  @Column()
  public state: number;

  @IsNotEmpty()
  @Column({ name: 'players_max' })
  public playersMax: number;

  @IsNotEmpty()
  @Column({ name: 'players_min' })
  public playersMin: number;

  @IsNotEmpty()
  @Column({ name: 'game_info' })
  public gameData: string;

  @IsNotEmpty()
  @Column({ name: 'is_private' })
  public isPrivate: boolean;

  @Column({ name: 'private_password', nullable: true })
  public privatePassword: string;

  @OneToMany(type => User, user => user.openedGame)
  public playersOnline: User[];

  @ManyToMany(type => User, user => user.currentGames)
  @JoinTable({ name: 'user_current_game_to_game_players' })
  public players: User[];

  @OneToMany(type => User, user => user.currentWatch)
  public watchers: User[];

  @ManyToMany(type => User, user => user.currentMove)
  @JoinTable({ name: 'user_current_move_to_game_next_players' })
  public nextPlayers: User[];

  @IsNotEmpty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @IsNotEmpty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @OneToMany(type => Log, log => log.game)
  public logs: Log[];

  public toString(): string {
    return `${this.name}`;
  }

  @BeforeInsert()
  public async setState(): Promise<void> {
    this.state = types.GAME_NOT_STARTED;
  }

}

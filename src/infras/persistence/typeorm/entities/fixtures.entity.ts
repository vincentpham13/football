import "reflect-metadata";
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { TeamEntity } from './team.entity';
import { dateTransformer } from '../../../utils';
import { TournamentEntity } from './tournament.entity';

@Entity('fixtures')
export class FixtureEntity extends BaseEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  homeTeamId: string;

  @ManyToOne(() => TeamEntity, { eager: false })
  @JoinColumn({ name: 'homeTeamId', referencedColumnName: 'id' })
  // @TypeormLoader()
  homeTeam: TeamEntity;

  @Column()
  @AutoMap()
  awayTeamId: string;

  @ManyToOne(() => TeamEntity, { eager: false })
  @JoinColumn({ name: 'awayTeamId', referencedColumnName: 'id' })
  awayTeam: TeamEntity;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
    transformer: dateTransformer,
  })
  @AutoMap()
  matchDateTime: string;

  @Column()
  @AutoMap()
  homeTeamScore: number;

  @Column()
  @AutoMap()
  awayTeamScore: number;

  @Column()
  @AutoMap()
  tournamentId: string;

  @Column()
  @AutoMap()
  location: string;

  @Column()
  @AutoMap()
  live: boolean;

  @ManyToOne(() => TournamentEntity, (tournament: TournamentEntity) => tournament.fixtures, {
    eager: false,
  })
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;
}

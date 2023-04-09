import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { AutoMap } from '@automapper/classes';

import { dateTransformer } from '@/infras/utils';

import { FixtureEntity } from './fixtures.entity';

@Entity('tournaments')
@ObjectType()
export class TournamentEntity extends BaseEntity {
  @PrimaryColumn()
  @Field((type) => ID)
  @AutoMap()
  id!: string;

  @Column()
  @Field()
  @AutoMap()
  name!: string;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
    transformer: dateTransformer,
  })
  startDate: string;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
    transformer: dateTransformer,
  })
  endDate: string;

  @OneToMany(() => FixtureEntity, (fixture: FixtureEntity) => fixture.tournament)
  fixtures!: string;
}

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

@Entity('teams')
@ObjectType()
export class TeamEntity extends BaseEntity {
  @PrimaryColumn()
  @Field((type) => ID)
  @AutoMap()
  id!: string;

  @Column()
  @Field()
  @AutoMap()
  name!: string;
}

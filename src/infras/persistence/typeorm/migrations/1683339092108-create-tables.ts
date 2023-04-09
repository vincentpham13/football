import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1683339092108 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
          CREATE TABLE IF NOT EXISTS teams
          (
              id   char(36)     not null primary key,
              name varchar(255) null
          );

          CREATE TABLE IF NOT EXISTS tournaments
          (
              id        char(36)     not null
                  primary key,
              name      varchar(255) null,
              startDate datetime     null,
              endDate   datetime     null
          );

          CREATE TABLE IF NOT EXISTS fixtures
          (
              id            char(36)             not null
                  primary key,
              tournamentId  char(36)             null,
              homeTeamId    char(36)             null,
              awayTeamId    char(36)             null,
              matchDateTime timestamp            null,
              homeTeamScore int                  null,
              awayTeamScore int                  null,
              location      varchar(50)          null,
              live          tinyint(1) default 0 null
          );

          CREATE INDEX fixtures_ibfk_1
              on fixtures (tournamentId);

          CREATE INDEX fixtures_ibfk_2
              on fixtures (homeTeamId);

          CREATE INDEX fixtures_ibfk_3
              on fixtures (awayTeamId);
      `);
  }

  // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<void> {}
}

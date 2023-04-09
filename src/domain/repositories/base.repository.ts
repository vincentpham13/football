export interface BaseRepository<T> {
  find(): Promise<T[]>;
  findByIds(ids: string[]): Promise<T[]>;
}

import Dexie from 'dexie';
import { ICachedModel } from './';

export class CacheRepository extends Dexie {
  cacheTable: Dexie.Table<ICachedModel, string>;

  constructor(public ttl: number = 1000 * 60) {
    super('Database');
    this.version(1).stores({
      cache: 'key, data, timestamp',
    });
    this.cacheTable = this.table('cache');
  }

  async load<T>(key: string, callback: () => Promise<T>, ttl: number | undefined = undefined): Promise<T> {
    const cache = await this.cacheTable.get(key);
    const isExpired = (cache?.timestamp || 0) < Date.now() - (ttl || this.ttl);

    if (!cache || isExpired) {
      const result: T = await callback();
      await this.cacheTable.put(
        {
          key: key,
          data: result,
          timestamp: Date.now(),
        },
        key
      );

      return result;
    }

    return cache.data as T;
  }

  async get<T>(key: string): Promise<T> {
    return ((await this.cacheTable.get(key)) || { data: {} }).data as T;
  }

  clear(key: string) {
    void this.cacheTable.delete(key);
  }

  clearAll() {
    void this.cacheTable.clear();
  }
}

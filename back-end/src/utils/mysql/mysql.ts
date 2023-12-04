import mysql2, { PoolOptions } from "mysql2";

export default class Mysql {
  private pool: mysql2.Pool;

  constructor(poolOptions: PoolOptions) {
    this.pool = mysql2.createPool(poolOptions);
  }

  public async executeQuery<T extends mysql2.RowDataPacket>(
    query: string,
    values?: string[]
  ): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.pool.query<T[]>(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async closePool(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pool.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

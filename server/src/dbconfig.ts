export const DbConfig =
  process.env.NODE_ENV === 'production'
    ? { url: process.env.DB_URL }
    : {
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'localdb',
      synchronize: true,
    };
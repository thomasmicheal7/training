import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";
import * as dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  extra: { max: 5, min: 2 }, // connection pool
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ["dist/src/entity/*.js"],
  migrations: ["dist/src/db/migrations/*.js"]
});

export default dataSource;
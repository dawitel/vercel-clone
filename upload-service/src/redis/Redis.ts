import { createClient } from "redis";

export class RedisConection {
  public publisher;
  public subscriber;

  constructor() {
    this.publisher = createClient().connect();
    this.subscriber = createClient().connect();
  }
}

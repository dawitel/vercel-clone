import { createClient } from "redis";

export class RedisConfig {
    public publisher
    public subscriber
    constructor(){
        this.publisher = createClient().connect()
        this.subscriber = createClient().connect()
    }
}
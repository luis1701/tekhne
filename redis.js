const redis = require('redis')

class RedisClient {
    constructor() {
        this.redisConnection = redis.createClient();
    }

    async getCacheValue(key) {
        try {
            this.redisConnection.connect()
            const result = await this.redisConnection.get(key)
            return result;
        } catch (e) {
            console.log('error in get cache');
        } finally {
            this.redisConnection.disconnect()
        }
    }

    setCacheValue(key, value) {
        try {
            this.redisConnection.connect()
            this.redisConnection.set(key, value);
        } catch (e) {
            console.error('error in set cache value');
        } finally {
            this.redisConnection.disconnect()
        }
    }
}

module.exports = new RedisClient();
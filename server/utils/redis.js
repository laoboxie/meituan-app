import Redis from 'ioredis'

let redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
})

export default redis
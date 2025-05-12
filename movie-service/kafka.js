// kafka.js
const { Kafka } = require('kafkajs');

let producer;

const kafka = new Kafka({
  clientId: 'movie-service',
  brokers: ['localhost:9092'], // or your Kafka container hostname
});

async function connectKafka() {
  producer = kafka.producer();
  await producer.connect();
  console.log('✅ Kafka producer connected');
}

async function publishEvent(topic, message) {
  if (!producer) {
    throw new Error('Kafka producer is not connected');
  }

  await producer.send({
    topic,
    messages: [
      { value: JSON.stringify(message) }
    ],
  });

  console.log(`📤 Event published to ${topic}:`, message);
}

module.exports = {
  connectKafka,
  publishEvent,
};

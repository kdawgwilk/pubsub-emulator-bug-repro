import { PubSub } from '@google-cloud/pubsub';

async function main() {
  console.log('Initializing PubSub client...');
  const pubsub = new PubSub();
  const topic = pubsub.topic('TestPubSub');
  console.log('Publishing messages...');

  for (const value of Array.from({ length: 100 }, (_, i) => i)) {
    await topic.publishMessage({ json: { test: `Test: ${value}` } });
    console.log(`Published message with value: ${value}`);
  }
  
  console.log('All messages published successfully!');
  await pubsub.close();
}

main().catch(console.error);

import { CloudEvent, logger } from 'firebase-functions/v2';
import { MessagePublishedData, onMessagePublished } from 'firebase-functions/v2/pubsub';

export const pubsubTestFunction = onMessagePublished(
  { topic: 'TestPubSub' },
  async (event: CloudEvent<MessagePublishedData<{ test: string }>>): Promise<void> => {
    const value = event.data.message.json.test;

    logger.info('Event Handler', value)
  }
);

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class MessageBrokerService {
  private messageConsumer: Consumer;

  constructor(private configService: ConfigService) {
    const clientId = this.configService.get('messageBroker.CLIENT_ID');
    const brokers = this.configService.get('messageBroker.BROKERS');
    const groupId = this.configService.get('messageBroker.GROUP_ID');
    const topics = this.configService.get('messageBroker.TOPICS');
    console.log(
      clientId,
      groupId,
      brokers,
      '.................................',
    );
    const kafka = new Kafka({ clientId, brokers });
    this.messageConsumer = kafka.consumer({ groupId });
    this.connect()
      .then(() => {
        this.consumeMessage(topics, false);
      })
      .catch((error) => {
        console.log(error);
        if (this.messageConsumer) {
          this.disconnect();
        }
      });
  }

  async connect() {
    console.log('connecting =================');
    await this.messageConsumer.connect();
  }

  async disconnect() {
    await this.messageConsumer.disconnect();
  }

  async consumeMessage(topics: string[], fromBeginning: boolean = false) {
    await this.messageConsumer.subscribe({ topics, fromBeginning });
    await this.messageConsumer.run({
      eachMessage: async ({ message, topic, partition }) => {
        console.log(`Received message: ${message.value.toString()}`);
        console.log(topic);
        console.log(partition);
      },
    });
  }
}

import { MsgPayload } from '@cencosud-x/cencosud-x-kafka-plugin';
import Message from './Message';

describe('Message', () => {
  const createDummyKafkaMsg = (): MsgPayload => ({
    headers: {},
    key: null,
    value: null,
    offset: '1',
    partition: 1,
    timestamp: Date.now().toString(),
    attributes: 1,
    topic: 'test.topic',
  });

  it('should be able to create a Message', () => {
    const msg = new Message(
      { hello: 'world' },
      {
        id: '1',
        content_type: 'application/json',
        created_at: Date.now().toString(),
        source: 'default',
        topic: 'none',
        version: 'v1.1.1',
      }
    );
    expect(msg).toBeDefined();
    expect(msg.headers.content_type).toEqual('application/json');
  });

  it('when called Message.fromKafkaMessage with json value get proper content_type header', async () => {
    const kafkaMsg = createDummyKafkaMsg();
    kafkaMsg.value = Buffer.from('{"hello": "world"}');
    const msg = Message.fromKafkaMessage(kafkaMsg);
    expect(msg).toBeDefined();
    expect(msg.success).toBeTruthy();
    if (msg.success) {
      expect(msg.data.headers.content_type).toEqual('application/json');
      expect(msg.data.headers.version).toEqual('v1.0.0');
      expect(msg.data.body).toBeInstanceOf(Object);
      expect((msg.data.body as Record<string, string>)['hello']).toEqual('world');
    }
  });

  it('when called Message.fromKafkaMessage without headers should get default headers', async () => {
    const msg = Message.fromKafkaMessage(createDummyKafkaMsg());
    expect(msg).toBeDefined();
    expect(msg.success).toBeTruthy();
    if (msg.success) {
      expect(msg.data.headers.source).toEqual('unknown');
      expect(msg.data.headers.version).toEqual('v1.0.0');
    }
  });

  it('when called Message.fromKafkaMessage keep default headers from kafka msg', () => {
    const dummyKafkaMsg = createDummyKafkaMsg();
    dummyKafkaMsg.headers = { version: 'v2.0.0', id: 'my-id' };
    const msg = Message.fromKafkaMessage(dummyKafkaMsg);
    expect(msg).toBeDefined();
    expect(msg.success).toBeTruthy();
    if (msg.success) {
      expect(msg.data.headers.version).toEqual('v2.0.0');
      expect(msg.data.headers.id).toEqual('my-id');
    }
  });

  it('when called Message.fromKafkaMessage with invalid content_type header transform it to application/unknown', () => {
    const dummyKafkaMsg = createDummyKafkaMsg();
    dummyKafkaMsg.headers = { content_type: 'invalid' };
    const msg = Message.fromKafkaMessage(dummyKafkaMsg);
    expect(msg).toBeDefined();
    expect(msg.success).toBeTruthy();
    if (msg.success) {
      console.log(msg.data.headers.content_type);
      expect(msg.data.headers.content_type).toEqual('application/unknown');
    }
  });

  it('when called Message.fromKafkaMessage with custom headers keep them, avoid undefined, and add default ones', () => {
    const dummyKafkaMsg = createDummyKafkaMsg();
    dummyKafkaMsg.headers = {
      custom: 'custom header',
      buff: Buffer.from('custom buffer'),
      none: undefined,
      arr: ['uno', 'dos'],
    };
    const msg = Message.fromKafkaMessage(dummyKafkaMsg);
    expect(msg).toBeDefined();
    expect(msg.success).toBeTruthy();
    if (msg.success) {
      console.log(msg.data.headers.content_type);
      expect(msg.data.headers.content_type).toEqual('application/unknown');
      expect(msg.data.headers['version']).toEqual('v1.0.0');
      expect(msg.data.headers['custom']).toEqual('custom header');
      expect(msg.data.headers['buff']).toEqual('custom buffer');
      expect(msg.data.headers['arr']).toEqual('uno,dos');
    }
  });
});

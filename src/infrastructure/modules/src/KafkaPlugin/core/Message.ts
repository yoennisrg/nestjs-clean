import { Batch } from 'kafkajs';

import { MsgPayload } from '@cencosud-x/cencosud-x-kafka-plugin';
import { Core } from '@team_seki/event-streamer-base';
import { IHeaders } from './Publisher';

type Result<T> = { success: true; data: T } | { success: false; error: Error };

export type IMsgPayload = MsgPayload;

export type BatchMsg<T> = {
   values: T[]; messages: MsgPayload[]
}

export default class Message implements Core.Definitions.IMessage {
  constructor(public body: string | object, public headers: Core.Definitions.IHeader) {}

   static getHeaders = (headerContent?: IHeaders): Partial<Core.Definitions.IHeader> => {
    const validContentTypes: Core.Definitions.IHeader['content_type'][] = [
      'text/html',
      'application/json',
      'application/xml',
      'application/unknown',
    ];

    const headers: Partial<Core.Definitions.IHeader> = Object.entries(headerContent ?? {}).reduce(
        (acc, [key, val]) => (val ? { ...acc, [key]: val.toString() } : acc),
        {}
      );
      if (
        headers['content_type'] &&
        !validContentTypes.some((ct) => headers['content_type'] === ct)
      )
        headers['content_type'] = 'application/unknown';

    return headers
  }

  static fromKafkaMessage(m: MsgPayload): Result<Message> {
    try {
      let headers: Partial<Core.Definitions.IHeader> = this.getHeaders(m.headers as IHeaders);
      let body: object | string = m.value?.toString() ?? 'null';

      if (body.startsWith('{')) {
        try {
          const formattedMessage: Core.Definitions.IMessage = JSON.parse(body);
          headers = { ...headers, ...formattedMessage.headers };
          headers.content_type = 'application/json';
          body = formattedMessage.body ?? formattedMessage;
          // eslint-disable-next-line no-empty
        } catch (ex) {}
      }

      return {
        success: true,
        data: new Message(body, {
          ...headers,
          content_type: headers.content_type ?? 'application/unknown',
          id: headers.id ?? m.key?.toString() ?? `${m.partition}:${m.offset}:${m.timestamp}`,
          topic: headers.topic ?? m.topic,
          created_at: headers.created_at ?? m.timestamp,
          version: headers.version ?? 'v1.0.0',
          source: headers.source ?? 'unknown',
        }),
      };
    } catch (ex) {
      return {
        success: false,
        error: ex as Error,
      };
    }
  }

  static fromKafkaBatch(b: Batch & { version?: string, source?: string, created_at?: string, id?: string}): Result<Message> {
    try {
      const body: object = b.messages.filter(m => m.value != null).reduce<BatchMsg<object|string>>((acc, msg)=>{

        let bodyMsg: object|string = msg.value?.toString() ?? 'null';
  
        if (bodyMsg.startsWith('{')) {
          try {
            const formattedMessage: object = JSON.parse(bodyMsg);
            bodyMsg = formattedMessage;
            // eslint-disable-next-line no-empty
          } catch (ex) {}
        }
  
        acc.values.push(bodyMsg);
        acc.messages.push({ ...msg , topic: b.topic, partition: b.partition });    
  
        return acc
      }, { values: [], messages: [] })
      
      return {
        success: true,
        data: new Message(body, {
          content_type: 'application/json',
          id: b.id ?? `${b.partition}:${b.firstOffset()}:${b.lastOffset()}`,
          topic: b.topic,
          created_at: b.created_at ?? `${new Date().getTime()}`,
          version: b.version ?? 'v1.0.0',
          source: b.source ?? 'unknown',
        }),
      };
    } catch (ex) {
      return {
        success: false,
        error: ex as Error,
      };
    }
  }
}

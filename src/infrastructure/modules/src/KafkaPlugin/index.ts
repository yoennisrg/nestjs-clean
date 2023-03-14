export * from './core/IHandler'
export * from './core/Publisher'
import IMessage, {BatchMsg, IMsgPayload as MsgPayload} from './core/Message'

export interface Identifier {
  consumer: string;
  publisher: string
}

export {
  IMessage,
  BatchMsg,
  MsgPayload,
}
export class NewsCreatedEvent {
  constructor(props: any) {
    this.objectID = props.objectID;
    this.payload = props.payload;
  }

  objectID: number;
  payload: any;
}

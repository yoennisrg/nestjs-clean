export class CreateDomianEvent {
  constructor(props: any) {
    this.objectID = props.objectID;
    this.payload = props.payload;
  }

  objectID: number;
  payload: any;
}

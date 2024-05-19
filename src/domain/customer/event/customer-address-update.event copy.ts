import EventInterface from "../../@shared/event/event.interface";

export default class CustomerAddressUpdateddEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: {id: string, endereco: string}) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}

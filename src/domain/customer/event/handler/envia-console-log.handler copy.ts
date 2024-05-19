import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressUpdateddEvent from "../customer-address-update.event copy";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressUpdateddEvent>
{
  handle(event: CustomerAddressUpdateddEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, {nome} alterado para: ${event.eventData.endereco}"`); 
  }
}

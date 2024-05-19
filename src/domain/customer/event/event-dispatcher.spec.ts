import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import CustomerAddressUpdateddEvent from "./customer-address-update.event copy";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler copy";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const eventHandler3 = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.register("CustomerAddressUpdateddEvent", eventHandler3);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      2
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);


    expect(
      eventDispatcher.getEventHandlers["CustomerAddressUpdateddEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressUpdateddEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressUpdateddEvent"][0]
    ).toMatchObject(eventHandler3);
  });

  it("should notify all event handlers after CustomerCreatedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify all event handlers after CustomerAddressUpdateddEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressUpdateddEvent", eventHandler);

    const customerCreatedEvent = new CustomerAddressUpdateddEvent({id: "123", endereco: "endereco"});

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});

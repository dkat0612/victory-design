export interface IListener {
    subscribe(eventTypes: string[]): void;
    listenerService: ListenerService;
}

class TaListenerService {
    public listeners: Array<Array<IListener>> = [];
    public callbacks: string[] = [];
    constructor() { }

    private find(event: string, listener: IListener) {
        if (this.listeners[event] == undefined || this.listeners[event] == null) return null;
        var index = this.listeners[event].indexOf(listener);
        if (index < 0) return null;
        return this.listeners[event][index];
    }

    private contains(event: string, listener: IListener): boolean {
        if (this.listeners[event] == undefined || this.listeners[event] == null) return false;
        var index = this.listeners[event].indexOf(listener);
        return index >= 0;
    }

    public Subscribe(events: string[], listener: IListener) {
        var self = this;
        events.forEach((event) => {
            if (this.listeners[event] == undefined) {
                this.listeners[event] = [];
            }
            if (!this.contains(event, listener)) {
                this.listeners[event].push(listener);
            }
        });
    }

    public Unsubscribe(events: string[], listener: IListener) {
        events.forEach(event => {
            _(this.listeners[event]).remove(l => l == listener).commit();
        });
    }

    public Notify(event: string, ...params: any[]) {
        if (this.listeners[event] == undefined) return;
        var self = this;
        this.listeners[event].forEach((listener) => {
            listener[self.callbacks[event]].apply(listener, params);
        });
    }

    protected Emit(event: string, ...params: any[]) {
        params.unshift(event);
        this.Notify.apply(this, params);
    }
}

export const EventTypes = {
    CART_CLEARED: 'CART_CLEARED'
}

export interface IOnCartClearedListener extends IListener {
    onCartCleared();
}

class ListenerService extends TaListenerService {
    constructor() {
        super();
        this.callbacks[EventTypes.CART_CLEARED] = 'onCartCleared';
    }

    emitCartCleared() {
        this.Emit(EventTypes.CART_CLEARED);
    }
}

ListenerService.$inject = [];

export const NAME: string = 'vcListenerService';

export default ListenerService;
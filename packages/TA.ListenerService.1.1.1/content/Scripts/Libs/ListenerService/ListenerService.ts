export interface IListener {
    subscribe(eventTypes: string[]): void;
    listenerService: ListenerService;
}

export class ListenerService {
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
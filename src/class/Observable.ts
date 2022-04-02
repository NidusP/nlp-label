type Key = string|number
class Observable {
    private _handlers: Map<Key, Function[]>
    constructor(){
        this._handlers = new Map
    }

    public on(t:Key, handler: Function){
        if(!this._handlers.has(t)){
            this._handlers.set(t, [])
        }
        this._handlers.get(t)?.push(handler)
        return this
    }

    public emit(t: Key, data?: any){
        if(this._handlers.has(t)) {
            this._handlers.get(t)?.forEach(fn => fn(data))
        }
    }

    public remove(t:Key){
        if(this._handlers.has(t)) {
            this._handlers.delete(t)
        }
    }
}

export default Observable
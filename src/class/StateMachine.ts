import { Actions } from "./label.types";
import Observable from "./Observable";

type StateTransferFn = (...args: any[]) => void
// S -> state A -> action
export default class StateMachine<S extends string | number, A extends string | number> extends Observable {
    private _state: S
    private _transferTable: Map<S, Map<A, [StateTransferFn|undefined, S]>>;
    constructor(initialState: S){
        super()
        this._state = initialState
        this._transferTable = new Map()
    }

    public get state(){
        return this._state
    }

    private addTransfer(from:S, to: S, action: A, fn?: StateTransferFn){
        if(!this._transferTable.has(from)) {
            this._transferTable.set(from, new Map())
        }
        this._transferTable.get(from)?.set(action, [fn, to])
    }

    public register(from: S|S[], to: S, action: A, fn?: StateTransferFn){
        if(Array.isArray(from)){
            from.forEach(f => {
                this.addTransfer(f, to, action, fn)
            })
        } else {
            this.addTransfer(from, to, action, fn)
        }
    }

    public dispatch(action: A, ...data: any[]){
        const adjTable = this._transferTable.get(this._state)
        const transfer = adjTable?.get(action)
        console.log(this._state, adjTable, action, transfer, 'dispatch')
        if(!transfer) return 
        const [fn, nextState] = transfer
        fn && fn(...data)
        this._state = nextState

        while(this.dispatch(Actions.AUTO as A, ...data))
        return true
    }
}
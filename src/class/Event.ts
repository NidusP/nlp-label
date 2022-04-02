import { v4 as uuidv4 } from 'uuid'
import { EventStates, Actions, LabelElement } from './label.types' 
// class LabelElement {
//     private endPara: number
//     private endSent: number
//     private endIndex: number
//     private startPara: number
//     private startSent: number
//     private startIndex: number
//     private text: string
//     private role: string
//     constructor({ endPara, endSent, endIndex, startPara, startSent, startIndex, text, role }:LabelElement){
//         this.endPara = endPara
//         this.endSent = endSent
//         this.endIndex = endIndex
//         this.startPara = startPara
//         this.startSent = startSent
//         this.startIndex = startIndex
//         this.role = role
//         this.text = text
//     }
// }

class Event {
    private _id:string 
    private _eventTypeId: number
    private _eventType: string
    private _trigger: LabelElement|undefined
    private _elements: LabelElement[]
    private _state!: number|string
    constructor(options:Event|undefined){
        this._id = options?.id || uuidv4()
        this._eventTypeId = options?.eventTypeId || 0
        this._eventType = options?.eventType || '0'
        this._elements = options?.elements || []

        this._trigger = options?.trigger
        // this._state = boolean ? EventStates.EXISTED : EventStates.LABELLING
        // this.trigger = new LabelElement(trigger)
        // this.elements = elements.map(e => new LabelElement(e))
    }

    public get id(){
        return this._id
    }

    public set state(state){
        this._state = state
    }
    public get state(){
        return this._state
    }

    public set trigger(trigger){
        this._trigger = trigger
    }
    public get trigger(){
        return this._trigger
    }

    public addElement(element: LabelElement){
        this._elements.push(element)
    }
    
    public set elements(elements){
        this._elements = elements
    }
    public get elements(){
        return this._elements
    }

    public set eventType(eventType){
        this._eventType = eventType
    }
    public get eventType(){
        return this._eventType
    }

    public set eventTypeId(eventTypeId){
        this._eventTypeId = eventTypeId
    }
    public get eventTypeId(){
        return this._eventTypeId
    }

    public toJson(){
        return {
            id: this._id,
            arguments: this._elements,
            trigger: this._trigger,
            type: this.state
        }
    }

    public getTriggerSelector(){
        return this.getElementSelector(this._trigger)
    }

    private getElementSelector(ele: LabelElement): string[]{
        const { startIndex, endIndex, startSent } = ele,
            arr = [];
        for(let index = startIndex; index < endIndex; index++){ 
            arr.push(`i[data-index='${index}'][data-sent='${startSent}']`)
        }
        return arr
    }

}

export default Event
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
type LabelElement = {
    endPara: number
    endSent: number
    endIndex: number
    startPara: number
    startSent: number
    startIndex: number
    text: string
    role: string
}
class Event {
    private id?:string 
    private eventTypeId: number
    private eventType: string
    private trigger: LabelElement
    private triggerAbbr!: HTMLElement
    private elements: LabelElement[]
    private isLabelled: boolean = false
    constructor({ id, trigger, eventType, eventTypeId, elements }:Event){
        this.id = id
        this.eventTypeId = eventTypeId
        this.eventType = eventType
        // this.trigger = new LabelElement(trigger)
        // this.elements = elements.map(e => new LabelElement(e))
        this.trigger = trigger
        this.elements = elements
        this.isLabelled = !!elements
    }

    public getId(){
        return this.id
    }

    public setTriggerAbbr(abbr: HTMLElement){
        this.triggerAbbr = abbr
    }

    public getTriggerAbbr(){
        return this.triggerAbbr
    }

    public getTrigger(){
        return this.trigger
    }

    public getElements(){
        return this.elements
    }
}

export default Event
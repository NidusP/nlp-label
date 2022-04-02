import StateMachine from './StateMachine'
import Observable from './Observable'
import Event from './Event'
import { EventRender, HtmlTag, slideToChoose } from '../utils/label'
import { EventStates, Actions, LabelElement } from './label.types' 
import { Sentence } from '../@types/sentence'

class LabelRender extends Observable {
    private _el!: HTMLElement
    public setFocus!: (content: any) => void

    constructor(container: HTMLElement, sentences: []){
        super()
        container.appendChild(this.renderArticle(sentences))
    }

    public get el(){
        return this._el
    }

    public renderLabelling(element: LabelElement){

    }

    private renderArticle(sentences: Sentence[]){
        const el = document.createElement(HtmlTag.ARTICLE)
        const paragraphs = new Map<number, Sentence[]>()
        sentences.forEach(sentence => {
            const { paraId } = sentence
            if(!paragraphs.has(paraId)) {
                paragraphs.set(paraId, [])
            }
            paragraphs.get(paraId)?.push(sentence)
        })

        // render para
        paragraphs.forEach((paragraph, paraId) => {
            el.appendChild(this.renderParagraph(paraId, paragraph))
        })
        
        el.classList.add('labeller')
        el.classList.add('article-label')
        this._el = el
        paragraphs.clear()
        return el
    }

    private renderParagraph(id: number, paragraph: Sentence[]):HTMLElement{
        const p = document.createElement(HtmlTag.P)
        p.dataset.id = id.toString()
        p.classList.add('paragraph')
        paragraph.forEach(sentence => {
            p.appendChild(this.renderSentence(sentence))
        })
        return p
    }

    private renderSentence(sentence: Sentence):DocumentFragment{
        const { content, sentId } = sentence
        const fragment = document.createDocumentFragment()
        content.split('').forEach((word, index) => {
            fragment.append(this.renderWord(sentId, index, word))
        })
        return fragment
    }

    private renderWord(sentId: number, index: number, word: string):HTMLElement{
        const i = document.createElement(HtmlTag.I)
        i.dataset.sent = sentId.toString()
        i.dataset.index = index.toString()
        i.innerText = word
        return i
    }
}
export class EntityLabelRender extends LabelRender {
    constructor(el: HTMLElement, entities: []){
        super(el, entities)
    }
}
export class EventLabelRender extends LabelRender {
    private _events: Map<string, Event> = new Map()
    private _hoverElements: [Element[], Element][] = []
    private _labellingEvent: Event|null
    constructor(container: HTMLElement, sentences: [], events: []){
        super(container, sentences)
        this._labellingEvent = null
        events.forEach(event => {
            this.renderEvent(this.createEvent(event))
        })
    }

    public set labellingEvent(event: Event|null){
        this._labellingEvent = event
    }
    public get labellingEvent(){
        return this._labellingEvent
    }

    public findEventById(id?: string){
        if(!id) return null
        return this._events.get(id)
    }

    public createEvent(event?: Event){
        const e = new Event(event)
        if(this._events.has(e.id)) {
            throw new Error('existed the same event id!')
        }
        this._events.set(e.id, e)
        return e
    }

    public labellingElement(element: LabelElement){
        this._labellingEvent?.addElement(element)
        this.caseRenderLabelElement(element)
    }

    public getEvents(){
        const all = {}
        this._events.forEach((event, id) => {
            const key = event.state + ''
            if(!all[key]) all[key] = []
            all[key].push(event.toJson())
        })
        return all
    }

    public renderEvent(event: Event){
        if(!event.trigger) throw new Error('this event dont have the trigger!')
        if(!this._events.has(event.id)){
            this._events.set(event.id, event)
        }
        this.renderTrigger(event, true)
    }

    /**
     *  render event trigger
     *  event show/hidden
     *   
    */
     private renderTrigger(event:Event, bool = true){
        if(!event) return
        if(bool){
            const [, a] = this.renderLabelElement(event.trigger)
            // save event id
            a.dataset.id = event.id
        } else {
            const nodes = this.getElementNodes(event.trigger)
            nodes.forEach(node => {
                node.classList.remove(EventRender.EVENT)
            })
        }
    }
    /**
     *  render event elements
     *  event show/hidden
     *   
    */
    public renderHoverEvent(event?: Event):void{
        // hidden
        if(!event) {
            this._hoverElements.forEach(([eleNodes, abbr]) => {
                eleNodes.forEach((eleNode) => {
                    eleNode.classList.remove(EventRender.ROLE)
                    eleNode.classList.remove(EventRender.EVENT)
                    if(eleNode.lastChild == abbr) eleNode.removeChild(abbr)
                })
                this._hoverElements = []
            })
            return 
        }
        // show
        console.log(event)
        const els = event.elements
        els.forEach(ele => {
            this.caseRenderLabelElement(ele)
        })
    }

    private getElementNodes(labelElement: any){
        const nodes = []
        const { startPara, startSent, startIndex, endIndex } = labelElement
        const p = this.el.querySelector(`[data-id='${startPara}']`)
        for(let index = startIndex; index < endIndex; index++){
            const i = p?.querySelector(`${HtmlTag.I}[data-index='${index}'][data-sent='${startSent}']`)
            nodes.push(i as HTMLElement)
        }
        return nodes
    }
    private caseRenderLabelElement(labelElement:LabelElement){
        this._hoverElements.push(this.renderLabelElement(labelElement))
    }
    private renderLabelElement(labelElement:LabelElement): [HTMLElement[], HTMLElement]{
        const labelEle = []
        const { startPara, startSent, startIndex, endIndex, role } = labelElement
        const p = this.el.querySelector(`[data-id='${startPara}']`)
        const a = document.createElement(HtmlTag.ABBR)
        const isEventElement = role !== EventRender.TRIGGER_ZH
        for(let index = startIndex; index < endIndex; index++){
            const i = p?.querySelector(`${HtmlTag.I}[data-index='${index}'][data-sent='${startSent}']`)
            
            // add event class 
            i?.classList.add(EventRender.EVENT)
            // add role class 
            if(isEventElement) i?.classList.add(EventRender.ROLE)
            
            if(index === endIndex - 1) {
                // console.log(i)
                a.innerText = isEventElement ? role : EventRender.TRIGGER_FLAG
                i?.appendChild(a)
            }
            labelEle.push(i as HTMLElement)
        }
        return [labelEle, a]
    }

}
import Article from './Article'
import Event from './Event'
import { EventRender, HtmlTag, slideToChoose } from '../utils/label'
import { EventStates, Actions } from './label.types' 
import StateMachine from './StateMachine'

class L extends StateMachine<EventStates> {
    private _article!: Article
    public _el!: HTMLElement
    constructor(){
        super(EventStates.EXISTED)
        if(this.constructor === L) throw new Error('please call static method createEventLabeller')
    }

    public static createEntityLabeller(container: HTMLElement){}

    public static createEventLabeller(container: HTMLElement, options: { sentences: [], events: [] }){
        const labeller = new EventLabeller(options.events)
        // // append article
        container.appendChild(this.createArticle(labeller, options.sentences))
        console.log(labeller, 'labeller', labeller.renderEvent())
        return labeller
    }

    public static createArticle(labeller: EventLabeller, sentences:[]){
        const el = document.createElement(HtmlTag.ARTICLE), 
            article = new Article(sentences);
        labeller.renderArticle(el, article)
        return el
    }
    private renderArticle(el: HTMLElement, article: Article){
        this._el = el
        this._article = article
        // render para
        this._article.paragraphs.forEach(para => {
            const eleP = this.renderParagraph(para.id)
            // render sent
            para.sentences.forEach(sent => {
                eleP.appendChild(sent.render())
            })
            el.appendChild(eleP)
        })
        el.classList.add('labeller')
        el.classList.add('article-label')
    }
    private renderParagraph(id: number):HTMLElement{
        const p = document.createElement(HtmlTag.P)
        p.dataset.id = id.toString()
        p.classList.add('paragraph')
        return p
    }
}

class EventLabeller extends L {
    private _events: Map<string, Event>
    private _hoverElements: [Element[], Element][] = []
    constructor(events: []){
        super()
        this._events = new Map()
        events.forEach(event => {
            const e = new Event(event)
            if(this._events.has(e.id)) {
                throw new Error('existed the same event id!')
            }
            this._events.set(e.id, e)
        })

        this.describeDelete()
    }
    
    private describeDelete(){
        this.register(EventStates.EXISTED, EventStates.DELETED, Actions.DELETE, (target, event) => {
            const targetPrev = target.previousSibling,
                targetNext = target.nextSibling
            
            if(targetPrev?.nodeName.toLocaleLowerCase() === HtmlTag.ABBR || targetNext?.nodeName.toLocaleLowerCase() === HtmlTag.ABBR) {
                
            } else {
                this.renderTrigger(event as Event, false)
            }
            target.remove()

            event.state = EventStates.DELETED
            this.emit(EventStates.DELETED, event)
        })

        this.register(EventStates.DELETED, EventStates.EXISTED, Actions.AUTO)
    }

    public renderEvent(){
        if(!this._el) return;
        this._events.forEach(event => {
            this.renderTrigger(event)
        })
        const eventLabeller = this
        this._el.addEventListener('mousedown', function(mouseEvent){
            const target = mouseEvent.target as HTMLElement
            target.classList.contains(EventRender.EVENT)
            const nodeName = target.nodeName.toLocaleLowerCase()
            if(mouseEvent.button === 1 && (nodeName === HtmlTag.ABBR)){
                mouseEvent.preventDefault()
                mouseEvent.stopPropagation()
                const event = eventLabeller.findEventById(target.dataset.id)
                event && eventLabeller.renderHoverEvent(event)
            }
        })

        this._el.addEventListener('mouseup', function(mouseEvent){
            mouseEvent.preventDefault()
            mouseEvent.stopPropagation()
            if(mouseEvent.button === 1){
                eventLabeller.renderHoverEvent()
            }else {
                slideToChoose(function(){

                })
            }
        })
        
        this._el.addEventListener('dblclick', function(mouseEvent){
            mouseEvent.preventDefault()
            mouseEvent.stopPropagation()
            const target = mouseEvent.target as HTMLElement
            const nodeName = target.nodeName.toLocaleLowerCase()
            if((nodeName === HtmlTag.ABBR)){
                const event = eventLabeller.findEventById(target.dataset.id)
                eventLabeller?.dispatch(Actions.DELETE, target, event)
            }
        })
    }

    private findEventById(id?: string){
        if(!id) return null
        return this._events.get(id)
    }

    private renderEventElement(ele: any){
        const [, a] = this.renderLabelElement(ele)
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
    private renderHoverEvent(event?: Event):void{
        // hidden
        if(!event) {
            this._hoverElements.forEach(([eleNodes, abbr]) => {
                eleNodes.forEach(eleNode => {
                    eleNode.classList.remove(EventRender.ROLE)
                    eleNode.classList.remove(EventRender.EVENT)
                    if(eleNode.lastChild == abbr) eleNode.removeChild(abbr)
                })
                this._hoverElements = []
            })
            return 
        }
        // show
        const els = event.elements
        els.forEach(ele => {
            // add event class 
            const [eleNodes, abbr] = this.renderLabelElement(ele)
            this._hoverElements.push([eleNodes, abbr])
            eleNodes.forEach(eleNode => {
                // add role class 
                eleNode.classList.add(EventRender.ROLE)
            })
        })
    }


    private getElementNodes(labelElement: any){
        const nodes = []
        const { startPara, startSent, startIndex, endIndex } = labelElement
        const p = this._el.querySelector(`[data-id='${startPara}']`)
        for(let index = startIndex; index < endIndex; index++){
            const i = p!.querySelector(`${HtmlTag.I}[data-index='${index}'][data-sent='${startSent}']`)
            nodes.push(i as HTMLElement)
        }
        return nodes
    }
    private renderLabelElement(labelElement:any): [HTMLElement[], HTMLElement]{
        const labelEle = []
        const { startPara, startSent, startIndex, endIndex, role } = labelElement
        const p = this._el.querySelector(`[data-id='${startPara}']`)
        const a = document.createElement(HtmlTag.ABBR)
        for(let index = startIndex; index < endIndex; index++){
            const i = p!.querySelector(`${HtmlTag.I}[data-index='${index}'][data-sent='${startSent}']`)
            i?.classList.add(EventRender.EVENT)
            if(index === endIndex - 1) {
                // console.log(i)
                a.innerText = role === '触发词' ? 'E' : role
                i?.appendChild(a)
            }
            labelEle.push(i as HTMLElement)
        }
        return [labelEle, a]
    }
}
type Labeller = EventLabeller
export default L
export {
    Labeller
}
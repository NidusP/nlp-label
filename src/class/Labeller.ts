import Article from './Article'
import Event from './Event'

type Options = {
    sentences: [],
    events: []
}

// abstract 
class Labeller {
    private article!: Article
    public el!: HTMLElement
    constructor(){
        if(this.constructor === Labeller) throw new Error('please call static method createEventLabeller')
    }

    public static createEntityLabeller(container: HTMLElement){}

    public static createEventLabeller(container: HTMLElement, options: Options){
        const labeller = new EventLabeller(options.events)
        // // append article
        container.appendChild(this.createArticle(labeller, options.sentences))
        console.log(labeller, 'labeller')
        return labeller.renderEvent()
    }

    private static createArticle(labeller: EventLabeller, sentences:[]){
        const el = document.createElement('article'), 
            article = new Article(sentences);
        labeller.renderArticle(el, article)
        return el
    }

    private renderArticle(el: HTMLElement, article: Article){
        this.el = el
        this.article = article
        // render para
        this.article.getParagraphs().forEach(para => {
            const eleP = this.renderParagraph(para.getId())
            // render sent
            para.getSentences().forEach(sent => {
                eleP.appendChild(sent.render())
            })
            el.appendChild(eleP)
        })
        el.classList.add('labeller')
        el.classList.add('article-label')
    }

    private renderParagraph(id: number):HTMLElement{
        const p = document.createElement('p')
        p.dataset.id = id.toString()
        p.classList.add('paragraph')
        return p
    }
}

class EventLabeller extends Labeller {
    private events: Event[]
    private hoverEvent!: Event | null
    private hoverElements: [Element[], Element][] = []
    constructor(events: []){
        super()
        this.events = events.map(event => new Event(event))
    }

    public renderEvent(){
        if(!this.el) return;
        this.events.forEach(event => {
            this.renderTrigger(event)
        })
        const eventLabeller = this
        this.el.addEventListener('mousedown', function(mouseEvent){
            const target = mouseEvent.target as Element
            console.log(target, 'target')
            mouseEvent.preventDefault()
            mouseEvent.stopPropagation()
            if(mouseEvent.button === 1 && target.nodeName === 'ABBR'){
                eventLabeller.hoverEvent = eventLabeller.findEventByAbbr(target)!
                const els = eventLabeller.hoverEvent.getElements()
                els.forEach(ele => {
                    const [eleNodes, abbr] = eventLabeller.renderLabelElement(ele)
                    console.log(eleNodes, abbr, 'eleNodes, abbr')
                    eventLabeller.hoverElements.push([eleNodes, abbr])
                    eleNodes.forEach(eleNode => {
                        eleNode.classList.add('role')
                    })
                })
                // eventLabeller.renderHoverElements(true)
            }
        })

        this.el.addEventListener('mouseup', function(mouseEvent){
            const target = mouseEvent.target
            mouseEvent.preventDefault()
            mouseEvent.stopPropagation()
            if(mouseEvent.button === 1 ){
                // eventLabeller.renderHoverElements(false)
                eventLabeller.hoverElements.forEach(([eleNodes, abbr]) => {
                    eleNodes.forEach(eleNode => {
                        eleNode.classList.remove('role')
                        eleNode.classList.remove('event')
                        if(eleNode.lastChild == abbr) eleNode.removeChild(abbr)
                    })
                })
                eventLabeller.hoverEvent = null
                eventLabeller.hoverElements = []
            }
        })
    }

    private findEventByAbbr(abbr: EventTarget | null){
        console.log(abbr, 'abbr')
        return this.events.find(event => event.getTriggerAbbr() === abbr)
    }

    private renderHoverElements(render: boolean):void{
        if(!this.hoverEvent) {
            this.hoverEvent = null
            return;
        } 
        const els = this.hoverEvent.getElements()
        els.forEach(ele => {
            const [eleNodes, ] = this.renderLabelElement(ele)
            console.log(eleNodes, 'eleNodes')
            eleNodes.forEach(eleNode => {
                eleNode.classList.add('role')
            })
        })
    }

    private renderTrigger(event:Event){
        console.log(event, 'event')
        const labelElement = event.getTrigger()
        const [, abbr] = this.renderLabelElement(labelElement)
        event.setTriggerAbbr(abbr)
    }

    private renderLabelElement(labelElement:any): [HTMLElement[], HTMLElement]{
        const labelEle = []
        const { startPara, startSent, startIndex, endIndex, role } = labelElement
        const p = this.el.querySelector(`[data-id='${startPara}']`)
        const abbr = document.createElement('abbr')
        for(let index = startIndex; index < endIndex; index++){
            const i = p!.querySelector(`i[data-index='${index}'][data-sent='${startSent}']`)
            i?.classList.add('event')
            if(index === endIndex - 1) {
                // console.log(i)
                abbr.innerText = role === '触发词' ? 'E' : role
                i?.appendChild(abbr)
                // event.setTriggerAbbr(abbr)
            }
            labelEle.push(i as HTMLElement)
        }
        return [labelEle, abbr]
    }
}

export default Labeller
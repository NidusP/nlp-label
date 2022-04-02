import StateMachine from "./StateMachine"
import Event from './Event'
import { EventStates, Actions, Mouse, LabelElement } from './label.types' 
import { EventRender, HtmlTag, slideToChoose } from '../utils/label'

class LabelEditor extends StateMachine<EventStates, Actions> {
    private _el: HTMLElement
    private _focus!: HTMLElement
    private _contextMenu!: HTMLElement
    public _labelling: LabelElement|null
    constructor(el: HTMLElement){
        super(EventStates.EXISTED)
        this._labelling = null
        this._el = el

        this.addListener()
        this.createContextMenu()
    }

    private createContextMenu() {
        const fragment = document.createDocumentFragment()
        const contextMenu = document.createElement('div')
        contextMenu.classList.add('label-context-menu')

        this._focus = this.createFocus()
        contextMenu.appendChild(this._focus)
        this._contextMenu = contextMenu
        this.closeContextMenu()

        contextMenu.addEventListener('click', (mouseEvent) => {
            mouseEvent.preventDefault();
            mouseEvent.stopPropagation();
            
            if((mouseEvent.target as HTMLElement).classList.contains('focus-item')) {
                console.log(this.state, 'this.state')
                this.emit(Actions.ADD, {
                    labelling: this._labelling,
                    type: this.state
                })
            } else {
                console.log('cancel')
                this.dispatch(Actions.CANCEL)
            }
            this.closeContextMenu()
        })

        fragment.appendChild(contextMenu)
        document.body.appendChild(fragment)
    }

    private createFocus() {
        const focus = document.createElement('div')

        focus.classList.add('focus-container')
        focus.innerHTML = `
            <li class="focus-item">选择一</li>
            <li class="focus-item">选择二</li>
        `
        return focus
    }

    public openContextMenu(clientX: number, clientY: number) {
        let contextMenu:HTMLElement|null = this._contextMenu, 
            focus:HTMLElement|null = this._focus;
        this._contextMenu.style.display = 'block'

        const menuWidth = contextMenu.clientWidth, 
            menuHeight = contextMenu.clientHeight,
            focusWidth = focus.clientWidth,
            focusHeight = focus.clientHeight;

        console.log(menuWidth, menuHeight, focusWidth, focusHeight)
        focus.style.top = ((menuHeight < focusHeight + clientY + 20) ? clientY - focusHeight : clientY) + 'px'
        focus.style.left = ((menuWidth < focusWidth + clientX + 15) ? clientX - focusWidth : clientX) + 'px'

        contextMenu = focus = null
    }

    public closeContextMenu() {
        this._contextMenu.style.display = 'none'
    }

    public setFocus(content: string|HTMLElement|[]){
        if(typeof content === 'string') {
            this._focus.innerHTML = `<ul class="focus-list">${content}</ul>`
            return 
        }
        if(content instanceof Node) {
            this._focus.innerHTML = ''
            this._focus.append(content)
            return 
        }
        content.forEach(item => {})
    }
    

    private addListener() {
        let mouseupTimeId: NodeJS.Timeout, mouseState: boolean, mousedownTime: number

        this._el.addEventListener('selectstart', (mouseEvent) => {
            if (!mouseState){
                mouseEvent.stopPropagation()
                mouseEvent.preventDefault()
            }
        })
        
        this._el.addEventListener('mousedown', (mouseEvent) => {
            console.log('mousedown')
            const target = mouseEvent.target as HTMLElement
            // console.log(target.classList.contains(EventRender.EVENT))
            const nodeName = target.nodeName.toLocaleLowerCase()
            if(mouseEvent.button === Mouse.MIDDLE && (nodeName === HtmlTag.ABBR)){
                mouseEvent.preventDefault()
                mouseEvent.stopPropagation()
                // check the event   
                this.dispatch(Actions.CHECK, target)
                
            } else {
                mouseState = true
                const millisecond = Date.now()
                if (mousedownTime && millisecond - mousedownTime < 500){ 
                    mouseState = false 
                }
                mousedownTime = millisecond
                // clear mouseup event      
                clearTimeout(mouseupTimeId)
            }
        })
    
        this._el.addEventListener('mouseup', (mouseEvent) => {
            console.log('mouseup')
            mouseEvent.preventDefault()
            mouseEvent.stopPropagation()
            if(mouseEvent.button === Mouse.MIDDLE){
                // eventLabeller.renderHoverEvent()
      
                // this.emit(Actions.HIDDEN)

                // hidden the elements   
                this.dispatch(Actions.HIDDEN)
            } else {
                // start delay
				mouseupTimeId = setTimeout(() => {
                    const choose = slideToChoose()
                    if(choose) {
                        this?.dispatch(Actions.ADD, choose, mouseEvent.clientX, mouseEvent.clientY)
                    }
                }, 250)
            }
        })

        this._el.addEventListener('dblclick', (mouseEvent) => {
            console.log('dblclick')

            mouseEvent.preventDefault()
            mouseEvent.stopPropagation()
            const target = mouseEvent.target as HTMLElement
            const nodeName = target.nodeName.toLocaleLowerCase()
            // dblclick delete event or entity
            if((nodeName === HtmlTag.ABBR)){
                console.log(this.state, 'this.state')
                this?.dispatch(Actions.DELETE, target)
                this?.dispatch(Actions.COMPLETE, target)
            }
        })
    }

    private mousedownOnEvent(){
        
    }

    // get labelled info
    public getLabelPos(node) {
        
        return [ +node.parentNode.dataset.id, +node.dataset.sent, +node.dataset.index]
    }
}

export class EntityLabelEditor extends LabelEditor {
    constructor(el: HTMLElement){
        super(el)
    }
}

export class EventLabelEditor extends LabelEditor {
    constructor(el: HTMLElement){
        super(el)

        this.describeDelete()
        this.describeLabel()
        this.describeCheck()
    }

    private describeCheck(){
        let hoverTarget: null | HTMLElement
        // check
        this.register(EventStates.EXISTED, EventStates.CHECK, Actions.CHECK, (target) => {
            target.classList.add(Actions.CHECK)
            hoverTarget = target
            this.emit(Actions.CHECK, target.dataset.id)
            document.addEventListener('keydown', (keyboardEvent: KeyboardEvent) => {
                if(keyboardEvent.code === 'KeyX'){
                    console.log('begin edit')
                    this.dispatch(Actions.EDIT, target)
                }
            })
        })

        // hidden
        this.register(EventStates.CHECK, EventStates.EXISTED, Actions.HIDDEN, () => {
            hoverTarget?.classList.remove(Actions.CHECK)
            hoverTarget = null
            this.emit(Actions.HIDDEN)
            document.addEventListener('keydown', (keyboardEvent: KeyboardEvent) => {
                if(keyboardEvent.code === 'KeyX'){
                    console.log('begin edit')
                }
            })
        })
    }

    private describeDelete(){
        this.register(EventStates.EXISTED, EventStates.DELETED, Actions.DELETE, (target) => {
            const targetPrev = target.previousSibling,
                targetNext = target.nextSibling
            
            if(targetPrev?.nodeName.toLocaleLowerCase() === HtmlTag.ABBR || targetNext?.nodeName.toLocaleLowerCase() === HtmlTag.ABBR) {
                
            } else {
                // this.renderTrigger(event as Event, false)
            }
            target.remove()
            this.emit(Actions.DELETE, target.dataset.id)
        })

        this.register(EventStates.DELETED, EventStates.EXISTED, Actions.AUTO)
    }

    private describeLabel(){
        // start edit label 
        this.register(EventStates.CHECK, EventStates.LABELLING, Actions.EDIT, (target) => {
            // target.classList.add(Actions.CHECK)
            // document.addEventListener('keydown', (keyboardEvent: KeyboardEvent) => {
            //     if(keyboardEvent.code === 'KeyX'){
            //         console.log('begin edit')
            //     }
            // })
            console.log('edit ss')
        })
        // start label trigger
        this.register(EventStates.EXISTED, EventStates.LABEL, Actions.ADD, (choose, clientX, clientY) => {
            const [ startNodeI, endNodeI, text, selectedArr ] = choose
            const [ startPara, startSent, startIndex ] = this.getLabelPos(startNodeI)
            const [ endPara, endSent, endIndex ] = this.getLabelPos(endNodeI)

            this._labelling = {
                endPara, 
                endSent, 
                endIndex: endIndex + 1, 
                startPara, 
                startSent, 
                startIndex,
                text,
                role: EventRender.TRIGGER_ZH
            }
            this.openContextMenu(clientX, clientY)
        })
        // start label element
        this.register([EventStates.LABELLING, EventStates.LABEL], EventStates.LABELLING, Actions.ADD, (choose, clientX, clientY) => {
            const [ startNodeI, endNodeI, text, selectedArr ] = choose
            const [ startPara, startSent, startIndex ] = this.getLabelPos(startNodeI)
            const [ endPara, endSent, endIndex ] = this.getLabelPos(endNodeI)

            this._labelling = {
                endPara, 
                endSent, 
                endIndex: endIndex + 1, 
                startPara, 
                startSent, 
                startIndex,
                text,
                role: ''
            }
            this.openContextMenu(clientX, clientY)
        })

        // cancel
        this.register(EventStates.LABELLING, EventStates.EXISTED, Actions.CANCEL, () => {
            this._labelling = null
        })
        // complete, hidden event element
        this.register(EventStates.LABELLING, EventStates.EXISTED, Actions.COMPLETE, () => {
            this._labelling = null
            this.emit(Actions.COMPLETE)
        })
    }
}
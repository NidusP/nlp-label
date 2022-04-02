import {EventLabelRender, EntityLabelRender} from "./LabelRender"
import {EventLabelEditor, EntityLabelEditor} from "./LabelEditor"
import Event from './Event'
import { EventStates, Actions } from './label.types' 
import { EventRender, HtmlTag, slideToChoose } from '../utils/label'

import '../css/article.css'
import '../css/event.css'
import '../css/contextmenu.css'

export default class Labeller {
    constructor(){
        if(this.constructor === Labeller) throw new Error('please call static method createEventLabeller')
    }

    public static createEntityLabeller(container: HTMLElement, options: any){
        const labeller = new EntityLabelRender(container, options.entities)
        const eventLabelEditor = new EntityLabelEditor(container)
    }

    public static createEventLabeller(container: HTMLElement, options: { sentences: [], events: [] }){
        const render = new EventLabelRender(container, options.sentences, options.events)
        const editor = new EventLabelEditor(container)

        editor.on(Actions.DELETE, function(id: string){
            console.log('delete', id)
            const event = render.findEventById(id)
            event!.state = EventStates.DELETED
            console.log(EventStates.DELETED, Actions.DELETE)
            render.emit(Actions.DELETE, event)
        })
        // check event
        editor.on(Actions.CHECK, function(id: string){
            const event = render.findEventById(id)
            event && render.renderHoverEvent(event)
        })
        // hidden event
        editor.on(Actions.HIDDEN, function(){
            render.renderHoverEvent()
        })
        editor.on(Actions.ADD, function(data){
            const { type, labelling } = data
            // trigger
            if(type === EventStates.LABEL) {
                render.labellingEvent = render.createEvent()
                render.labellingEvent.trigger = labelling
                render.renderEvent(render.labellingEvent)
            // element
            } else if (type === EventStates.LABELLING) {
                render.labellingElement(labelling)
            }
            render.emit(Actions.ADD)
        })
        editor.on(Actions.COMPLETE, function(){
            render.labellingEvent!.state = Actions.ADD
            render.renderHoverEvent()
            render.labellingEvent = null
        })


        render.setFocus = function(content: any){
            editor.setFocus(content)
        }
        return render
    }


}

export type EventLabel = EventLabelRender
// export type EntityLabelRender
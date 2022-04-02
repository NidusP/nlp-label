import MyLabel, { EventLabel } from './class/L'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
let eventLabeller: EventLabel
let button = document.createElement('button')
button.innerHTML = 'submit'
button.addEventListener('click', function(){
  console.log(eventLabeller.getEvents(), 'eventLabeller')

})
app.appendChild(button)

let container = document.createElement('div')
app.appendChild(container)

let container2 = document.createElement('div')
app.appendChild(container2)


fetch('/api/getArticle').then(res => res.json()).then(res => {
  // article.setSentences(res.data.sentencesList)
  const {sentencesList, eventList } = res.data
  eventList.forEach((e:any) => {
    e.elements = e.arguments.map((eE:any) => ({
      ...eE,
      endIndex: eE.endPosi,
      startIndex: eE.startPosi
    }))
    e.trigger.endIndex = e.trigger.endPosi
    e.trigger.startIndex = e.trigger.startPosi
  });


  eventLabeller = MyLabel.createEventLabeller(container2, {
    sentences: sentencesList,
    events: eventList,
  })

  eventLabeller.setFocus(`
    <li class="focus-item">选择一</li>
    <li class="focus-item">选择二</li>
    <li class="focus-item">选择三</li>
    <li class="focus-item">选择四</li>
  `)
  
  eventLabeller.on('delete', function(event: any){
    console.log(event, 'event')
  })

  const addEvent = eventLabeller.on('add', function(event: any){
    console.log(event, 'event', addEvent)
    // addEvent.stop()
  })
  container = null
  console.log(container, 'container')
})
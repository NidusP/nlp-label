import Labeller from './class/Labeller'

import './style.css'
import './css/article.css'
import './css/event.css'
const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

let container = document.createElement('div')
app.appendChild(container)

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
  Labeller.createEventLabeller(container, {
    sentences: sentencesList,
    events: eventList,
  })
  container = null
  console.log(container, 'container')
})
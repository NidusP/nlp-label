import Word from './Word'

class Sentence {
    private sentId: number = -1
    private content: string = ''
    private words: Word[] = []
    constructor(sentence:{sentId: number, content:string}){
        this.sentId = sentence.sentId
        this.content = sentence.content
        this.words = this.content.split('').map((word, index) => new Word(this.sentId, index, word))
    }

    public render(){
        const fragment = document.createDocumentFragment()
        this.words.forEach(word => {
            fragment.appendChild(word.render())
        })
        return fragment
    }
}

export default Sentence


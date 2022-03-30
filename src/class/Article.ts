import Sentence from './Sentence'

class Paragraph {
    private paraId: number
    private sentences: Sentence[] = []
    constructor(paraId: number){
        this.paraId = paraId
    }

    public addSent(sent:Sentence){
        this.sentences.push(sent)
    }
    public getSentences(){
        return this.sentences
    }
    public getId(){
        return this.paraId
    }
}

class Article {
    private paragraphs: Paragraph[] = []
    constructor(sentences: [] = []){
        this.setContent(sentences)
    }

    public addPara(para:Paragraph):Paragraph{
        this.paragraphs.push(para)
        return para
    }

    public getParagraphs(){
        return this.paragraphs
    }

    private getPara(id: number){
        return this.paragraphs.find(paragraph => paragraph.getId() === id) 
    }

    private setContent(sentences: {paraId:number, sentId: number, content:string}[]){
        sentences.forEach(sentence => {
            const sent = new Sentence(sentence)
            const { paraId } = sentence
            const p = this.getPara(paraId) || this.addPara(new Paragraph(paraId))
            p.addSent(sent)
        })
    }
}

export default Article
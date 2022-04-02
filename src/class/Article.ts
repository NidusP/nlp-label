import Sentence from './Sentence'

class Paragraph {
    private _paraId: number
    private _sentences: Sentence[] = []
    constructor(paraId: number){
        this._paraId = paraId
    }

    public addSent(sent:Sentence){
        this._sentences.push(sent)
    }
    public get sentences(){
        return this._sentences
    }
    public get id(){
        return this._paraId
    }
}

class Article {
    private _paragraphs: Paragraph[] = []
    constructor(sentences: [] = []){
        this.setContent(sentences)
    }

    public addPara(para:Paragraph):Paragraph{
        this.paragraphs.push(para)
        return para
    }

    public get paragraphs(){
        return this._paragraphs
    }

    private getPara(id: number){
        return this._paragraphs.find(paragraph => paragraph.id === id) 
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
class Word {
    constructor(private sentId: number, private index: number, private word: string){
        this.sentId = sentId
        this.index = index
        this.word = word
    }

    public render(){
        const i = document.createElement('i')
        i.dataset.sent = this.sentId.toString()
        i.dataset.index = this.index.toString()
        i.innerText = this.word
        return i
    }
}

export default Word
type Item = {
    label: string
    value: string
}

class ContextMenu {
    private _list: HTMLLIElement[] = []
    constructor(){

        this._init()
    }

    private _init() {
        const fragment = document.createDocumentFragment()
        const div = document.createElement('div')

        div.classList.add('label-context-menu')
    }
    private _createItem(item: Item){
        const li = document.createElement('li')
        li.innerText = item.label
        return li
    }

    public show (){
        
    }

    public setList(list: Item[]){
        list.forEach((item, index) => {
            if(! this._list[index]) {
                this._list[index] = this._createItem(item)
            }
        })
    }

 

}
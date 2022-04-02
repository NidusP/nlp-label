const ENTITY = 'entity'

enum HtmlTag {
    I = 'i',
    ABBR = 'abbr',
    ARTICLE = 'article',
    P = 'P'
}

enum EventRender {
    ROLE = 'role',
    EVENT = 'event',
    TRIGGER = 'trigger',
    TRIGGER_ZH = '触发词',
    TRIGGER_FLAG = 'E'
}

function slideToChoose(){
    const selectionObj = window.getSelection() || document.getSelection()
    if(!selectionObj) return
    const selectText = selectionObj.toString()
    try {
        if (selectionObj.type === 'Range' && selectText !== ''){
            let startNodeI = selectionObj.anchorNode!.parentNode
            let endNodeI = selectionObj.focusNode!.parentNode

            if (startNodeI.tagName.toUpperCase() === 'ABBR') startNodeI = startNodeI.parentNode
            if (endNodeI.tagName.toUpperCase() === 'ABBR') endNodeI = endNodeI.parentNode
            // 判断是否为同句同段的文字
            if(startNodeI.parentNode.dataset.id !== endNodeI.parentNode.dataset.id ||
                startNodeI.parentNode.parentNode.dataset.id !== endNodeI.parentNode.parentNode.dataset.id){
                selectionObj.removeAllRanges()
                throw new Error('current selected is not support!')
            }
            // 判断滑选方向
            if (+startNodeI.dataset.sent > +endNodeI.dataset.sent){
                [startNodeI, endNodeI] = [endNodeI, startNodeI]
            } else if (+startNodeI.dataset.sent === +endNodeI.dataset.sent && +startNodeI.dataset.index > +endNodeI.dataset.index) [startNodeI, endNodeI] = [endNodeI, startNodeI]

            // 判断下一个兄弟节点宽度是否为零，针对M语
            while(startNodeI.offsetWidth === 0){
                startNodeI = startNodeI.nextSibling
            }
            // 判断下一个兄弟节点宽度是否为零，针对M语
            while(endNodeI.nextSibling && endNodeI.nextSibling.offsetWidth === 0){
                endNodeI = endNodeI.nextSibling
            }

            let currNode = startNodeI
            const selectedArr = []
            while (currNode && ((+currNode.dataset.sent < +endNodeI.dataset.sent) || ((+currNode.dataset.sent === +endNodeI.dataset.sent) && (+currNode.dataset.index <= +endNodeI.dataset.index)))){
                // 选中内容已有则跳过
                // if (currNode.className.includes(ENTITY) || currNode.className.includes(EVENT)){
                //     break
                // }
                selectedArr.push(currNode)
                currNode = currNode.nextSibling
            }
            // 火狐 判断节点与所选内容是否一致
            if (selectText.length !== selectedArr.length){
                if (selectText[0] !== selectedArr[0].innerText){
                    selectedArr.shift()
                }
                if (selectText[selectText.length - 1] !== selectedArr[selectedArr.length - 1].innerText){
                    selectedArr.pop()
                }
            }
            // this.selectedArr = selectedArr
            return [startNodeI, endNodeI, selectText, selectedArr]
        } else {
            return false
        }
    } catch (e) {
        console.log(e)
        
    }
    return selectionObj
}

export {
    ENTITY,
    EventRender,
    HtmlTag,
    slideToChoose
}

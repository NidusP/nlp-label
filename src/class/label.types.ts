export enum EventLabel {
    showEvent,
    hiddenEvent,
}

export enum EventStates {
    DELETED = 'delete',
    EXISTED = 0,
    LABEL,
    LABELLING,
    EDITED,
    CHECK
}

export enum Actions {
    AUTO = '<auto>',
    DELETE = 'delete',
    ADD = 'add',
    EDIT = 'edit',
    CHECK = 'check',
    HIDDEN = 'hidden',
    COMPLETE = 'COMPLETE',
    CANCEL = 'cancel'
}

export enum Mouse {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2
}

export type LabelElement = {
    endPara: number
    endSent: number
    endIndex: number
    startPara: number
    startSent: number
    startIndex: number
    text: string
    role: string
}
export default [
    {
        url: '/api/getArticle',
        method: 'get',
        response: ({ query }) => {
            return {
                code: 200,
                data: {
                    sentencesList: [
                        {
                            "content": "A-10雷电Ⅱ（英文：Thunderbolt II）是美国仙童公司生产的一种单座双引擎攻击机，负责提供对地面部队的密接支援任务，包括攻击敌方战车、武装车辆、重要地面目标等。",
                            "paraId": 1,
                            "sentId": 1
                        },
                        {
                            "content": "此外也有一部分负责提供前进空中管制，导引其他攻击机对地面目标进行攻击，这些战机被编号为OA-10。",
                            "paraId": 1,
                            "sentId": 2
                        },
                        {
                            "content": "其官方名称来自于二战时表现出色的P-47雷电式战斗机，但相对于雷电这个名称而言，更常被美军昵称为疣猪（Warthog）或简称猪（Hog）。",
                            "paraId": 1,
                            "sentId": 3
                        },{
                            "content": "A-10雷电Ⅱ（英文：Thunderbolt II）是美国仙童公司生产的一种单座双引擎攻击机，负责提供对地面部队的密接支援任务，包括攻击敌方战车、武装车辆、重要地面目标等。",
                            "paraId": 2,
                            "sentId": 1
                        },
                        {
                            "content": "此外也有一部分负责提供前进空中管制，导引其他攻击机对地面目标进行攻击，这些战机被编号为OA-10。",
                            "paraId": 2,
                            "sentId": 2
                        },
                        {
                            "content": "其官方名称来自于二战时表现出色的P-47雷电式战斗机，但相对于雷电这个名称而言，更常被美军昵称为疣猪（Warthog）或简称猪（Hog）。",
                            "paraId": 2,
                            "sentId": 3
                        },{
                            "content": "A-10雷电Ⅱ（英文：Thunderbolt II）是美国仙童公司生产的一种单座双引擎攻击机，负责提供对地面部队的密接支援任务，包括攻击敌方战车、武装车辆、重要地面目标等。",
                            "paraId": 3,
                            "sentId": 1
                        },
                        {
                            "content": "此外也有一部分负责提供前进空中管制，导引其他攻击机对地面目标进行攻击，这些战机被编号为OA-10。",
                            "paraId": 3,
                            "sentId": 2
                        },
                        {
                            "content": "其官方名称来自于二战时表现出色的P-47雷电式战斗机，但相对于雷电这个名称而言，更常被美军昵称为疣猪（Warthog）或简称猪（Hog）。",
                            "paraId": 3,
                            "sentId": 3
                        },
                        {
                            "content": "其官方名称来自于二战时表现出色的P-47雷电式战斗机，但相对于雷电这个名称而言，更常被美军昵称为疣猪（Warthog）或简称猪（Hog）。",
                            "paraId": 4,
                            "sentId": 1
                        }
                    ],
                    eventList: [
                        {
                            "id": "5d6e6a315d01460c8404b600b6301192",
                            "eventType": "产品行为-上映",
                            "eventTypeId": 9,
                            "show": null,
                            "trigger": {
                                "text": "昵称",
                                "role": "触发词",
                                "startPara": 1,
                                "startSent": 3,
                                "startPosi": 45,
                                "endPara": 1,
                                "endSent": 3,
                                "endPosi": 47
                            },
                            "arguments": [
                                {
                                    "text": "美军",
                                    "role": "主体",
                                    "startPara": 1,
                                    "startSent": 3,
                                    "startPosi": 43,
                                    "endPara": 1,
                                    "endSent": 3,
                                    "endPosi": 45
                                },
                                {
                                    "text": "疣猪",
                                    "role": "时间",
                                    "startPara": 1,
                                    "startSent": 3,
                                    "startPosi": 48,
                                    "endPara": 1,
                                    "endSent": 3,
                                    "endPosi": 50
                                },
                                {
                                    "text": "雷电",
                                    "role": "经度",
                                    "startPara": 1,
                                    "startSent": 3,
                                    "startPosi": 31,
                                    "endPara": 1,
                                    "endSent": 3,
                                    "endPosi": 33
                                }
                            ]
                        },{
                            "id": "a03da77c42d44c06a3f56e1ff03d6abb",
                            "eventType": "组织关系-裁员",
                            "eventTypeId": 10,
                            "show": null,
                            "trigger": {
                                "text": "提供",
                                "role": "触发词",
                                "startPara": 1,
                                "startSent": 1,
                                "startPosi": 49,
                                "endPara": 1,
                                "endSent": 1,
                                "endPosi": 51
                            },
                            "arguments": [
                                {
                                    "text": "支援任务",
                                    "role": "裁员人数",
                                    "startPara": 1,
                                    "startSent": 1,
                                    "startPosi": 59,
                                    "endPara": 1,
                                    "endSent": 1,
                                    "endPosi": 63
                                },
                                {
                                    "text": "A-10雷电Ⅱ",
                                    "role": "主体",
                                    "startPara": 1,
                                    "startSent": 1,
                                    "startPosi": 0,
                                    "endPara": 1,
                                    "endSent": 1,
                                    "endPosi": 7
                                }
                            ]
                        },{
                            "id": "a03da77c42d44c06a3f56e1ff03d6abb",
                            "eventType": "组织关系-裁员",
                            "eventTypeId": 10,
                            "show": null,
                            "trigger": {
                                "text": "提供",
                                "role": "触发词",
                                "startPara": 1,
                                "startSent": 1,
                                "startPosi": 49,
                                "endPara": 1,
                                "endSent": 1,
                                "endPosi": 51
                            },
                            "arguments": [
                                {
                                    "text": "支援任务",
                                    "role": "裁员人数",
                                    "startPara": 1,
                                    "startSent": 1,
                                    "startPosi": 59,
                                    "endPara": 1,
                                    "endSent": 1,
                                    "endPosi": 63
                                },
                                {
                                    "text": "A-10雷电Ⅱ",
                                    "role": "主体",
                                    "startPara": 1,
                                    "startSent": 1,
                                    "startPosi": 0,
                                    "endPara": 1,
                                    "endSent": 1,
                                    "endPosi": 7
                                }
                            ]
                        },{
                            "id": "a03da77c42d44c06a3f56e1ff03d6abb",
                            "eventType": "组织关系-裁员",
                            "eventTypeId": 10,
                            "show": null,
                            "trigger": {
                                "text": "提供",
                                "role": "触发词",
                                "startPara": 1,
                                "startSent": 1,
                                "startPosi": 49,
                                "endPara": 1,
                                "endSent": 1,
                                "endPosi": 51
                            },
                            "arguments": [
                                {
                                    "text": "支援任务",
                                    "role": "裁员人数",
                                    "startPara": 1,
                                    "startSent": 1,
                                    "startPosi": 59,
                                    "endPara": 1,
                                    "endSent": 1,
                                    "endPosi": 63
                                },
                                {
                                    "text": "A-10雷电Ⅱ",
                                    "role": "主体",
                                    "startPara": 1,
                                    "startSent": 1,
                                    "startPosi": 0,
                                    "endPara": 1,
                                    "endSent": 1,
                                    "endPosi": 7
                                }
                            ]
                        }
                    ]
                }
            }
        },
    },
] 
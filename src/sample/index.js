export const sample = {
    title: '问卷标题：如产品满意度调研问卷',
    description: '问卷的描述：希望通过该问卷了解你对本公司的产品的使用情况，我们会根据您的反馈优化产品，给您带来更优质的体验。',
    questions: {
        sex: {
            name: 'sex',
            type: 'radio',
            title: [{
                value: "`标题：${question.type}单选题`",
                subValue: "副标题：一些补充描述的文字内容。",
                isVisible: 'true'
            }],
            orders:[
                {
                    type: 'assign',
                    isEnabled: 'true',
                    values: [
                        JSON.stringify({
                            label: '男',
                            value: 'male'
                        })
                    ]
                }
            ],
            options: [
                {
                    label: '男',
                    value: 'male'
                },
                {
                    label: '女',
                    value: 'female'
                }
            ]
        },
        likes: {
            name: 'likes',
            type: 'checkbox',
            title: [{
                value:"`标题：男-复选题`",
                isVisible: "answers['sex']&&answers['sex'].value==JSON.stringify({label:'男',value:'male'})"
            },{
                value:"`标题：女-复选题`",
                isVisible: "answers['sex']&&answers['sex'].value==JSON.stringify({label:'女',value:'female'})"
            },{
                value:"`标题：复选题`",
                isVisible: "answers['sex']==undefined||answers['sex'].value==undefined"
            }],
            orders:[
                {
                    type: 'assign',
                    isEnabled: "answers['sex']&&answers['sex'].value==JSON.stringify({label:'男',value:'male'})",
                    values: [
                        JSON.stringify({
                            label: '晚上踢足球',
                            value: 'football'
                        })
                    ]
                },
                {
                    type: 'random',
                    isEnabled: "answers['sex']&&answers['sex'].value==JSON.stringify({label:'男',value:'male'})",
                    values: [],
                    num: 2
                }
            ],
            triggers: [
                {
                    type: 'transfer',
                    target: {
                        type: 'checkbox',
                        name: 'hobbies'
                    }
                },
                {
                    type: "mutex",
                    isEnabled: "value&&value.includes(JSON.stringify({label: '白天打羽毛球',value: 'female'}))",
                    options: [
                        {
                            label: '晚上踢足球',
                            value: 'football'
                        }
                    ]
                },
                {
                    type: "mutex",
                    isEnabled: "answers['sex']&&answers['sex'].value===JSON.stringify({label: '男',value: 'male'})",
                    options: [
                        {
                            label: '日间跑步',
                            value: 'running'
                        }
                    ]
                }
            ],
            validations:[
                {
                    type: "required",
                    isEnabled: "true"
                }
            ],
            options: [
                {
                    isDisabled: "value&&value.includes(JSON.stringify({label: '白天打羽毛球',value: 'female'}))",
                    label: '晚上踢足球',
                    value: 'football'
                },
                {
                    label: '白天打羽毛球',
                    value: 'female'
                },
                {
                    isDisabled: "answers['sex']&&answers['sex'].value===JSON.stringify({label: '男',value: 'male'})",
                    label: '日间跑步',
                    value: 'running'
                },
                {
                    label: '晚间游泳',
                    value: 'swimming'
                }
            ]
        },
        hobbies: {
            type: 'checkbox',
            name: 'hobbies',
            title: [
                {
                    isVisible: 'true',
                    value: "`Hobbies标题：复选题`",
                    subValue: "副标题：一些描述内容"
                }
            ],
            validations:[
                {
                    type: "required",
                    isEnabled: "true"
                }
            ],
            options: [
                {
                    label: '读书',
                    value: 'reading'
                }
            ]
        }
    },
    answers: {
        sex: {
            value: JSON.stringify({
                label: '男',
                value: 'male'
            })
        }
    }
}
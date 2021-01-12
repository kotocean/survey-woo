export const sample = {
    title: '问卷标题：如产品满意度调研问卷',
    description: '问卷的描述：希望通过该问卷了解你对本公司的产品的使用情况，我们会根据您的反馈优化产品，给您带来更优质的体验。',
    questions: {
        sex: {
            name: 'sex',
            type: 'radio',
            // isInvisible: 'true',
            title: [{
                value: "`标题：${variables.money}单选题`",
                subValue: "副标题：一些补充描述的文字内容。",
                isVisible: 'true'
            }],
            orders:[
                {
                    type: 'assign',
                    isEnabled: "true",
                    values: [
                        JSON.stringify({
                            label: '男',
                            value: 'male'
                        })
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
                    // isDisabled: 'true',
                    label: '男',
                    value: 'male'
                },
                {
                    // isInvisible: 'true',
                    label: '女',
                    value: 'female'
                }
            ]
        },
        likes: {
            name: 'likes',
            type: 'checkbox',
            title: [{
                value:"`标题：复选题，尊敬的${answers['sex'].val=='female'?'女士':'男士'}`",
                isVisible: "answers['sex']"
            },{
                value:"`标题：复选题`",
                isVisible: "answers['sex']==undefined||answers['sex'].val==undefined"
            }],
            // isInvisible:"true",
            orders:[
                {
                    type: 'assign',
                    isEnabled: "answers['sex']&&answers['sex'].val=='male'",
                    values: [
                        JSON.stringify({
                            label: '晚上踢足球',
                            value: 'football'
                        })
                    ]
                },
                {
                    type: 'random',
                    isEnabled: "answers['sex']&&answers['sex'].val=='male'",
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
                    isEnabled: "val&&val.includes('female')",
                    options: [
                        {
                            label: '晚上踢足球',
                            value: 'football'
                        }
                    ]
                },
                {
                    type: "mutex",
                    isEnabled: "answers['sex']&&answers['sex'].val==='male'",
                    options: [
                        {
                            label: '日间跑步',
                            value: 'running'
                        }
                    ]
                }
            ],
            validations:[],
            options: [
                {
                    isDisabled: "val&&val.includes('female')",
                    label: '晚上踢足球',
                    value: 'football',
                    // isInvisible: "true"
                },
                {
                    label: '白天打羽毛球',
                    value: 'female'
                },
                {
                    isDisabled: "answers['sex']&&answers['sex'].val==='male'",
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
                    value: "`${question.name}标题：复选题`",
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
    }
}
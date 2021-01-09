export const sample = {
    title: '问卷标题：如产品满意度调研问卷',
    description: '问卷的描述：希望通过该问卷了解你对本公司的产品的使用情况，我们会根据您的反馈优化产品，给您带来更优质的体验。',
    questions: {
        sex: {
            name: 'sex',
            type: 'radio',
            title: [{
                value:"`${question.type}单选题`",
                subValue: "副标题：一些补充描述的文字内容。",
                isVisible: 'true'
            }],
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
                value:"`男-复选题`",
                isVisible: "answers['sex']&&answers['sex'].value==JSON.stringify({label:'男',value:'male'})"
            },{
                value:"`女-复选题`",
                isVisible: "answers['sex']&&answers['sex'].value==JSON.stringify({label:'女',value:'female'})"
            },{
                value:"`复选题`",
                isVisible: "answers['sex']==undefined||answers['sex'].value==undefined"
            }],
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
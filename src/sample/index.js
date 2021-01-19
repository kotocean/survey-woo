export const sample = {
    title: '问卷标题：如产品满意度调研问卷',
    description: '问卷的描述：希望通过该问卷了解你对本公司的产品的使用情况，我们会根据您的反馈优化产品，给您带来更优质的体验。',
    questions: [
        {
            name: 'sex',
            type: 'radio',
            title: '单选题',
            required: 'true',
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
        {
            name: 'likes',
            type: 'radio',
            title: '单选题',
            invisible: "answers['sex'].value==='female'",
            options: [
                {
                    disabled: "answers['sex'].value==='male'",
                    label: '足球',
                    value: 'footba'
                },
                {
                    label: '篮球',
                    value: 'basketball'
                },
                {
                    disabled: "answers['likes'].value==='basketball'",
                    label: '乒乓球',
                    value: 'pingpang'
                }
            ]
        }
    ]
}
export const preHandle = function(questions){
    let result = {}
    let answers={}
    questions.forEach((question,index)=>{
        result[question.name] = question
        answers[question.name] = {}
    })
    return {result, answers}
}
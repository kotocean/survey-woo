export const optionsIncludes = function(options, value){
    for(var i in options){
      var option = options[i]
      if(JSON.stringify({
        label: option.label,
        value: option.value
      })===value){
        return true
      }
    }
    return false
  }
  
  function randomN(max, n){
      let result=[]
      while(true){
          var rn=Math.floor(Math.random()*max)
          if(!result.includes(rn)){
              result.push(rn)
          }
          if(result.length===n) break
      }
      return result
    }
  
  export const randomUpdateValues = function(num, total, arr){
      if(num>=total){
        return arr
      }else if(num>0){
        let result = randomN(total, num)
        let values=[]
        result.forEach(function(index){
          values.push(arr[index])
        })
        return values
      }
    }
  
  export const pushArrayToSet = function(arr, result){
    if(!arr||arr.length<=0) return result;
    arr.forEach(function(t){
      if(!result.includes(t)){
        result.push(t)
      }
    })
  }

  function getArrayOthers(strArray, objArray){
    let result = []
    for(var i in objArray){
      var exist = false
        for(var j in strArray){
          var item = JSON.parse(strArray[j])
          if(item.value===objArray[i].value){
            exist = true
            break;
          }
        }
      if(!exist){
        result.push({
          label: objArray[i].label,
          value: objArray[i].value
        })
      }
    }
    return result
  }

  function findNotExistItems(arr1, arr2){
    let result=[]
    for(var i in arr1){
      var exist = false
      let item = arr1[i]
      if(Object.prototype.toString.call(item) === '[object String]' ){
        item = JSON.parse(arr1[i])
      }
      for(var j in arr2){
        if(item.value===arr2[j].value){
          exist = true
          break
        }
      }
      if(!exist){
        result.push(item)
      }
    }
    return result
  }

  export const mergeArrayToSet = function(arr1, options1, arr2){
    let result=findNotExistItems(arr1, arr2).concat(arr2)
    let others = getArrayOthers(arr1, options1)
    console.log(result, others)
    let finalResult=findNotExistItems(result, others)
    return finalResult
  }
  
  export const isDisabled = function (expr, value, answers) {
    return expr!=='' && expr!==undefined && eval(expr)
  }

  export const isEnabled = function (expr, value, answers) {
    return expr && eval(expr)
  }
  
  export const isVisible = function (expr, answers) {
    return expr && eval(expr)
  }

  export const validate = function(state){
    console.log(state)
    let {questions, answers} = state
    let result = []
    for(var j in questions){
      const question = questions[j]
      const name = question.name
      var validations = question.validations
      var value = answers[name]?answers[name].value:undefined
      for(var i in validations){
        var validation = validations[i]
        if(isEnabled(validation.isEnabled, value, answers)){
          if(validation.type==='required'){
            if(question.type==="checkbox"){
              if(!value||value.length<=0){
                result.push({name: name, type: validation.type})
              }
            }
          }
        }
      }
    }
    console.log(result)
    return result
  }
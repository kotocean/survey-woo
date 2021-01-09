export const optionsIncludes = function(options, value){
    for(var i in options){
      var option = options[i]
      if(JSON.stringify({
        label: option.label,
        value: option.value
      })==value){
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
          if(result.length==n) break
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
  
  export const isDisabled = function (expr, answers) {
    return expr!='' && expr!=undefined && eval(expr)
  }
  
  export const isVisible = function (expr, answers) {
    return expr && eval(expr)
  }
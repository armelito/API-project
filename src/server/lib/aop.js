/** Helping function used to get all methods of an object */
const getMethods = (obj) => Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(item => typeof obj[item] === 'function')

/** Replace the original method with a custom function that will call our aspect when the advice dictates */
replaceMethod = (target, methodName, aspect, advice) =>
{
  const originalCode = target[methodName]

  target[methodName] = (...args) =>
  {
    if(["before", "around"].includes(advice))
      aspect.apply(target, args)

    const returnedValue = originalCode.apply(target, args)

    if(["after", "around"].includes(advice))
      aspect.apply(target, args)

    if("afterReturning" == advice)
      return aspect.apply(target, [returnedValue])

    else return returnedValue
  }
}


inject = (target, aspect, advice, pointcut, method = null) =>
{
  if(pointcut == "method")
  {
    if(method != null)
      replaceMethod(target, method, aspect, advice)

    else throw new Error("Tryin to add an aspect to a method, but no method specified")
  }

  if(pointcut == "methods")
  {
    const methods = getMethods(target)

    methods.forEach( method =>
    {
      replaceMethod(target, method, aspect, advice)
    })
  }
}

module.exports = { inject }

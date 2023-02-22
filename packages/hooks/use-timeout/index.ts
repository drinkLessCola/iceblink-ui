
export const useTimeout = () => {
  let timerId: number 

  const registerTimeout = (fn: Function, delay: number) => {
    cancelTimeout()
    timerId = window.setTimeout(fn, delay)
  }

  const cancelTimeout = () => window.clearTimeout(timerId)

  return {
    registerTimeout,
    cancelTimeout
  }
}
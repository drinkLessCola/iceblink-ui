/* eslint-disable no-unused-vars */
export const composeEventHandlers = (
  gateHandle?: (e: Event) => boolean | void,
  handler?: (e: Event) => void
) => {
  return (e: Event) => {
    const shouldPrevent = gateHandle?.(e)
    if(!shouldPrevent) return handler?.(e)
  }
}
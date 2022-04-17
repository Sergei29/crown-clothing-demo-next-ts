export const convertVwToPx = (vw: number) =>
  Math.ceil((window.innerWidth * vw) / 100)

export const convertVhToPx = (vh: number) =>
  Math.ceil((window.innerHeight * vh) / 100)

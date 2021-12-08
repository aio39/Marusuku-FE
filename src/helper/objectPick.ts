function objectPick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result: any = {}
  keys.forEach((key) => {
    result[key] = obj[key]
  })
  return result
}

export default objectPick

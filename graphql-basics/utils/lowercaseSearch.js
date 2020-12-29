export const lowerCaseSearch = (queryArgs, wholeArray, itemsSearched) => {
  if (!queryArgs) {
    return wholeArray
  }

  return itemsSearched.filter((item) => {
    return item.queryArgs.toLowerCase().includes(args.queryArgs.toLowerCase())
  })
}

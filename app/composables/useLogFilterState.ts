export const useLogFilterState = (scopeKey: string) => {
  const selectedTag = useState<string>(`logFilter:${scopeKey}:selectedTag`, () => 'All')
  const searchQuery = useState<string>(`logFilter:${scopeKey}:searchQuery`, () => '')
  const isExpanded = useState<boolean>(`logFilter:${scopeKey}:isExpanded`, () => false)

  const clearFilters = () => {
    selectedTag.value = 'All'
    searchQuery.value = ''
  }

  return {
    selectedTag,
    searchQuery,
    isExpanded,
    clearFilters
  }
}

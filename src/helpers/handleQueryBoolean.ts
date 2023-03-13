function handleQueryBoolean(filter: string | boolean) {
  if (filter === true || filter === 'true') return true

  return false
}

export { handleQueryBoolean }

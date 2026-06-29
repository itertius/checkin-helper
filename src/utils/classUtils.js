export function buildClassKey(classNumber, classSection) {
  return `${classNumber}/${classSection}`
}

export function sortClassKeys(keys) {
  return [...keys].sort((a, b) => a.localeCompare(b, 'th'))
}

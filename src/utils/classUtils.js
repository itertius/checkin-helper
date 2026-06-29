export function buildClassKey(classNumber, classSection, session) {
  return session ? `${classNumber}/${classSection} (${session})` : `${classNumber}/${classSection}`
}

export function sortClassKeys(keys) {
  return [...keys].sort((a, b) => a.localeCompare(b, 'th'))
}

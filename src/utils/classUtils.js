export function buildClassKey(classNumber, classSection, session) {
  const hasSession = session && session !== 'ไม่มีตอน'
  return hasSession ? `${classNumber}/${classSection} (${session})` : `${classNumber}/${classSection}`
}

export function sortClassKeys(keys) {
  return [...keys].sort((a, b) => a.localeCompare(b, 'th'))
}

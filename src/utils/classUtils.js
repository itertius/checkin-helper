export function buildClassKey(classNumber, classSection, session) {
  const hasSession = session && session !== 'ไม่มีตอน'
  return hasSession ? `${classNumber}/${classSection} (${session})` : `${classNumber}/${classSection}`
}

// Firestore doc IDs cannot contain '/' — encode for use as document ID
export function encodeClassKey(classKey) {
  return classKey.replace(/\//g, '|')
}

export function sortClassKeys(keys) {
  return [...keys].sort((a, b) => a.localeCompare(b, 'th'))
}

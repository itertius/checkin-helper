export function buildClassKey(classNumber, classSection, session) {
  const hasSession = session && session !== 'ไม่มีตอน'
  return hasSession ? `${classNumber}/${classSection} (${session})` : `${classNumber}/${classSection}`
}

// Firestore doc IDs cannot contain '/' — encode for use as document ID
export function encodeClassKey(classKey) {
  return classKey.replace(/\//g, '|')
}

// Natural sort: ม.3/2 before ม.3/12, ก before ข
export function sortClassKeys(keys) {
  return [...keys].sort((a, b) => {
    const parse = k => {
      const m = k.match(/(\d+)\/(\d+)\s*(?:\(([^)]+)\))?/)
      return m ? [parseInt(m[1]), parseInt(m[2]), m[3] || ''] : [0, 0, k]
    }
    const [ag, as_, ax] = parse(a)
    const [bg, bs_, bx] = parse(b)
    if (ag !== bg) return ag - bg
    if (as_ !== bs_) return as_ - bs_
    return ax.localeCompare(bx, 'th')
  })
}

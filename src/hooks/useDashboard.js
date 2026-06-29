import { useMemo } from 'react'
import { sortClassKeys } from '../utils/classUtils.js'

export function useDashboard(checkins) {
  return useMemo(() => {
    const byClass = {}
    for (const c of checkins) {
      if (!byClass[c.classKey]) {
        byClass[c.classKey] = { classKey: c.classKey, total: 0, attended: 0 }
      }
      byClass[c.classKey].total++
      if (c.guardianAttended) byClass[c.classKey].attended++
    }

    const keys = sortClassKeys(Object.keys(byClass))
    const classSummary = keys.map(k => ({
      ...byClass[k],
      absent: byClass[k].total - byClass[k].attended,
      rate: byClass[k].total > 0
        ? Math.round((byClass[k].attended / byClass[k].total) * 100)
        : 0,
    }))

    const absentList = checkins.filter(c => !c.guardianAttended)
    const totalStudents = checkins.length
    const totalAttended = checkins.filter(c => c.guardianAttended).length

    return { classSummary, absentList, totalStudents, totalAttended }
  }, [checkins])
}

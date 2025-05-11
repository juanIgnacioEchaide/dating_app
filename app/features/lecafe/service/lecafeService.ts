import { LecafeItem } from '../store/lecafeSlice'

export const fetchLecafeItemsAPI = async (userId: string): Promise<LecafeItem[]> => {
  const res = await fetch(`/api/lecafe?userId=${userId}`)
  if (!res.ok) throw new Error('Error fetching lecafe items')
  return res.json()
}

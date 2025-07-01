import { CollegeMajorInfo } from './college'

export type FilterState = {
  college: string
  industry: string
  degree: string
  searchTerm: string
  minEarnings: number | null
}

export function applyFilters(
  data: CollegeMajorInfo[],
  filters: FilterState,
): CollegeMajorInfo[] {
  return data.filter((item) => {
    // Filter by college
    if (filters.college && item.college_name !== filters.college) {
      return false
    }

    // Filter by industry
    if (filters.industry && item.industry !== filters.industry) {
      return false
    }

    // Filter by degree type
    if (filters.degree && item.degree_type !== filters.degree) {
      return false
    }

    // Filter by search term (major name)
    if (
      filters.searchTerm &&
      !item.major_name.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by minimum earnings
    if (
      filters.minEarnings &&
      item.median_earnings &&
      item.median_earnings < filters.minEarnings
    ) {
      return false
    }

    return true
  })
}

export function getUniqueValues(
  data: CollegeMajorInfo[],
  field: keyof CollegeMajorInfo,
): string[] {
  const values = data.map((item) => item[field]).filter(Boolean) as string[]
  return [...new Set(values)].sort()
}

export function formatEarnings(earnings: number | null): string {
  if (earnings === null) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(earnings)
}

export function searchMajors(
  data: CollegeMajorInfo[],
  searchTerm: string,
): CollegeMajorInfo[] {
  if (!searchTerm.trim()) return data

  return data.filter((item) =>
    item.major_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
}

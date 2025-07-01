import INDUSTRY_MAP from '../constants/cipIndustryMap'

// Major info
export type CollegeMajorInfo = {
  major_name: string
  college_name: string
  industry: string
  degree_type: string
  median_earnings: number | null
}

// API response types
interface ProgramCredential {
  title: string
}

interface ProgramEarnings {
  highest: {
    '2_yr': {
      overall_median_earnings: number
    }
  }
}

interface Program {
  code: string
  title: string
  school: {
    name: string
  }
  credential?: ProgramCredential
  earnings?: ProgramEarnings
}

interface CollegeResult {
  'latest.programs.cip_4_digit': Program[]
}

interface ApiResponse {
  results: CollegeResult[]
}

const DEGREE_MAP: Record<string, string> = {
  'Undergraduate Certificate or Diploma': 'Certificate',
  "Associate's Degree": "Associate's",
  "Bachelor's Degree": "Bachelor's",
  "Post-bachelor's Certificate": "Post-bachelor's",
  "Master's Degree": "Master's",
  'Doctoral Degree': 'Doctoral',
  'Graduate/Professional Certificate': 'Graduate Certificate',
}

const API_BASE = 'https://api.data.gov/ed/collegescorecard/v1/schools.json'

export async function fetchNYCMajors(): Promise<CollegeMajorInfo[]> {
  const apiKey = process.env.COLLEGE_SCORECARD_KEY
  if (!apiKey)
    throw new Error('Missing COLLEGE_SCORECARD_KEY in environment variables.')

  const url = new URL(API_BASE)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('school.city', 'New York')
  url.searchParams.set('per_page', '75') // This is 75 because this is the total number of results for NYC colleges, but in the future pagination will be implemented
  url.searchParams.set(
    'fields',
    [
      'programs.cip_4_digit.code',
      'programs.cip_4_digit.school.name',
      'programs.cip_4_digit.title',
      'programs.cip_4_digit.credential.title',
      'programs.cip_4_digit.earnings.highest.2_yr.overall_median_earnings',
    ].join(','),
  )

  const res = await fetch(url.toString())
  if (!res.ok) {
    const text = await res.text()
    console.error('Non-200 response:', res.status, text)
    throw new Error(`Failed to fetch majors: ${res.statusText}`)
  }

  const data: ApiResponse = await res.json()
  if (!data.results) return []

  const allMajors: CollegeMajorInfo[] = []

  data.results.forEach((item: CollegeResult) => {
    const programs = item['latest.programs.cip_4_digit']
    if (!programs || !Array.isArray(programs)) return

    programs.forEach((program: Program) => {
      if (!program || !program.title || !program.school) return

      const cipCode = program.code
      const major = program.title.slice(0, -1) // Remove period at end of major name
      const college = program.school.name
      const degreeTitle = program.credential?.title || 'Unknown'
      const earnings =
        program.earnings?.highest?.['2_yr']?.overall_median_earnings

      allMajors.push({
        major_name: major,
        college_name: college,
        industry: INDUSTRY_MAP[cipCode.slice(0, 2)] ?? 'Other',
        degree_type: DEGREE_MAP[degreeTitle] ?? 'Unknown',
        median_earnings: earnings ?? null,
      })
    })
  })

  return allMajors
}

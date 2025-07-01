export type CollegeMajorInfo = {
    major_name: string
    college_name: string
    industry: string
    degree_type: string
    median_earnings: number | null
  }
  
  const INDUSTRY_MAP: Record<string, string> = {
    "Computer Science": "STEM",
    "Biology": "STEM",
    "English Language and Literature": "Liberal Arts",
    "Business Administration": "Business",
    "Psychology": "Social Sciences",
  }
  
  const DEGREE_MAP: Record<number, string> = {
    1: "Certificate",
    2: "Associate’s",
    3: "Bachelor’s",
    4: "Post-bachelor’s",
    5: "Master’s",
    6: "Doctoral",
  }
  
const API_BASE = "https://api.data.gov/ed/collegescorecard/v1/schools.json"

export async function fetchNYCMajors(): Promise<CollegeMajorInfo[]> {
  const apiKey = process.env.COLLEGE_SCORECARD_KEY
  if (!apiKey) throw new Error("Missing COLLEGE_SCORECARD_KEY in environment variables.")

  const url = new URL(API_BASE)
  url.searchParams.set("api_key", apiKey)
  url.searchParams.set("school.city", "New York")
//   url.searchParams.set("school.degrees_awarded.predominant", "3") // Bachelor's
//   url.searchParams.set("per_page", "100")
  url.searchParams.set("fields", [
    "programs.cip_4_digit.school.name",
    "programs.cip_4_digit.title",
    "programs.cip_4_digit.credential.level",
    "programs.cip_4_digit.earnings.highest.2_yr.overall_median_earnings"
  ].join(","))

  const res = await fetch(url.toString())
  if (!res.ok) {
    const text = await res.text()
    console.error("Non-200 response:", res.status, text)
    throw new Error(`Failed to fetch majors: ${res.statusText}`)
  }

    const data = await res.json()
  if (!data.results) return []

  return data.results.map((item: any) => {
    const info = item["latest.programs.cip_4_digit"][0];

    const major = info["title"].slice(0, -1) // Remove period at end of major name
    const college = info["school"]["name"]
    const degreeLevel = info["credential"]["level"]
    const earnings = info["earnings"]["highest"]["2_yr"]["overall_median_earnings"]
    
    console.log(major, college, degreeLevel, earnings)

    return {
      major_name: major,
      college_name: college,
      industry: INDUSTRY_MAP[major] ?? "Other",
      degree_type: DEGREE_MAP[degreeLevel] ?? "Unknown",
      median_earnings: earnings ?? null,
    }
  })
}

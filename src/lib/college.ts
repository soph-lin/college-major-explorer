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
    // Add more mappings as needed
  }
  
  const DEGREE_MAP: Record<number, string> = {
    1: "Certificate",
    2: "Associate’s",
    3: "Bachelor’s",
    4: "Post-bachelor’s",
    5: "Master’s",
    6: "Doctoral",
  }
  
  const API_BASE = "https://api.data.gov/ed/collegescorecard/v1/programs.json"
  
  export async function fetchNYCMajors(apiKey: string, city = "New York"): Promise<CollegeMajorInfo[]> {
    const url = new URL(API_BASE)
    url.searchParams.set("api_key", apiKey)
    url.searchParams.set("school.city", city)
    url.searchParams.set("programs.degrees_awarded.predominant", "3") // Bachelor's
    url.searchParams.set("fields", [
      "school.name",
      "programs.cip_4_digit.title",
      "programs.median_earnings.six_yrs.after_entry.median",
      "programs.degrees_awarded.predominant",
    ].join(","))
  
    const res = await fetch(url.toString())
    const data = await res.json()
  
    if (!data.results) return []
  
    return data.results.map((item: any) => {
      const major = item["programs.cip_4_digit.title"]
      const college = item["school.name"]
      const earnings = item["programs.median_earnings.six_yrs.after_entry.median"]
      const degreeCode = item["programs.degrees_awarded.predominant"]
  
      return {
        major_name: major,
        college_name: college,
        industry: INDUSTRY_MAP[major] ?? "Other",
        degree_type: DEGREE_MAP[degreeCode] ?? "Unknown",
        median_earnings: earnings ?? null,
      }
    })
  }
  
'use client'

import { useState, useEffect } from 'react'
import { Container, Typography, Alert, Box } from '@mui/material'
import SplashCover from '@/components/theme/SplashCover'
import FilterBar from '@/components/data/FilterBar'
import MajorsDataGrid from '@/components/data/MajorsDataGrid'
import LoadingState from '@/components/data/LoadingState'

import { applyFilters, FilterState } from '@/lib/utils/filter'
import { CollegeMajorInfo } from '@/lib/utils/college'

export default function Home() {
  const [allData, setAllData] = useState<CollegeMajorInfo[]>([])
  const [filteredData, setFilteredData] = useState<CollegeMajorInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    college: '',
    industry: '',
    degree: '',
    searchTerm: '',
    minEarnings: null,
  })

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/majors')
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch data from server')
        }
        const data = await response.json()
        console.log('Fetched data:', data)
        setAllData(data)
        setFilteredData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
        setAllData([])
        setFilteredData([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Apply filters whenever filters or data changes
  useEffect(() => {
    const filtered = applyFilters(allData, filters)
    setFilteredData(filtered)
  }, [allData, filters])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <LoadingState message="Loading NYC college majors..." />
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Error Loading Data
          </Typography>
          <Typography>{error}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Please check your API key and try again.
          </Typography>
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
          mb: 4,
        }}
      >
        <SplashCover />
        <Typography variant="h4" component="h1" fontWeight="bold">
          NYC College Major Explorer
        </Typography>
      </Box>

      {/* Filters */}
      <FilterBar
        data={allData}
        filters={filters}
        onFilterChange={handleFilterChange}
        disabled={loading}
      />

      {/* Results */}
      {filteredData.length === 0 && !loading ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No majors found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters to see more results.
          </Typography>
        </Box>
      ) : (
        <MajorsDataGrid data={filteredData} loading={loading} />
      )}
    </Container>
  )
}

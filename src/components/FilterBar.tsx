import { Box, Grid, Typography, Chip } from '@mui/material'
import { Filter, X } from 'lucide-react'
import FilterDropdown from './FilterDropdown'
import SearchBar from './SearchBar'
import { FilterState } from '@/lib/utils/filter'
import { CollegeMajorInfo } from '@/lib/utils/college'

interface FilterBarProps {
  data: CollegeMajorInfo[]
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  disabled?: boolean
}

export default function FilterBar({
  data,
  filters,
  onFilterChange,
  disabled = false,
}: FilterBarProps) {
  const colleges = data
    .map((item) => item.college_name)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
  const industries = data
    .map((item) => item.industry)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
  const degrees = data
    .map((item) => item.degree_type)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()

  const handleFilterChange = (
    field: keyof FilterState,
    value: string | number | null,
  ) => {
    onFilterChange({
      ...filters,
      [field]: value,
    })
  }

  const clearAllFilters = () => {
    onFilterChange({
      college: '',
      industry: '',
      degree: '',
      searchTerm: '',
      minEarnings: null,
    })
  }

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== '' && value !== null,
  ).length

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <Filter size={20} />
        <Typography variant="h6" component="h2">
          Filters
        </Typography>
        {activeFiltersCount > 0 && (
          <Chip
            label={`${activeFiltersCount} active`}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
        {activeFiltersCount > 0 && (
          <Chip
            label="Clear all"
            size="small"
            onClick={clearAllFilters}
            deleteIcon={<X size={16} />}
            onDelete={clearAllFilters}
            variant="outlined"
          />
        )}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gap: 2,
        }}
      >
        <SearchBar
          value={filters.searchTerm}
          onChange={(value) => handleFilterChange('searchTerm', value)}
          disabled={disabled}
        />
        <FilterDropdown
          label="College"
          value={filters.college}
          options={colleges}
          onChange={(value) => handleFilterChange('college', value)}
          disabled={disabled}
        />
        <FilterDropdown
          label="Industry"
          value={filters.industry}
          options={industries}
          onChange={(value) => handleFilterChange('industry', value)}
          disabled={disabled}
        />
        <FilterDropdown
          label="Degree"
          value={filters.degree}
          options={degrees}
          onChange={(value) => handleFilterChange('degree', value)}
          disabled={disabled}
        />
      </Box>
    </Box>
  )
}

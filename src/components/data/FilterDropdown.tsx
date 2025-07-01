import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { ChevronDown } from 'lucide-react'

interface FilterDropdownProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  disabled?: boolean
}

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: FilterDropdownProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value)
  }

  return (
    <FormControl fullWidth size="small" disabled={disabled}>
      <InputLabel id={`${label.toLowerCase()}-filter-label`}>
        {label}
      </InputLabel>
      <Select
        labelId={`${label.toLowerCase()}-filter-label`}
        id={`${label.toLowerCase()}-filter`}
        value={value}
        label={label}
        onChange={handleChange}
        IconComponent={ChevronDown}
      >
        <MenuItem value="">
          <em>{label === 'Industry' ? 'All Industries' : `All ${label}s`}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

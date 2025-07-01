import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'
import {
  GraduationCap,
  Building2,
  Briefcase,
  Award,
  DollarSign,
} from 'lucide-react'
import { CollegeMajorInfo } from '@/lib/utils/college'
import { formatEarnings } from '@/lib/utils/filter'

interface MajorsDataGridProps {
  data: CollegeMajorInfo[]
  loading?: boolean
}

const columns: GridColDef[] = [
  {
    field: 'major_name',
    headerName: 'Major',
    flex: 1,
    minWidth: 200,
    renderHeader: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <GraduationCap size={16} />
        <span>Major</span>
      </Box>
    ),
  },
  {
    field: 'college_name',
    headerName: 'College',
    flex: 1,
    minWidth: 200,
    renderHeader: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Building2 size={16} />
        <span>College</span>
      </Box>
    ),
  },
  {
    field: 'industry',
    headerName: 'Industry',
    flex: 0.8,
    minWidth: 120,
    renderHeader: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Briefcase size={16} />
        <span>Industry</span>
      </Box>
    ),
  },
  {
    field: 'degree_type',
    headerName: 'Degree',
    flex: 0.8,
    minWidth: 120,
    renderHeader: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Award size={16} />
        <span>Degree</span>
      </Box>
    ),
  },
  {
    field: 'median_earnings',
    headerName: 'Median Earnings',
    flex: 0.8,
    minWidth: 150,
    type: 'number',
    renderHeader: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DollarSign size={16} />
        <span>Median Earnings</span>
      </Box>
    ),
    renderCell: (params: GridRenderCellParams) => {
      return formatEarnings(params.value)
    },
  },
]

export default function MajorsDataGrid({
  data,
  loading = false,
}: MajorsDataGridProps) {
  const rows = data.map((item, index) => ({
    id: index,
    ...item,
  }))

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <Typography variant="h6" component="h2">
          Results ({data.length} majors)
        </Typography>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            borderBottom: '2px solid #e0e0e0',
          },
        }}
      />
    </Box>
  )
}

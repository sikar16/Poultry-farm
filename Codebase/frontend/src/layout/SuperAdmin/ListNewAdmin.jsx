import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    TextField,
} from '@mui/material';
import { useGetAlluserQuery } from '../../service/userRegestration_service';

const CustomToolbar = ({ table }) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" p={1}>
            <TextField
                {...table.getColumnFilterProps('global')}
                size="small"
                variant="outlined"
                placeholder="Search..."
                sx={{ marginRight: 'auto' }}
            />
        </Box>
    );
};

const ListNewAdmin = () => {
    // Fetch all users
    const { isError, isLoading, data = [], refetch } = useGetAlluserQuery();

    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 20,
        },
        {
            accessorKey: 'fullName',
            header: 'Full Name',
            size: 150,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            size: 200,
        },
        {
            accessorKey: 'phoneNumber',
            header: 'Phone Number',
            size: 100,
        },
        {
            accessorKey: 'role',
            header: 'Role',
            size: 100,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 100,
        },
    ], []);

    const table = useMaterialReactTable({
        columns,
        data: data.filter(user => user.role === 'admin'), // Filter for admin users
        enableRowActions: false,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowSelection: true,
        initialState: {
            showColumnFilters: true,
            showGlobalFilter: true,
            columnPinning: {
                left: ['mrt-row-expand', 'mrt-row-select'],
                right: ['mrt-row-actions'],
            },
        },
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        renderToolbar: (props) => <CustomToolbar table={props.table} />,
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30],
            shape: 'rounded',
            variant: 'outlined',
        },
    });

    const handleClickOpenAdd = () => {
        // Logic to open a modal or form to add a new user
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching users.</div>;

    return (
        <>
            <div className="flex justify-between my-4 items-center">
                <p className="ms-4 text-2xl font-semibold text-gray-800">Admins</p>
                <button onClick={handleClickOpenAdd}
                    className="bg-[#CB771C] text-white rounded px-4 py-2 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" className="mr-2">
                        <path fill="white" d="M12.75 7a.75.75 0 0 0-1.5 0v4.25H7a.75.75 0 0 0 0 1.5h4.25V17a.75.75 0 0 0 1.5 0v-4.25H17a.75.75 0 0 0 0-1.5h-4.25z"></path>
                    </svg>
                    Add User
                </button>
            </div>
            <MaterialReactTable table={table} />
        </>
    );
};

export default ListNewAdmin;
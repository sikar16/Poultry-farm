import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    TextField,
    Button,
} from '@mui/material';

// Sample demo data
const demoData = {
    status: "success",
    data: [
        { firstName: "admin", lastName: "admin", email: "admin@gmail.com", role: "admin", status: "Active", id: "6753b4166a1a93545c6d66f6" },
        { firstName: "admin", lastName: "admin", email: "admin1@gmail.com", role: "admin", status: "Active", id: "6753b6cc78a279834ac9b8fd" },
        { firstName: "string", lastName: "string", email: "user@example.com", role: "admin", status: "Active", id: "6753dbdf51cba275b9fbf248" },
        { firstName: "siker", lastName: "yosef", email: "sikar@gmail.com", role: "admin", status: "Active", id: "6753eede9ad03ed84eb98a47" },
        // Add more demo users as needed
    ]
};

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
    const navigate = useNavigate(); // Initialize the navigate function
    const data = demoData;

    // Map data to the expected format
    const formattedData = useMemo(() => {
        if (data?.status === 'success' && Array.isArray(data.data)) {
            return data.data.map((user, index) => ({
                id: index + 1, // Use index + 1 for ID
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                role: user.role,
                status: user.status,
            }));
        }
        return [];
    }, [data]);

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
        data: formattedData, // Use the formatted data
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
        },
        paginationDisplayMode: 'pages',
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

    return (
        <>
            <div className="flex justify-between my-4 items-center">
                <p className="ms-4 text-2xl font-semibold text-gray-800">
                    <span onClick={() => navigate("/")}> <svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" viewBox="0 0 12 24">
                        <path fill="#737791" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z" />
                    </svg> </span> Admins</p>
                <Button
                    onClick={handleClickOpenAdd}
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: '#CB771C', '&:hover': { backgroundColor: '#A85C14' } }}
                >
                    Add User
                </Button>
            </div >
            <MaterialReactTable table={table} />
        </>
    );
};

export default ListNewAdmin;
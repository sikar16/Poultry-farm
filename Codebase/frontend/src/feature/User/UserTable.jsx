import React, { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    Menu,
    MenuItem,
    TextField,
} from '@mui/material';
import { users } from '../../demo/demo'; // Import your user data
import AddUser from './Form/AddUser';

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

const UserTable = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);


    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleClickCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleMenuClick = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const handleAssignRole = () => {
        // Implement role assignment logic
        console.log(`Assign role for ${selectedUser.fullName}`);
        handleMenuClose();
    };

    const handleToggleStatus = () => {
        console.log(`Toggle status for ${selectedUser.fullName}`);
        handleMenuClose();
    };

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
        {
            id: 'action',
            header: 'Action',
            size: 100,
            Cell: ({ row }) => (
                <Box>
                    <Button
                        onClick={(e) => handleMenuClick(e, row.original)}
                        variant="text"
                        sx={{ color: 'gray' }}
                    >
                        ⋮
                    </Button>
                </Box>
            ),
        },
    ], []);

    const table = useMaterialReactTable({
        columns,
        data: users,
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

    return (
        <>
            <div className="flex justify-between my-4 items-center">
                <p className="ms-4 text-2xl font-semibold text-gray-800">Users</p>
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
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleAssignRole}>Update Role</MenuItem>
                <MenuItem onClick={handleToggleStatus}> Status</MenuItem>
            </Menu>

            <Dialog open={openAdd} onClose={handleClickCloseAdd}>
                <DialogTitle className="text-lg font-semibold text-gray-700 flex justify-between">
                    <p>
                        Add User
                    </p>
                    <p>x</p>
                </DialogTitle>
                <hr className='text-black shadow-lg my-2' />
                <AddUser onClose={handleClickCloseAdd} />
            </Dialog>
        </>
    );
};

export default UserTable;
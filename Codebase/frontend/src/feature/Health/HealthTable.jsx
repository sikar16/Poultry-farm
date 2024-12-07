import { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Dialog,
    DialogTitle,
    TextField,
} from '@mui/material';
import { health } from '../../demo/demo'; // Import your modified demo data
import AddVaccine from './Form/AddVaccine';

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

const HealthTable = () => {
    const [openAdd, setOpenAdd] = useState(false);

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleClickCloseAdd = () => {
        setOpenAdd(false);
    };
    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 50,
        },
        {
            accessorKey: 'vaccineType',
            header: 'Vaccine Type',
            size: 150,
        },
        {
            accessorKey: 'date',
            header: 'Date',
            size: 100,
        },

    ], []);

    const table = useMaterialReactTable({
        columns,
        data: health,
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
                <p className="ms-4 text-2xl font-semibold text-gray-800">Vaccination Records</p>
                <button
                    className="bg-[#CB771C] text-white rounded px-4 py-2 flex items-center"
                    onClick={handleClickOpenAdd}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" className="mr-2">
                        <path fill="white" d="M12.75 7a.75.75 0 0 0-1.5 0v4.25H7a.75.75 0 0 0 0 1.5h4.25V17a.75.75 0 0 0 1.5 0v-4.25H17a.75.75 0 0 0 0-1.5h-4.25z"></path>
                    </svg>
                    Add Vaccine Record
                </button>
            </div>
            <MaterialReactTable table={table} />
            <Dialog open={openAdd} onClose={handleClickCloseAdd}>
                <DialogTitle className="text-lg font-semibold text-gray-700 flex justify-between">
                    <p>
                        Add User
                    </p>
                    <p>x</p>
                </DialogTitle>
                <hr className='text-black shadow-lg my-2' />
                <AddVaccine onClose={handleClickCloseAdd} />
            </Dialog>
        </>
    );
};

export default HealthTable;
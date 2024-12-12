import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation as useReactRouterLocation } from 'react-router-dom';
import { useAddNewFarmdataMutation } from '../../service/FarmDataFormApi';

function FarmDataForm() {
    const reactRouterLocation = useReactRouterLocation(); // Rename to avoid conflict
    const { selectedPlan } = reactRouterLocation.state || {}; // Access selectedPlan from state

    const [farmName, setFarmName] = useState('');
    const [farmLocation, setFarmLocation] = useState(''); // Renamed for clarity
    const [subscriptionPlan, setsubscriptionPlan] = useState('');
    const [numOfBirds, setnumOfBirds] = useState();
    const [addFarmData, { isError, isLoading, error }] = useAddNewFarmdataMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedPlan) {
            setsubscriptionPlan(selectedPlan.id); // Set the subscriptionPlan plan from the selected plan
        }
    }, [selectedPlan]);

    const resetForm = () => {
        setFarmName('');
        setFarmLocation('');
        setsubscriptionPlan('');
        setnumOfBirds();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const farmData = {
            farmName,
            location: farmLocation, // Use the renamed location here
            subscriptionPlan,
            numOfBirds,
        };

        console.log(farmData)

        try {
            const response = await addFarmData(farmData).unwrap();
            const url = response.data.paymentLink.data.checkout_url;

            if (url) {
                console.log('Redirecting to:', url);
                window.location.href = url; // Navigate to the URL in the same tab
            } else {
                console.error('URL not found in the response.');
            }
        } catch (err) {
            alert(`Submission failed: ${err.message || error}`);
        }
    };

    return (
        <div className='w-[60%] m-auto mt-3'>
            <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Farm Data Entry
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="Farm Name"
                        value={farmName}
                        onChange={(e) => setFarmName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Location"
                        value={farmLocation} // Use the renamed location here
                        onChange={(e) => setFarmLocation(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="subscriptionPlan Plan"
                        value={subscriptionPlan}
                        onChange={(e) => setsubscriptionPlan(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        disabled // Disable the input since it should be set from the selected plan
                    />
                    <TextField
                        label="Number of Birds"
                        value={numOfBirds}
                        onChange={(e) => setnumOfBirds(Number(e.target.value))}
                        required
                        type='number'
                        fullWidth
                        margin="normal"
                    />
                    {isError && <div className="text-red-600">{error.message}</div>}
                    <div className="flex justify-between mt-4">
                        <Button color="secondary" onClick={resetForm} fullWidth style={{ marginRight: '10px' }}>
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" fullWidth disabled={isLoading}>
                            {isLoading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
}

export default FarmDataForm;
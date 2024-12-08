import { useForm } from 'react-hook-form';

const AddVaccine = ({ onClose }) => {
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    const onSubmit = async (data) => {
        console.log("User data:", data);
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-semibold text-center  mb-6">Add vaccine</h2>
                    <p onClick={onClose}>X</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="vaccineName" className="block text-sm font-medium text-gray-700">Vaccine Name</label>
                        <input
                            placeholder="Vaccine name"
                            type="text"
                            id="vaccineName"
                            {...register("vaccineName", { required: "vaccine name is required" })}
                            className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-2 transition duration-200 ease-in-out hover:bg-slate-200"
                        />
                        <p className="text-red-600 text-[13px] mt-1">{errors.vaccineName?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="vaccineName" className="block text-sm font-medium text-gray-700">Vaccination Date </label>
                        <input
                            placeholder="Vaccine date"
                            type="text"
                            id="vaccineDate"
                            {...register("vaccineName", { required: "vaccine date is required" })}
                            className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-2 transition duration-200 ease-in-out hover:bg-slate-200"
                        />
                        <p className="text-red-600 text-[13px] mt-1">{errors.vaccineDate?.message}</p>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#CB771C] text-white px-6 py-2 rounded-md w-fit transition duration-200 ease-in-out "
                        >
                            Add Vaccine
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddVaccine;
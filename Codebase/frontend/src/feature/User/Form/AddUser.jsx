import { useForm } from 'react-hook-form';
import { useAddNewuserMutation } from '../../../service/userRegestration_service';

const AddUser = ({ onClose, refetch }) => {
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    const [addUser, { isError, isLoading, error }] = useAddNewuserMutation();
    const onSubmit = async (data) => {
        try {
            await addUser(data).unwrap(); // Call the mutation with user data
            alert('User added successfully!'); // Notify success
            reset(); // Reset the form
            onClose(); // Close the modal
            refetch(); // Refetch the user data
        } catch (err) {
            console.error('Failed to save the user: ', err);
            alert(`Error: ${err.message || error.message}`); // Notify error
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-semibold text-center mb-6">User Registration</h2>
                    <p onClick={onClose} className="cursor-pointer">X</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            placeholder="Full name"
                            type="text"
                            id="firstName"
                            {...register("firstName", { required: "First name is required" })}
                            className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-2 transition duration-200 ease-in-out hover:bg-slate-200"
                        />
                        <p className="text-red-600 text-[13px] mt-1">{errors.firstName?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            placeholder="Last name"
                            type="text"
                            id="lastName"
                            {...register("lastName", { required: "Last name is required" })}
                            className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-2 transition duration-200 ease-in-out hover:bg-slate-200"
                        />
                        <p className="text-red-600 text-[13px] mt-1">{errors.lastName?.message}</p>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/,
                                    message: "Invalid email format",
                                },
                            })}
                            className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-2 transition duration-200 ease-in-out hover:bg-slate-200"
                        />
                        <p className="text-red-600 text-[13px] mt-1">{errors.email?.message}</p>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters.",
                                },
                            })}
                            className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-2 transition duration-200 ease-in-out hover:bg-slate-200"
                        />
                        {errors.password && <p className="text-red-600 text-[13px] mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#CB771C] text-white px-6 py-2 rounded-md w-fit transition duration-200 ease-in-out"
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? "Adding..." : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
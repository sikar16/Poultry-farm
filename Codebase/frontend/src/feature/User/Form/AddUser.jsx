import { useForm } from 'react-hook-form';

const AddUser = ({ onClose }) => {
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    const onSubmit = async (data) => {
        console.log("User data:", data);
        reset();
        onClose(); // Close the dialog after submission
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-semibold text-center  mb-6">User Registration</h2>
                    <p onClick={onClose}>X</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            placeholder="Full name"
                            type="text"
                            id="fullName"
                            {...register("fullName", { required: "Full name is required" })}
                            className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-2 transition duration-200 ease-in-out hover:bg-slate-200"
                        />
                        <p className="text-red-600 text-[13px] mt-1">{errors.fullName?.message}</p>
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

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: "Invalid phone number",
                                },
                            })}
                            className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-2 transition duration-200 ease-in-out hover:bg-slate-200"
                        />
                        <p className="text-red-600 text-[13px] mt-1">{errors.phone?.message}</p>
                    </div>

                    {/* Role */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            {...register("role", { required: "Role is required" })}
                            className="focus:outline-none bg-slate-100 w-full py-2 rounded-md border-gray-300 shadow-sm transition duration-200 ease-in-out hover:bg-slate-200"
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                            <option value="Manager">Manager</option>
                            <option value="Editor">Editor</option>
                        </select>
                        <p className="text-red-600 text-[13px] mt-1">{errors.role?.message}</p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#CB771C] text-white px-6 py-2 rounded-md w-fit transition duration-200 ease-in-out "
                        >
                            Add User
                        </button>
                    </div>
                </form>
                {/* Close Button */}

            </div>
        </div>
    );
};

export default AddUser;
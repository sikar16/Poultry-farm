import { useState, useEffect } from 'react';

export default function DailyReportVac() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0], // Default to today's date
    eggBalance: 0,
    feedBalance: 0,
    numberOfBirds: 0,
    deaths: 0,
    currentBirds: 0, // New field for current birds
    healthReport: '', // New field for health reports
  });

  useEffect(() => {
    // Calculate current birds
    const currentBirds = Math.max(formData.numberOfBirds - formData.deaths, 0);
    setFormData((prev) => ({ ...prev, currentBirds }));
  }, [formData.numberOfBirds, formData.deaths]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Send the formData to the backend API
  };

  return (
    <div className="mx-4 md:mx-10">
      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Daily Report Submission</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="text-gray-700">Date:</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#CB771C] transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Egg Balance:</span>
            <input
              type="number"
              name="eggBalance"
              value={formData.eggBalance}
              onChange={handleChange}
              required
              min="0"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#CB771C] transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Feed Balance (kg):</span>
            <input
              type="number"
              name="feedBalance"
              value={formData.feedBalance}
              onChange={handleChange}
              required
              min="0"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#CB771C] transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Number of Birds:</span>
            <input
              type="number"
              name="numberOfBirds"
              value={formData.numberOfBirds}
              onChange={handleChange}
              required
              min="0"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#CB771C] transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Deaths:</span>
            <input
              type="number"
              name="deaths"
              min="0"
              value={formData.deaths}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#CB771C] transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Current Birds:</span>
            <input
              type="number"
              name="currentBirds"
              value={formData.currentBirds}
              readOnly
              className="border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </label>



          <button
            type="submit"
            className="mt-4 bg-[#CB771C] text-white font-bold rounded-md p-2 hover:bg-[#b66f0f] transition"
          >
            Submit Report
          </button>
        </div>
      </form>
      <hr className="w-full text-black bg-black my-4" />
    </div>
  );
}
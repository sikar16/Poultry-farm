import { useState, useEffect } from 'react';

export default function DailyReportInv() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0], // Default to today's date
    collectedEggs: '',
    badEggs: '',
    netEggs: 0,
    feedConsumed: '',
    feedAdded: '',
  });

  useEffect(() => {
    const collected = parseFloat(formData.collectedEggs) || 0;
    const bad = parseFloat(formData.badEggs) || 0;

    // Calculate net eggs only if both values are greater than zero
    if (collected > 0 && bad >= 0) {
      const netEggs = Math.max(collected - bad, 0);
      setFormData((prev) => ({ ...prev, netEggs }));
    }
  }, [formData.collectedEggs, formData.badEggs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const collected = parseFloat(formData.collectedEggs);
    const bad = parseFloat(formData.badEggs);

    // Validate that collected and bad eggs are greater than zero
    if (collected <= 0 || bad < 0) {
      alert('Collected eggs must be greater than 0 and bad eggs must be 0 or greater.');
      return;
    }

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
            <span className="text-gray-700">Collected Eggs:</span>
            <input
              type="number"
              name="collectedEggs"
              value={formData.collectedEggs}
              onChange={handleChange}
              required
              min="1"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#CB771C] transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Bad Eggs:</span>
            <input
              type="number"
              name="badEggs"
              value={formData.badEggs}
              onChange={handleChange}
              required
              min="0" // Ensure the minimum value is 0
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#CB771C] transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Net Eggs:</span>
            <input
              type="number"
              name="netEggs"
              value={formData.netEggs}
              readOnly
              className="border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Feed Consumed (kg):</span>
            <input
              type="number"
              name="feedConsumed"
              value={formData.feedConsumed}
              onChange={handleChange}
              required
              min="1" // Ensure the minimum value is 1
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#CB771C] transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Feed Added to Store (kg):</span>
            <input
              type="number"
              name="feedAdded"
              value={formData.feedAdded}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#CB771C] transition"
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
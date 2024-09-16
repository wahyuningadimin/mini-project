// components/ReviewForm.tsx
import { useState } from 'react';

const ReviewForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [overallExperience, setOverallExperience] = useState<number>(0);
  const [eventQuality, setEventQuality] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<string>('');
  const [comments, setComments] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to your server
    console.log({
      overallExperience,
      eventQuality,
      suggestions,
      comments
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Overall Experience</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`w-8 h-8 flex items-center justify-center ${star <= overallExperience ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => setOverallExperience(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Event Quality</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`w-8 h-8 flex items-center justify-center ${star <= eventQuality ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => setEventQuality(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Suggestions for Improvement</label>
            <textarea
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Additional Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-300 text-white px-4 py-2 rounded mr-2" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;

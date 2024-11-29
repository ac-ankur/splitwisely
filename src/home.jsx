import React, { useState, useMemo } from 'react';
import { 
  Trash2, 
  Landmark, 
  UserPlus, 
  Calculator, 
  Crown,
  PiggyBank,
  Trophy
} from 'lucide-react';

const SplitWisely = () => {
  const [participants, setParticipants] = useState([
    { name: '', salary: '' }
  ]);
  const [totalBill, setTotalBill] = useState('');

  const addParticipant = () => {
    setParticipants([...participants, { name: '', salary: '' }]);
  };

  const removeParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const updateParticipant = (index, field, value) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;
    setParticipants(newParticipants);
  };

  const calculateShares = () => {
    const totalSalary = participants.reduce((sum, p) => sum + Number(p.salary), 0);
    const shares = participants.map(p => ({
      ...p,
      share: totalSalary > 0 ? (Number(p.salary) / totalSalary * Number(totalBill)).toFixed(2) : '0.00'
    }));

    // Find the highest share
    const maxShareIndex = shares.reduce((maxIndex, share, index, arr) => 
      Number(share.share) > Number(arr[maxIndex].share) ? index : maxIndex, 0);

    return shares.map((share, index) => ({
      ...share,
      isWinner: index === maxShareIndex
    }));
  };

  const shares = useMemo(() => calculateShares(), [participants, totalBill]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-300 p-4 flex justify-center items-center">
      <div className="bg-white/80  shadow-2xl rounded-3xl p-6 w-full max-w-md border-4 border-pink-300 transform transition-all hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
          <Landmark className="mr-3 text-indigo-500" size={36} />
          SplitWisely 
        </h1>
        
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2 flex items-center">
            <PiggyBank className="mr-2 text-green-500" size={20} />
            Total Bill
          </label>
          <input
            type="number"
            value={totalBill}
            onChange={(e) => setTotalBill(e.target.value)}
            className="w-full px-3 py-2 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 bg-white/70 text-gray-800 placeholder-gray-500"
            placeholder="Enter total bill amount"
          />
          {/* <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span> */}
        </div>

        {participants.map((participant, index) => (
          <div key={index} className="mb-4 flex items-center space-x-2 transform transition-transform hover:scale-102">
            <input
              type="text"
              value={participant.name}
              onChange={(e) => updateParticipant(index, 'name', e.target.value)}
              className="w-1/2 px-3 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 bg-grey/70"
              placeholder="Name"
            />
            <input
              type="number"
              value={participant.salary}
              onChange={(e) => updateParticipant(index, 'salary', e.target.value)}
              className="w-1/2 px-3 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 bg-grey/70"
              placeholder="Monthly Salary"
            />
            {participants.length > 1 && (
              <button 
                onClick={() => removeParticipant(index)}
                className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-all hover:rotate-45"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={addParticipant}
            className="flex items-center text-purple-600 hover:bg-purple-100 px-3 py-2 rounded-lg border-2 border-purple-200 transition-all hover:scale-105 bg-white"
          >
            <UserPlus size={20} className="mr-2" /> Add Participant
          </button>
        </div>

        <div className="bg-pink-50/70 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center text-purple-700">
            <Calculator className="mr-2 text-blue-500" size={24} />
            Bill Breakdown
          </h2>
          {shares.map((p, index) => (
            <div 
              key={index} 
              className={`flex justify-between mb-2 p-2 rounded-md shadow-sm transition-all 
                ${p.isWinner 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' 
                  : 'bg-white'
                }`}
            >
              <span className={`${p.isWinner ? 'font-bold' : 'text-gray-700'} flex items-center`}>
                {p.name}
                {p.isWinner && (
                  <Trophy className="ml-2 text-white" size={18} fill="currentColor" />
                )}
              </span>
              <span className={`font-bold ${p.isWinner ? 'text-white' : 'text-green-600'}`}>
                ₹{p.share}
                {p.isWinner && <Crown className="ml-2 inline" size={18} />}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplitWisely;
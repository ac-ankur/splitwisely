import React, { useState } from 'react';
import { 
 
  Trash2, 
  Landmark, 
  UserPlus, 
  Calculator, 
 
  PiggyBank 
} from 'lucide-react';

const SplitWisley = () => {
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
    return participants.map(p => ({
      ...p,
      share: (Number(p.salary) / totalSalary * Number(totalBill)).toFixed(2)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md border-4 border-indigo-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 flex items-center justify-center">
          <Landmark className="mr-3 text-indigo-500" size={36} />
          SplitWisely 
        </h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 flex items-center">
            <PiggyBank className="mr-2 text-green-500" size={20} />
            Total Bill
          </label>
          <input
            type="number"
            value={totalBill}
            onChange={(e) => setTotalBill(e.target.value)}
            className="w-full px-3 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 bg-grey"
            placeholder="Enter total bill amount"
            style={{text:'black'}}
          />
        </div>

        {participants.map((participant, index) => (
          <div key={index} className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              value={participant.name}
              onChange={(e) => updateParticipant(index, 'name', e.target.value)}
              className="w-1/2 px-3 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 bg-grey"
              placeholder="Name"
            />
            <input
              type="number"
              value={participant.salary}
              onChange={(e) => updateParticipant(index, 'salary', e.target.value)}
              className="w-1/2 px-3 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 bg-grey"
              placeholder="Monthly Salary"
            />
            {participants.length > 1 && (
              <button 
                onClick={() => removeParticipant(index)}
                className="text-red-500 hover:bg-red-100 p-2 rounded-full"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={addParticipant}
            className="flex items-center text-green-600 hover:bg-green-100 px-3 py-2 rounded-lg bg-white border-purple-200"
          >
            <UserPlus size={20} className="mr-2" /> Add Participant
          </button>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 flex items-center text-blue-500">
            <Calculator className="mr-2 text-blue-500" size={24} />
            Bill Breakdown
          </h2>
          {calculateShares().map((p, index) => (
            <div key={index} className="flex justify-between mb-2 bg-white p-2 rounded-md shadow-sm">
              <span className="text-gray-700">{p.name}</span>
              <span className="font-bold text-green-600">₹{p.share}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SplitWisley;
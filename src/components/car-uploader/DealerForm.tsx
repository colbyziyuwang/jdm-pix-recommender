
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Dealer } from '../../types/car';

interface DealerFormProps {
  dealers: Dealer[];
  handleDealerChange: (index: number, field: keyof Dealer, value: string) => void;
  addDealer: () => void;
  removeDealer: (index: number) => void;
  showDealerFields: boolean;
  setShowDealerFields: (show: boolean) => void;
}

const DealerForm: React.FC<DealerFormProps> = ({
  dealers,
  handleDealerChange,
  addDealer,
  removeDealer,
  showDealerFields,
  setShowDealerFields
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">Dealer Information</label>
        <button
          type="button"
          onClick={() => setShowDealerFields(!showDealerFields)}
          className="text-sm text-jdm-red hover:text-jdm-red/80"
        >
          {showDealerFields ? 'Hide Dealer Fields' : 'Show Dealer Fields'}
        </button>
      </div>
      
      {showDealerFields && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          {dealers.map((dealer, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md relative">
              <h4 className="text-sm font-medium mb-3">Dealer {index + 1}</h4>
              
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeDealer(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Dealer Name</label>
                  <input
                    type="text"
                    value={dealer.name}
                    onChange={(e) => handleDealerChange(index, 'name', e.target.value)}
                    placeholder="Dealer name"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Location</label>
                  <input
                    type="text"
                    value={dealer.location}
                    onChange={(e) => handleDealerChange(index, 'location', e.target.value)}
                    placeholder="City, Country"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Contact</label>
                  <input
                    type="text"
                    value={dealer.contact}
                    onChange={(e) => handleDealerChange(index, 'contact', e.target.value)}
                    placeholder="Phone number"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Website</label>
                  <input
                    type="text"
                    value={dealer.website}
                    onChange={(e) => handleDealerChange(index, 'website', e.target.value)}
                    placeholder="https://example.com"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addDealer}
            className="flex items-center text-sm text-jdm-red hover:text-jdm-red/80"
          >
            <Plus size={16} className="mr-1" />
            Add Another Dealer
          </button>
        </div>
      )}
    </div>
  );
};

export default DealerForm;

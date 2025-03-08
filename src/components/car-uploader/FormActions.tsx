
import React from 'react';
import { Check } from 'lucide-react';

interface FormActionsProps {
  resetForm: () => void;
  isUploading: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ resetForm, isUploading }) => {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={resetForm}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
      >
        Reset
      </button>
      
      <button
        type="submit"
        disabled={isUploading}
        className="px-6 py-2 bg-jdm-red text-white rounded-md hover:bg-jdm-red/90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center"
      >
        {isUploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Uploading...
          </>
        ) : (
          <>
            <Check size={16} className="mr-2" />
            Add Car to Database
          </>
        )}
      </button>
    </div>
  );
};

export default FormActions;

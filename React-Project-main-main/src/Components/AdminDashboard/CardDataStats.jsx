import React from 'react';

const CardDataStats = ({ title, total, children }) => {
  return (
    <div className="border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-center bg-green-50 h-16 w-16 mb-4 rounded-full dark:bg-boxdark">
        {children}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h4 className="text-28 font-santoshi font-bold text-black text-center mb-2">
            {total}
          </h4>

          <span className="text-base font-santoshi text-center #6784B">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;

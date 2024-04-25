import React from 'react';
import CardDataStats from './CardDataStats';
import ChartOne from './ChartOne';
// import DefaultLayout from '../../layout/DefaultLayout';

const Stats = () => {
  return (
    <div className="shadow-lg">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total messages" total="$3.456K">
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M2 2C2 1.44772 2.44772 1 3 1H21C21.5523 1 22 1.44772 22 2V15.5858C22 15.8515 21.8946 16.1054 21.7071 16.2929L17.7071 20.2929C17.5206 20.4794 17.2667 20.5848 17 20.5848C16.7333 20.5848 16.4794 20.4794 16.2929 20.2929L12.2929 16.2929C12.1054 16.1054 12 15.8515 12 15.5858V14C12 13.4477 11.5523 13 11 13H4C3.44772 13 3 12.5523 3 12V2ZM11 11C11.5523 11 12 11.4477 12 12C12 12.5523 11.5523 13 11 13H4V12H11ZM13 10C13 10.5523 12.5523 11 12 11H4V10H13ZM15 9C15.5523 9 16 8.55228 16 8C16 7.44772 15.5523 7 15 7H4V9H15Z"
                fill="green"
              />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Agents" total="$45,2K">
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 12C9.8335 12 8.08375 13.7311 8.00031 15.8781C8.47203 14.7777 10.0742 14 12 14C13.9258 14 15.5279 14.7777 16.0003 15.8781C15.9169 13.7311 14.1672 12 12 12ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
              fill="green"
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Properties" total="2.450">
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 1.5H19M3 7.5H19M3 13.5H19M3 19.5H19"
              stroke="green"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Users" total="3.456">
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill="green"
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill="green"
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill="green"
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 pl:10 flex justify-center">
        <div className="grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 w-full max-w-screen-xl mx-auto">
            <ChartOne />
        </div>
        </div>

    </div>
  );
};

export default Stats;

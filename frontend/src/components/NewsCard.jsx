import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  const originalDateString = news.created_at
  const originalDate = new Date(originalDateString)
  const formattedDate = originalDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <Link to={`/kegiatan-koperasi/${news.id}`} className='relative mt-3 mx-2 cursor-grab'>
      <div className='news-card w-[320px] md:w-[350px] bg-slate-100 dark:bg-[rgb(66,70,77)] cursor-pointer transition duration-300'>
        <div className='news-image'>
          <img src={news?.image_url} alt='news cover' />
        </div>
        <div className='lg:px-4 lg:pt-2 lg:pb-11 px-7 pt-7 pb-8'>
          <div className='flex flex-wrap mb-1'>
            <h5 className='text-main text-xs font-medium mr-auto'>
              {formattedDate}
            </h5>
          </div>
          <h3 className='lg:text-2xl text-2xl leading-none text-black transition duration-300 dark:text-slate-100 font-semibold two-line'>
            {news.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;

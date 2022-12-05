import React from 'react'

interface ForgotViewProps {

}

const ForgotView: React.FC<ForgotViewProps> = ({ }) => {
  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

  }
  return (
    <form onSubmit={handleSubmit} className='p-6'>
      <input type="text" placeholder='email' />
      <div className='flex justify-center mt-12'>
      <button className='bg-blue-500 hover:bg-blue-700 hover:shadow-lg text-white 
              font-bold py-2 px-4 rounded
              focus:outline-4'>Xac nhan</button>
      </div>
    </form>
  );
}

export default ForgotView
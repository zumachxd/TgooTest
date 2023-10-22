import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPostsByTitleAsync, fetchPostsAsync } from '../Redux/postSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();


    const [filter, setFilter] = useState('');

    const handleNewPostClick = () => {
        navigate('/NewPost');
    };

    const handleFilterClick = async () => {
        await dispatch(fetchPostsByTitleAsync(filter));
    };

    const handleResetFilter = async () => {
        setFilter('');
        await dispatch(fetchPostsAsync());

    };

    return (
        <header className='flex items-center justify-between space-x-4 mb-4'>
            <h1 className='text-2xl font-semibold'>Postagens</h1>
            <div className='flex flex-grow'>
                <input
                    type='text'
                    placeholder='Filtrar por título'
                    className='border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-indigo-300'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <button
                    className='bg-[#6abc69] p-1 rounded-lg ml-2 text-white'
                    onClick={handleFilterClick}
                >
                    Filtrar
                </button>
                <button
                    className='bg-[#53736a] p-1 rounded-lg ml-2 text-white'
                    onClick={handleResetFilter}
                >
                    Limpar Filtro
                </button>
            </div>
            <button
                className='bg-[#A8B444] text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300'
                onClick={handleNewPostClick}
            >
                Nova Postagem
            </button>
        </header>
    );
}

export default Header;

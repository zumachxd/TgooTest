import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAsync, selectPosts, selectLoading } from '../Redux/postSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import Header from '../Componentes/Header';
import DeleteModal from '../Componentes/DeleteModal';
import { deletePost } from '../API/API';
import Loading from '../Componentes/Loading';
import edit from './assets/edit.png'
import lixo from './assets/lixo.png'

function Home() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const posts = useSelector(selectPosts).data;
    const loading = useSelector(selectLoading);
    const [PostId, setPostId] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPostsData = async () => {
            try {
                await dispatch(fetchPostsAsync());
            } catch (error) {
                console.error('Erro ao buscar as postagens da API', error);
            }
        };

        fetchPostsData();
    }, [dispatch]);

    const handleDeleteClick = (postId: any) => {
        setPostId(postId);
    };

    const handleConfirmDelete = async () => {
        if (PostId) {
            await deletePost(PostId);
            window.location.reload();
            setPostId(null);
        }
    };

    return (
        <div className='p-5 flex flex-col'>
            <Header />
            {loading === 'pending' ? (
                <Loading />
            ) : (
                <section>
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Título
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Data de Criação
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Data de Atualização
                                </th>
                                <th className="px-6 py-3 bg-gray-50"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="bg-[#F1F5F4] border-b border-gray-200">
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        <div className="text-sm leading-5 font-medium text-gray-900">
                                            {post.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        <div className="text-sm leading-5 text-gray-900">
                                            {post.created_at}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        <div className="text-sm leading-5 text-gray-900">
                                            {post.updated_at}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium flex flex-col items-center md:flex-row md:items-center">
                                        <button
                                            onClick={() => handleDeleteClick(post.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md mr-2 mb-2 md:mb-0"
                                        >
                                            <img
                                                src={lixo}
                                                alt="Deletar"
                                                className="w-4 h-4 md:w-6 md:h-6"
                                            />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/edit/${post.id}`)}
                                            className="bg-[#6abc69] text-white px-3 py-1 rounded-md mr-2 mb-2 md:mb-0"
                                        >
                                            <img
                                                src={edit}
                                                alt="Editar"
                                                className="w-4 h-4 md:w-6 md:h-6"
                                            />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/postagens/${post.id}`)}
                                            className="bg-[#A8B444] text-white px-3 py-1 rounded-md"
                                        >
                                            Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
            <DeleteModal
                isOpen={PostId !== null}
                onRequestClose={() => setPostId(null)}
                onDelete={handleConfirmDelete}
            />
        </div>
    );
}

export default Home;

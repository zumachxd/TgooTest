import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAsync, selectPosts, selectLoading } from '../Redux/postSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import Header from '../Componentes/Header';
import DeleteModal from '../Componentes/DeleteModal';
import { deletePost } from '../API/API';
import Loading from '../Componentes/Loading';
import edit from './assets/edit.png';
import lixo from './assets/lixo.png';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

function Home() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const posts = useSelector(selectPosts).data;
    const loading = useSelector(selectLoading);
    const [PostId, setPostId] = useState(null);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchPostsData = async () => {
            if (!posts || !posts.length) {
                try {
                    await dispatch(fetchPostsAsync());
                } catch (error) {
                    console.error('Erro ao buscar as postagens da API', error);
                }
            }
        };

        if (!posts || !posts.length) {
            fetchPostsData();
        }
    }, [dispatch, posts]);

    const formatDate = (newdata: Date) => moment(newdata).format('DD-MMM-YYYY HH:mm');

    const handleDeleteClick = (postId: any) => {
        setPostId(postId);
    };

    const handleConfirmDelete = async () => {
        if (PostId) {
            await deletePost(PostId);
            alert('Post excluído com sucesso');
            await dispatch(fetchPostsAsync());
            setPostId(null);
        }
        else{
            alert('Erro ao exluir post!');

        }
    };

    const offset = currentPage * itemsPerPage;
    const currentPosts = posts.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(posts.length / itemsPerPage);

    const handlePageClick = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div className="p-5 flex flex-col">
            <Header />
            {loading === 'pending' ? (
                <Loading />
            ) : (
                <section className='mb-6'>
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
                            {currentPosts.map((post) => (
                                <tr key={post.id} className="bg-[#F1F5F4] border-b border-gray-200">
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        <div className="text-sm leading-5 font-medium text-gray-900">
                                            {post.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        <div className="text-sm leading-5 text-gray-900">
                                            {formatDate(post.created_at)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        <div className="text-sm leading-5 text-gray-900">
                                            {formatDate(post.updated_at)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium flex flex-col items-center md:flex-row md:items-center">
                                        <button
                                            onClick={() => handleDeleteClick(post.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md mr-2 mb-2 md:mb-0"
                                        >
                                            <img src={lixo} alt="Deletar" className="w-4 h-4 md:w-6 md:h-6" />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/edit/${post.id}`)}
                                            className="bg-[#6abc69] text-white px-3 py-1 rounded-md mr-2 mb-2 md:mb-0"
                                        >
                                            <img src={edit} alt="Editar" className="w-4 h-4 md:w-6 md:h-6" />
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
            {pageCount >= 1 && (
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', padding: '1rem' }}>
                    <ReactPaginate
                        pageCount={pageCount}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName="flex justify-center items-center space-x-2"
                        activeClassName="bg-[#6abc69] text-white rounded-md px-2"
                        pageClassName="text-gray-600 text-sm leading-5 font-medium rounded-md px-2 py-1"
                        previousLabel="Anterior"
                        nextLabel="Próxima"
                        breakLabel="..."
                        previousClassName="text-[#6abc69] text-sm font-medium px-2 py-1 rounded-md hover:bg-[#E6EAC3] cursor-pointer"
                        nextClassName="text-[#6abc69] text-sm font-medium px-2 py-1 rounded-md hover-bg-[#E6EAC3] cursor-pointer"
                        breakClassName="text-[#6abc69] text-sm font-medium px-2 py-1 rounded-md cursor-pointer"
                    />
                </div>)}
            <DeleteModal isOpen={PostId !== null} onRequestClose={() => setPostId(null)} onDelete={handleConfirmDelete} />
        </div>
    );
}

export default Home;

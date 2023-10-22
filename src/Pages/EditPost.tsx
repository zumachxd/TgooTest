import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, updatePost } from '../API/API';
import { PostData } from '../interfaces/Interface';
import { useNavigate } from 'react-router-dom';
import Loading from '../Componentes/Loading';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { fetchPostsAsync } from '../Redux/postSlice';
import GenericModal from '../Componentes/GenericModal';


function EditPost() {
    const { postId } = useParams();
    const [postDetails, setPostDetails] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (postId !== undefined) {
                    const details = await fetchPostById(parseInt(postId));
                    setPostDetails(details);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Erro ao buscar os detalhes da postagem', error);
                setLoading(false);
            }
        };

        fetchDetails();
    }, [postId]);

    const formatDate = (newdata: Date) => moment(newdata).format('DD-MMM-YYYY HH:mm');
    const dispatch = useDispatch<any>();

    const updatePosts = async () => {
        await dispatch(fetchPostsAsync());

    };


    const handleUpdate = async () => {
        try {
            if (postDetails) {
                if (postId !== undefined) {
                    postDetails.updated_at = moment().format();

                    await updatePost(parseInt(postId), postDetails);
                }
            }
        } catch (error) {
            console.error('Erro ao atualizar a postagem', error);
        }
        updatePosts()
        setShowSuccessModal(true);
    };
    if (loading) {
        return <Loading />;
    }

    if (!postDetails) {
        return <p>Não foi possível encontrar os detalhes da postagem.</p>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 m-4">
            <h1 className="text-2xl font-semibold text-[#A8B444] mb-4">Editar Post</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Título:</label>
                <input
                    type="text"
                    value={postDetails.title}
                    onChange={(e) => setPostDetails({ ...postDetails, title: e.target.value })}
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tags:</label>
                <input
                    type="text"
                    value={postDetails.tags}
                    onChange={(e) => setPostDetails({ ...postDetails, tags: e.target.value })}
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Data de Publicação:</label>
                <input
                    type="text"
                    defaultValue={formatDate(new Date(postDetails.published_at))}
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Data de Destaque:</label>
                <input
                    type="date"
                    value={formatDate(new Date(postDetails.featured_until))}
                    onChange={(e) => setPostDetails({ ...postDetails, featured_until: e.target.value })}
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Link do YouTube:</label>
                <input
                    type="text"
                    value={postDetails.youtube_link}
                    onChange={(e) => setPostDetails({ ...postDetails, youtube_link: e.target.value })}
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Texto Principal (Longo):</label>
                <textarea
                    value={postDetails.primary_text}
                    onChange={(e) => setPostDetails({ ...postDetails, primary_text: e.target.value })}
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Texto Secundário (Longo):</label>
                <textarea
                    value={postDetails.secondary_text}
                    onChange={(e) => setPostDetails({ ...postDetails, secondary_text: e.target.value })}
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Título de SEO:</label>
                <input
                    type="text"
                    value={postDetails.seo_title}
                    onChange={(e) => setPostDetails({ ...postDetails, seo_title: e.target.value })}
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tags de SEO (separe por vírgulas):</label>
                <input
                    type="text"
                    value={postDetails.seo_tags}
                    onChange={(e) => setPostDetails({ ...postDetails, seo_tags: e.target.value })}
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                />
            </div>
            <button onClick={handleUpdate} className="mr-5 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">
                Salvar
            </button>
            <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300">
                Voltar
            </button>
            <GenericModal isOpen={showSuccessModal} onRequestClose={() => navigate('/')}>
                <h2 className="text-lg font-semibold">Sucesso</h2>
                <p className="text-gray-600 mb-4">Post criado com sucesso.</p>
            </GenericModal>

        </div>
    );
}

export default EditPost;

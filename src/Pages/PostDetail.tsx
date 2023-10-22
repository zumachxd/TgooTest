import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById } from '../API/API';
import { PostData } from '../interfaces/Interface';
import Loading from '../Componentes/Loading';
import moment from 'moment';

function PostDetails() {
    const { postId } = useParams();
    const [postDetails, setPostDetails] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const formatDate = (newdata: Date) => moment(newdata).format('DD-MMM-YYYY HH:mm');

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

    if (loading) {
        return <Loading />;
    }

    if (!postDetails) {
        return <p>Não foi possível encontrar os detalhes da postagem.</p>;
    }

    return (
        <div className="bg-white text-[#A8B444] rounded-lg shadow-md p-6 m-4">
            <h1 className="text-3xl font-semibold mb-4">{postDetails.title}</h1>

            <div className="mb-2">
                <p className="text-lg text-green-600 mb-2">Tags:</p>
                <p className="text-gray-700">{postDetails.tags}</p>
            </div>

            <div className="mb-2">
                <p className="text-lg text-blue-600 mb-2">Publicado em:</p>
                <p className="text-gray-700">{formatDate(new Date(postDetails.published_at))}</p>
            </div>

            <div className="mb-2">
                <p className="text-lg text-indigo-600 mb-2">Exibir até:</p>
                <p className="text-gray-700">{formatDate(new Date(postDetails.featured_until))}</p>
            </div>

            <div className="mb-2">
                <p className="text-lg text-indigo-700 mb-2">Link do YouTube:</p>
                <a href={postDetails.youtube_link} className="text-indigo-700 hover:underline">{postDetails.youtube_link}</a>
            </div>

            <div className="mb-2">
                <p className="text-lg mb-2">Texto Principal:</p>
                <p className="text-gray-700">{postDetails.primary_text}</p>
            </div>

            <div className="mb-2">
                <p className="text-lg mb-2">Texto Secundário:</p>
                <p className="text-gray-700">{postDetails.secondary_text}</p>
            </div>

            <div className="mb-2">
                <p className="text-lg mb-2">Título SEO:</p>
                <p className="text-gray-700">{postDetails.seo_title}</p>
            </div>

            <div className="mb-2">
                <p className="text-lg text-indigo-600">Tags SEO:</p>
                <p className="text-gray-700">{postDetails.seo_tags}</p>
            </div>

            <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 mt-4">
                Voltar
            </button>
        </div>
    );
}

export default PostDetails;

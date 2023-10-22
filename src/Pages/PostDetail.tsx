import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById } from '../API/API';
import { PostData } from '../interfaces/Interface';
import Loading from '../Componentes/Loading';

function PostDetails() {
    const { postId } = useParams();
    const [postDetails, setPostDetails] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
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

    if (loading) {
        return <Loading />;
    }

    if (!postDetails) {
        return <p>Não foi possível encontrar os detalhes da postagem.</p>;
    }

    return (
        <div className="bg-white text-[#A8B444] rounded-lg shadow-md p-6 m-4">
            <h1 className="text-3xl font-semibold mb-4">{postDetails.title}</h1>
            <p className="text-lg text-green-600 mb-2">
                Tags: {postDetails.tags}
            </p>
            <p className="text-lg text-blue-600 mb-2">
                Publicado em: {postDetails.published_at}
            </p>
            <p className="text-lg text-indigo-600 mb-2">
                Exibir até: {postDetails.featured_until}
            </p>
            <p className="text-lg text-indigo-700 mb-2">
                Link do YouTube: <a href={postDetails.youtube_link} className="hover:underline">{postDetails.youtube_link}</a>
            </p>
            <p className="text-lg mb-2">Texto Principal:</p>
            <p className="text-gray-700">{postDetails.primary_text}</p>
            <p className="text-lg mb-2">Texto Secundário:</p>
            <p className="text-gray-700">{postDetails.secondary_text}</p>
            <p className="text-lg mb-2">Título SEO: {postDetails.seo_title}</p>
            <p className="text-lg text-indigo-600">Tags SEO: {postDetails.seo_tags}</p>
            <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300">
                Voltar
            </button>

        </div>
    );
}

export default PostDetails;

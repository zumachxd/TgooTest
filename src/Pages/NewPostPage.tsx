import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../API/API';
import { useDispatch } from 'react-redux';
import { PostData } from '../interfaces/Interface';
import GenericModal from '../Componentes/GenericModal';
import { fetchPostsAsync } from '../Redux/postSlice';

function NewPostPage() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [formData, setFormData] = useState<PostData>({
        title: '',
        tags: '',
        published_at: new Date().toISOString(),
        featured_until: new Date().toISOString(),
        youtube_link: '',
        primary_text: '',
        secondary_text: '',
        seo_title: '',
        seo_tags: '',
        updated_at: '',
    });

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updatePosts = async () => {
        await dispatch(fetchPostsAsync());

    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.title) {
            alert('O campo "Título" é obrigatório.');
            return;
        }
        try {
            await createPost(formData);
            updatePosts()
            setShowSuccessModal(true);


        } catch (error) {
            console.error('Erro ao criar a postagem:', error);
            setShowErrorModal(true);

        }
    };

    return (
        <div className="max-w-3xl mx-auto p-3">
            <h1 className="text-2xl font-semibold mb-4 text-[#A8B444]">Nova Postagem</h1>
            <button
                className='bg-[#A8B444] text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300'
                onClick={() => navigate('/')}
            >
                Voltar
            </button>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tags (separe por vírgulas):</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Data de Publicação:</label>
                    <input
                        type="text"
                        name="published_at"
                        value={formData.published_at}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Data de Destaque:</label>
                    <input
                        type="text"
                        name="featured_until"
                        value={formData.featured_until}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Link do YouTube:</label>
                    <input
                        type="text"
                        name="youtube_link"
                        value={formData.youtube_link}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Texto Principal (Longo):</label>
                    <textarea
                        name="primary_text"
                        value={formData.primary_text}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Texto Secundário (Longo):</label>
                    <textarea
                        name="secondary_text"
                        value={formData.secondary_text}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Título de SEO:</label>
                    <input
                        type="text"
                        name="seo_title"
                        value={formData.seo_title}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tags de SEO (separe por vírgulas):</label>
                    <input
                        type="text"
                        name="seo_tags"
                        value={formData.seo_tags}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#A8B444] text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
                >
                    Criar Postagem
                </button>
            </form>
            <GenericModal isOpen={showSuccessModal} onRequestClose={() => navigate('/')}>
                <h2 className="text-lg font-semibold">Sucesso</h2>
                <p className="text-gray-600 mb-4">Post criado com sucesso.</p>
            </GenericModal>
            <GenericModal isOpen={showErrorModal} onRequestClose={() => navigate('/')}>
                <h2 className="text-lg font-semibold text-red-500 ">Ops!</h2>
                <p className="text-gray-600 mb-4">Ocorreu um erro no seu novo Post.</p>
            </GenericModal>
        </div>
    );
}

export default NewPostPage;

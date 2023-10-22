export interface Post {
    id: number;
    title: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface DeleteModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onDelete: () => void;
}

export interface PostData {
    title: string;
    tags: string;
    published_at: string;
    featured_until: string;
    youtube_link: string;
    primary_text: string;
    secondary_text: string;
    seo_title: string;
    seo_tags: string;
}

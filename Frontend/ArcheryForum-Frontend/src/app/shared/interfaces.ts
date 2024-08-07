export interface Post {
    id: number;
    subject: string;
    content: string;
    date: string;
    user_name: string;
    topic_name: string;
}

export interface Topic {
    id: number;
    name: string;
    description: string;
}

export interface Answer {
    id: number;
    content: string;
    user_name: string;
    post_id: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

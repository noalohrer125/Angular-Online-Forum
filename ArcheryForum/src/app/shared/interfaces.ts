export interface Post {
    id: number;
    subject: string;
    content: string;
    date: Date;
    user_id: number;
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
    user_id: number;
    post_id: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

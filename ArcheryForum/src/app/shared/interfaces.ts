interface Post {
    id: number;
    subject: string;
    conent: string;
    user_id: number;
    topic_id: number;
}

interface Topic {
    id: number;
    name: string;
    description: string;
}

interface Answer {
    id: number;
    content: string;
    user_id: number;
    post_id: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

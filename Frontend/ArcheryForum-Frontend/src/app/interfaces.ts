export interface is_authenticated {
    authenticated: boolean;
}

export interface Answer {
    id: number;
    content: string;
    post_id: number;
}

export interface Post {
    id: number,
    Subject: string;
    Content: string;
    Topic_name: string;
}

export interface Topic {
    id: number,
    name: string,
}

export interface current_user {
    username: string;
    is_superuser: boolean;
}

export type APIUrlTypes = 'users' | 'posts' | 'comments';

export interface AddressModel {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

export interface CompanyModel {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface FreelancerModel {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: AddressModel;
    company: CompanyModel;
    finishedJobCount: number;
}

export interface PostModel {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface CommentModel {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

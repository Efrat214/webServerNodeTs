export enum Genre {
    Suspense,
    Emotion,
    Fear,
    Happy,
    Fiction,
}

export interface Book {
    name: string;
    author: string;
    id: number;
    genre: Genre;
}



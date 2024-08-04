export class CreateBookDto {
    title: string;
    author: string;
    publicationDate: Date;
    genres: string;

    constructor(title: string, author: string, publicationDate: Date, genres: string) {
        this.title = title;
        this.author = author;
        this.publicationDate = publicationDate;
        this.genres = genres;
    }
}

export class UpdateBookDto {
    id: string;
    title: string;
    author: string;
    publicationDate: Date;
    genres: string;

    constructor(id: string, title: string, author: string, publicationDate: Date, genres: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publicationDate = publicationDate;
        this.genres = genres;
    }
}
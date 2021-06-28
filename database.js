const books =[
    {
        ISBN: "1234Book",
        title: "Twilight Recreated",
        pubDate: "2021-07-07",
        language: "en",
        numPage: "300",
        author: [1, 2],
        publications: [1],
        category: ["tech", "programming", "education", "thriller", "romantic"],
    }
];

const author =[
    {
        id: 1,
        name: "Akarsh",
        books: ["1234Book"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["1234Book", "123DeepSecret",],
    }
];

const publication =[
    {
        id:1,
        name: ["RomeoJul"],
        books: ["1234Book"],
    }
];

module.exports = {books, author, publication};

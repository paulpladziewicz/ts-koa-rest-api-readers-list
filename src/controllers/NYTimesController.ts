import axios from 'axios';

const nytimesListNames = {
  COMBINED_PRINT_AND_E_BOOK_NONFICTION: 'combined-print-and-e-book-nonfiction',
  B: 'hardcover-fiction',
  C: 'hardcover-nonfiction',
  D: 'trade-fiction-paperback',
  E: 'mass-market-paperback',
  F: 'paperback-nonfiction',
  G: 'e-book-fiction',
  H: 'e-book-nonfiction',
  I: 'hardcover-advice',
  J: 'paperback-advice',
  K: 'advice-how-to-and-miscellaneous',
  L: 'hardcover-graphic-books',
  d: 'paperback-graphic-books',
  MANGA: 'manga'
};

export default {
  async bestSellers(ctx: any) {
    const { listName } = ctx.request.body;
    const { data } = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/${listName}.json?api-key=${process.env.NYTIMES_API_KEY}`
    );
    ctx.body = data;
  }
};

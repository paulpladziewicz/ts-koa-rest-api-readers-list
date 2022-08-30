import axios from 'axios';
import Book from '../models/Book';

export default {
  async bestSellers(ctx: any) {
    const { listName } = ctx.request.query;
    const { data } = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/${listName}.json?api-key=${process.env.NYTIMES_API_KEY}`
    );
    const currentUserBookListArray = await Book.find({
      user_id: ctx.state.userId
    });

    let userBookListTitles = {};
    for (let bookOnUserList of currentUserBookListArray) {
      // @ts-ignore
      userBookListTitles[bookOnUserList.title] = true;
    }

    for (let nyBook of data.results.books) {
      // @ts-ignore
      if (userBookListTitles[nyBook.title]) {
        nyBook.onList = true;
        continue;
      }
      nyBook.onList = false;
    }

    ctx.body = data;
  }
};

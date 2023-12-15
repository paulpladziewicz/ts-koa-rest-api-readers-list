import Koa from 'koa';
import axios from 'axios';
import Book from '../models/Book';

export interface BookItemInterface {
  title: string;
}

export interface UserBookListInterface {
  title?: boolean;
}

export default {
  async bestSellers(ctx: Koa.Context) {
    const { listName } = ctx.request.query;
    const { data } = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/${listName}.json?api-key=${process.env.NYTIMES_API_KEY}`
    );
    const currentUserBookListArray = await Book.find({
      user_id: ctx.state.userId
    });

    let userBookListTitles: UserBookListInterface = {};
    for (let bookOnUserList of currentUserBookListArray) {
      userBookListTitles[
        bookOnUserList.title as keyof BookItemInterface
      ] = true;
    }

    for (let nyBook of data.results.books) {
      if (userBookListTitles[nyBook.title as keyof BookItemInterface]) {
        nyBook.onList = true;
        continue;
      }
      nyBook.onList = false;
    }

    ctx.body = data;
  }
};

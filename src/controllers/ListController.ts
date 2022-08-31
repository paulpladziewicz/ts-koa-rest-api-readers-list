import Koa from "koa";
import Book from '../models/Book';

export default {
  async getAllBooksByUserId(ctx: Koa.Context) {
    ctx.body = await Book.find({ user_id: ctx.state.userId });
  },
  async addBookToList(ctx: Koa.Context) {
    const { title, author, currentPage }: any = ctx.request.body;

    const newBook = new Book({
      user_id: ctx.state.userId,
      title,
      author,
      currentPage
    });

    await newBook.save();

    return (ctx.status = 201);
  },
  async updateBookOnList(ctx: Koa.Context) {
    const { bookId }: any = ctx.params;
    const { title, author, currentPage }: any = ctx.request.body;
    const book = await Book.findById(bookId);
    book.title = title;
    book.author = author;
    book.currentPage = currentPage;
    await book.save();
    ctx.status = 200;
  },
  async deleteBookOnList(ctx: Koa.Context) {
    const { bookId }: any = ctx.params;
    ctx.body = await Book.deleteOne({ _id: bookId });
  }
};

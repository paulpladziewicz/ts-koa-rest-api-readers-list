import Book from '../models/Book'

export default {
    async getAllBooksByUserId(ctx: any) {
        ctx.body = await Book.find({user_id: ctx.state.userId});
    },
    async addBookToList(ctx: any) {
        const { title,
            author,
            currentPage }: any = ctx.request.body;

        const newBook = new Book({
            user_id: ctx.state.userId,
            title,
            author,
            currentPage
        });

        await newBook.save();

        return ctx.status = 201;
    },
    async updateBookOnList(ctx: any) {
        const { bookId }: any = ctx.params;
        const { title,
            author,
            currentPage }: any = ctx.request.body;
        const book = await Book.findById(bookId);
        book.title = title;
        book.author = author;
        book.currentPage = currentPage;
        await book.save();
        ctx.status = 200;
    },
    async deleteBookOnList(ctx: any) {
        const { bookId }: any = ctx.params;
        ctx.body = await Book.deleteOne({_id: bookId});
    }
};

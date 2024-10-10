import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './app.service';
import { Book } from './fake-database';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/all')
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  @Get('/getById/:id')
  getBookById(@Param('id') id: string): Book | undefined {
    const bookID = +id;
    return this.booksService.findBookById(bookID);
  }

  @Post()
  addBook(@Body() book: Partial<Book>): Book | undefined {
    const bookData = book;
    if (!book.author || !book.title || !book.publicationYear) return undefined;
    return this.booksService.create(bookData);
  }

  @Patch(':id')
  updateBook(
    @Param('id') id: string,
    @Body() book: Partial<Book>,
  ): Book | undefined {
    return this.booksService.update(+id, book);
  }

  @Delete(":id")
  deleteBook(@Param("id") id: string): Book[] {
    return this.booksService.delete(+id);
  }
}

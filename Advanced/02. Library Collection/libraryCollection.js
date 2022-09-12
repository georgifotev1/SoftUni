class LibraryCollection {
  constructor(capacity) {
    this.capacity = capacity;
    this.books = [];
  }

  addBook(bookName, bookAuthor) {
    if (this.capacity == 0) {
      throw new Error(`Not enough space in the collection.`);
    } else {
      this.books.push({ bookName, bookAuthor, payed: false });
      this.capacity--;
      return `The ${bookName}, with an author ${bookAuthor}, collect.`;
    }
  }

  payBook(bookName) {
    let match = this.books.find((el) => el.bookName == bookName);

    if (match == undefined) {
      throw new Error(`${bookName} is not in the collection.`);
    } else if (match.payed == true) {
      throw new Error(`${bookName} has already been paid.`);
    } else {
      match.payed = true;
      return `${bookName} has been successfully paid.`;
    }
  }

  removeBook(bookName) {
    let match = this.books.find((el) => el.bookName == bookName);
    let index = this.books.indexOf(match);
    if (match == undefined) {
      throw new Error(`The book, you're looking for, is not found.`);
    } else if (match.payed == false) {
      throw new Error(
        `${bookName} need to be paid before removing from the collection.`
      );
    } else {
      this.books.splice(index, 1);
      return `${bookName} remove from the collection.`;
    }
  }

  getStatistics(bookAuthor) {
    if (bookAuthor) {
      let match = this.books.find((el) => el.bookAuthor == bookAuthor);
      if (match) {
        return `${match.bookName} == ${match.bookAuthor} - ${
          match.payed == true ? `Has Paid` : `Not Paid`
        }.`;
      } else {
        throw new Error(`${bookAuthor} is not in the collection.`);
      }
    } else {
      let result = `The book collection has ${this.capacity} empty spots left.`;
      this.books
        .sort((a, b) => a.bookName.localeCompare(b.bookName))
        .forEach(
          (el) =>
            (result += `\n${el.bookName} == ${el.bookAuthor} - ${
              el.payed == true ? `Has Paid` : `Not Paid`
            }.`)
        );
      return result;
    }
  }
}
const library = new LibraryCollection(2);
console.log(library.addBook("Don Quixote", "Miguel de Cervantes"));
console.log(library.getStatistics());

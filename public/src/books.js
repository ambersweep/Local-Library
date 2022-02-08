function findAuthorById(authors, id) {
  for (let item in authors) {
    if (id === authors[item].id) {
      return authors[item];
    }
  }
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = [];
  let notCheckedOut = [];
  let result = [checkedOut, notCheckedOut];
  for (let item in books) {
    if (books[item].borrows[0].returned === true) {
      notCheckedOut.push(books[item]);
    } else {
      checkedOut.push(books[item]);
    }
  }
  return result;
}

function getBorrowersForBook(book, accounts) {
  // should return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided books borrows array. each accoutn object should include the returned entry from corresponding borrows array
  const { borrows } = book;
  let filteredAccounts = [];

  borrows.forEach((borrower) => {
    accounts.forEach((account) => {
      if (borrower.id === account.id) {
        filteredAccounts.push({ ...account, returned: borrower.returned });
      }
    });
  });

  return filteredAccounts.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

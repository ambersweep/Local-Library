function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedCount = 0;
  for (let item in books) {
    if (!books[item].borrows[0].returned) {
      borrowedCount++;
    }
  }
  return borrowedCount;
}

function getMostCommonGenres(books) {
  let genreCount = {};
  books.forEach((book) => {
    if (genreCount[book.genre]) {
      genreCount[book.genre]++;
    } else {
      genreCount[book.genre] = 1;
    }
  });
  let genreArray = [];
  for (let key in genreCount) {
    let value = genreCount[key];
    genreArray.push({
      name: key,
      count: value,
    });
  }
  
  genreArray.sort((genreA, genreB) => genreB.count - genreA.count);
  let results = genreArray.slice(0, 5);
  return results;
}

function getMostPopularBooks(books) {
  return books
    .sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length)
    .slice(0, 5)
    .map((book) => ({ name: book.title, count: book.borrows.length }));
}

//helper function that gets authors id from books borrows list
function getAuthorIds(books) {
  let authorIds = books.reduce((list, book) => {
    const id = book.authorId;
    list.hasOwnProperty(id)
      ? list[id].push(book.borrows.length)
      : (list[id] = [book.borrows.length]);
    return list;
  }, {});

  const ids = Object.keys(authorIds);
  const result = {};

  ids.forEach(
    (id) => (result[id] = authorIds[id].reduce((total, num) => total + num))
  );

  return result;
}

//helper function that replaces the authors id with their first and last name
function replaceIdWithName(temp, authors) {
  return temp.map((item) => {
    const authorName = authors.find((author) => author.id == item.name);
    item.name = `${authorName.name.first} ${authorName.name.last}`;
    return item;
  });
}

function getMostPopularAuthors(books, authors) {
  const borrowsByAuthorId = getAuthorIds(books);
  const sortableArray = [];
  const temp = [];
  let result = [];

  for (const id in borrowsByAuthorId) {
    sortableArray.push([id, borrowsByAuthorId[id]]);
  }
  sortableArray.sort((authorA, authorB) => authorB[1] - authorA[1]);
  sortableArray.forEach((id) => temp.push({ name: id[0], count: id[1] }));
  result = replaceIdWithName(temp, authors);
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

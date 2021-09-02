// define which are used two or more
const spinner = document.getElementById("spinner");
const inputValueError = document.getElementById("input-error");
const totalSearchFound = document.getElementById("total-search");
const bookInfoContainer = document.getElementById("books-info-container");

//load data using fetch from the server
const loadBookData = () => {
  // clear  values
  inputValueError.innerText = "";
  bookInfoContainer.textContent = "";
  totalSearchFound.innerText = "";

  //get the book name what you search
  const inputText = document.getElementById("input-field");
  const inputValue = inputText.value;

  if (inputValue === "") {
    //error handling when search field is empty
    inputValueError.innerText = "Please enter a book name";
    return;
  } else {
    spinner.removeAttribute("hidden"); //show the spinner

    // load value from server
    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        spinner.setAttribute("hidden", ""); //hide the spinner
        // console.log(data.numFound);
        if (data.numFound === 0) {
          //error handling when user give not a valid input
          inputValueError.innerText = "please enter a valid book name";
          inputText.value = "";
          return;
        } else {
          // show total search value
          totalSearchFound.innerText = `Total search found: ${data.numFound}`;
          // call function for showing book information
          displayBookInfo(data.docs);
          inputText.value = ""; //clear input field
        }
      });
  }
};

// this function for show book info
const displayBookInfo = (booksInfo) => {
  booksInfo.forEach((book) => {
    // console.log(book);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
            <div class="card">
              <div class = 'd-flex'>
                <div>
                    <img src="https://covers.openlibrary.org/b/id/${
                      book.cover_i ? `${book.cover_i}-M.jpg` : ""
                    }" class="card-img-top img-fluid w-50 p-1" alt="img-not-found" />
                </div>
                <div class="card-body">
                <h5 class="card-title">Book name: ${book.title}</h5>
                <p class="card-text">Author:${
                  book.author_name ? `${book.author_name}` : "unknown"
                }</p>
                <p class="card-text">Publisher:${
                  book.publisher ? `${book.publisher[0]}` : "unknown"
                }</p>
                <p class="card-text">First published year:${
                  book.first_publish_year
                    ? `${book.first_publish_year}`
                    : "unknown"
                }</p>
                </div>
              </div>
            </div>
    `;
    bookInfoContainer.appendChild(div);
  });
};

const spinner = document.getElementById("spinner");
const loadBookData = () => {
  // clear all value
  document.getElementById("input-error").innerText = "";
  document.getElementById("books-info-container").textContent = "";
  document.getElementById("total-search").innerText = "";
  const inputText = document.getElementById("input-field");
  const inputValue = inputText.value;
  if (inputValue === "") {
    document.getElementById("input-error").innerText =
      "Please enter a book name";
    return;
  } else {
    spinner.removeAttribute("hidden");

    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        spinner.setAttribute("hidden", "");
        console.log(data.numFound);
        if (data.numFound === 0) {
          document.getElementById("input-error").innerText =
            "please enter a valid book name";
          inputText.value = "";
          return;
        }
        document.getElementById(
          "total-search"
        ).innerText = `Total search found: ${data.numFound}`;
        displayBookInfo(data.docs);
        inputText.value = "";
      });
  }
};

const displayBookInfo = (booksInfo) => {
  const booksInfoContainer = document.getElementById("books-info-container");
  //   booksInfoContainer.textContent = "";
  booksInfo.forEach((book) => {
    console.log(book);
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
                <p class="card-text">First published year:${
                  book.first_publish_year
                    ? `${book.first_publish_year}`
                    : "unknown"
                }</p>
                </div>
              </div>
            </div>
    `;
    booksInfoContainer.appendChild(div);
  });
};

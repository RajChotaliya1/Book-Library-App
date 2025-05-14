import React, { useState } from "react";
import Categories from "../../components/Categories";
import Searchfield from "../../components/Searchfield";
import BooksData from "../../components/BooksData";

const BrowseBooks = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="p-2">
      <section>
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Searchfield onSearch={setInputValue} />
        <BooksData
          title="All Books"
          inputValue={inputValue}
          selectedCategory={selectedCategory}
        />
      </section>
    </div>
  );
};

export default BrowseBooks;

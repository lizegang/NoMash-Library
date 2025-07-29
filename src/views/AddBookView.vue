<template>
  <div>
    <h2>Add Book</h2>
    <div>
      <input v-model="isbn" placeholder="ISBN" />
      <input v-model="name" placeholder="Book Name" />
      <button @click="addBook">Add Book</button>
    </div>

    <hr />

    <h3>Books (ISBN > 1000, limit 5, ordered by ISBN desc)</h3>
    <ul v-if="books.length">
      <li v-for="book in books" :key="book.id" style="margin-bottom: 10px;">
        <div>
          <strong>ISBN:</strong> {{ book.isbn }} |
          <input v-model="book.editName" placeholder="Edit name" />
        </div>
        <button @click="updateBook(book)">Update</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
    <p v-else>Loading books or no books found...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '../Firebase/init.js';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
export default {
  setup() {
    const isbn = ref('');
    const name = ref('');
    const books = ref([]);

    // 添加书籍
    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        });

        isbn.value = '';
        name.value = '';
        alert('Book added successfully!');
        await fetchBooks(); // 刷新书籍列表
      } catch (error) {
        console.error('Error adding book: ', error);
      }
    };

    // 查询书籍（isbn > 1000，按 isbn 降序，取前 5）
    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn', 'desc'),
          limit(5)
        );

        const querySnapshot = await getDocs(q);
        books.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          editName: doc.data().name // 用于编辑
        }));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    // 删除书籍
    const deleteBook = async id => {
      if (confirm('Are you sure you want to delete this book?')) {
        await deleteDoc(doc(db, 'books', id));
        await fetchBooks(); // 刷新列表
      }
    };

    // 更新书籍名称
    const updateBook = async book => {
      try {
        await updateDoc(doc(db, 'books', book.id), {
          name: book.editName
        });
        alert('Book updated successfully!');
      } catch (error) {
        console.error('Error updating book:', error);
      }
    };

    // 页面加载时获取书籍
    onMounted(() => {
      fetchBooks();
    });

    return {
      isbn,
      name,
      books,
      addBook,
      deleteBook,
      updateBook
    };
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  margin-bottom: 8px;
}
input {
  width: 200px;
  margin-right: 10px;
}
button {
  margin-right: 5px;
}
</style>

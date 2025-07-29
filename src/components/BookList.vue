<template>
  <div>
    <h2>Books with ISBN > 1000</h2>
    <ul v-if="books.length">
      <li v-for="book in books" :key="book.id">
        {{ book.name }} (ISBN: {{ book.isbn }})
      </li>
    </ul>
    <p v-else>Loading books or no books found...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '@/Firebase/init.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        // 创建查询：isbn 大于 1000
        const q = query(collection(db, 'books'), where('isbn', '>', 1000));

        // 执行查询
        const querySnapshot = await getDocs(q);

        // 提取数据
        books.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books
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
</style>


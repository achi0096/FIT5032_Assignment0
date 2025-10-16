<script>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";


export default {
    setup(){
        const isbn = ref('');
        const name = ref('');

        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (Number.isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }

                const duplicateCheck = query(
                    collection(db, 'books'),
                    where('isbn', '==', isbnNumber)
                );
                const duplicateSnapshot = await getDocs(duplicateCheck);
                if (!duplicateSnapshot.empty) {
                    alert('A book with this ISBN already exists.');
                    return;
                }

                await addDoc(collection(db, "books"), {
                    isbn: isbnNumber,
                    name: name.value
                });

                isbn.value = '';
                name.value = '';
                alert('Book added successfully!');
            }   catch (error) {
                console.error("Error adding book: ", error);
            }
        };
        return {
            isbn,
            name,
            addBook
        };
        return {
            isbn,
            name,
            addBook
        };
    }
};
</script>

<template>
  <div class="page-wrapper">
    <div class="card shadow-sm add-card">
      <div class="card-header">
        <h1 class="h4 mb-0">Add Book</h1>
      </div>
      <div class="card-body">
        <form @submit.prevent="addBook" class="d-grid gap-3">
          <div>
            <label class="form-label small" for="isbn">ISBN</label>
            <input id="isbn" type="text" class="form-control" v-model="isbn" required />
          </div>
          <div>
            <label class="form-label small" for="name">Name</label>
            <input id="name" type="text" class="form-control" v-model="name" required />
          </div>
          <Button type="submit" label="Add Book" severity="primary" class="w-100"/>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: #f8fafc;
}

.add-card {
  width: min(420px, 100%);
}

form .p-button {
  justify-content: center;
}

:deep(.p-button.p-button-primary) {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

</style>

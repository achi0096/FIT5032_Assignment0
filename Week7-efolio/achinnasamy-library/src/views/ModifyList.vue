<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import db from '../firebase/init.js';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const isLoading = ref(false);
    const activeQuery = ref('highIsbn');
    const editingBook = ref(null);
    let unsubscribe = null;

    const applyQuery = (mode = 'highIsbn') => {
      activeQuery.value = mode;
      isLoading.value = true;

      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }

      const booksRef = collection(db, 'books');
      let firestoreQuery;

      switch (mode) {
        case 'topFive':
          firestoreQuery = query(booksRef, orderBy('isbn', 'desc'), limit(5));
          break;
        case 'alphabetical':
          firestoreQuery = query(booksRef, orderBy('name'));
          break;
        default:
          firestoreQuery = query(
            booksRef,
            where('isbn', '>=', 100),
            orderBy('isbn', 'asc')
          );
      }

      unsubscribe = onSnapshot(
        firestoreQuery,
        (snapshot) => {
          const results = [];
          snapshot.forEach((docSnap) => {
            results.push({ id: docSnap.id, ...docSnap.data() });
          });
          books.value = results;
          isLoading.value = false;
        },
        (error) => {
          console.error('Error fetching books:', error);
          books.value = [];
          isLoading.value = false;
        }
      );
    };

    const startEdit = (book) => {
      editingBook.value = { ...book };
    };

    const cancelEdit = () => {
      editingBook.value = null;
    };

    const saveEdit = async () => {
      if (!editingBook.value) return;

      const { id, name, isbn } = editingBook.value;
      const isbnNumber = Number(isbn);

      if (Number.isNaN(isbnNumber)) {
        alert('ISBN must be a valid number');
        return;
      }

      try {
        await updateDoc(doc(db, 'books', id), {
          name,
          isbn: isbnNumber
        });
        alert('Book updated successfully!');
        editingBook.value = null;
      } catch (error) {
        console.error('Error updating book:', error);
      }
    };

    const deleteBook = async (bookId) => {
      if (!confirm('Delete this book?')) return;

      try {
        await deleteDoc(doc(db, 'books', bookId));
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };

    onMounted(() => applyQuery());
    onBeforeUnmount(() => {
      if (unsubscribe) {
        unsubscribe();
      }
    });

    return {
      books,
      isLoading,
      activeQuery,
      editingBook,
      applyQuery,
      startEdit,
      cancelEdit,
      saveEdit,
      deleteBook
    };
  }
};
</script>

<template>
  <div class="container-fluid px-2 mt-4">
    <div class="card shadow-sm">
      <div class="card-header bg-light">
        <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
          <div>
            <h1 class="h4 mb-1">Manage Books</h1>
          </div>
          <div class="d-flex flex-wrap gap-2 query-buttons">
            <Button
              label="ISBN >= 100"
              size="small"
              :outlined="activeQuery !== 'highIsbn'"
              severity="primary"
              @click="applyQuery('highIsbn')"
            />
            <Button
              label="Top 5 ISBN"
              size="small"
              :outlined="activeQuery !== 'topFive'"
              severity="primary"
              @click="applyQuery('topFive')"
            />
            <Button
              label="Alphabetical"
              size="small"
              :outlined="activeQuery !== 'alphabetical'"
              severity="primary"
              @click="applyQuery('alphabetical')"
            />
          </div>
        </div>
      </div>

      <div class="card-body">
        <DataTable
          :value="books"
          dataKey="id"
          responsiveLayout="scroll"
          size="small"
          :loading="isLoading"
          emptyMessage="No books match this query yet."
          class="p-datatable-sm"
        >
          <Column field="name" header="Title" headerClass="fw-bold text-primary">
            <template #body="{ data }">
              <div v-if="editingBook?.id !== data.id">
                {{ data.name }}
              </div>
              <InputText
                v-else
                v-model="editingBook.name"
                size="small"
                class="w-100"
                placeholder="Book title"
              />
            </template>
          </Column>

          <Column field="isbn" header="ISBN" headerClass="fw-bold text-primary" :sortable="true">
            <template #body="{ data }">
              <div v-if="editingBook?.id !== data.id">
                <span class="badge bg-light text-dark">{{ data.isbn }}</span>
              </div>
              <InputNumber
                v-else
                v-model="editingBook.isbn"
                size="small"
                class="w-100"
                placeholder="ISBN"
                :useGrouping="false"
              />
            </template>
          </Column>

          <Column header="Actions" headerClass="fw-bold text-primary">
            <template #body="{ data }">
              <div class="d-flex flex-wrap gap-2 action-buttons">
                <template v-if="editingBook?.id === data.id">
                  <Button
                    label="Save"
                    icon="pi pi-check"
                    size="small"
                    severity="success"
                    @click="saveEdit"
                  />
                  <Button
                    label="Cancel"
                    icon="pi pi-times"
                    size="small"
                    severity="secondary"
                    @click="cancelEdit"
                  />
                </template>
                <template v-else>
                  <Button
                    label="Edit"
                    icon="pi pi-pencil"
                    size="small"
                    severity="info"
                    @click="startEdit(data)"
                  />
                  <Button
                    label="Delete"
                    icon="pi pi-trash"
                    size="small"
                    severity="danger"
                    @click="deleteBook(data.id)"
                  />
                </template>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.query-buttons .p-button {
  min-width: 140px;
}

.action-buttons .p-button {
  min-width: 90px;
}

@media (max-width: 576px) {
  .query-buttons {
    width: 100%;
    flex-direction: column;
  }

  .query-buttons .p-button {
    width: 100%;
  }
}
</style>

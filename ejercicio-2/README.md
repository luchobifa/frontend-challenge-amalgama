# Ejercicio 2 - Estado

---

### 2.1 Pensar cómo sería la forma más óptima de guardar esta información en el browser. Codear la solución usando alguna estrategia de state management:

**BooksAndUsersContext.tsx**

```tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { AppState, Book, User } from "../types";

const BooksAndUsersContext = createContext<{
  state: AppState;
  setBooks: (books: Book[]) => void;
  setUsers: (users: User[]) => void;
}>({
  state: { books: [], users: [] },
  setBooks: () => {},
  setUsers: () => {},
});

export const BooksAndUsersProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState<AppState>(() => {
    const savedState = localStorage.getItem("booksAndUsersState");
    const parsedState = savedState
      ? JSON.parse(savedState)
      : { books: [], users: [] };
    return parsedState;
  });

  const setBooks = (books: Book[]) => {
    const newState = { ...state, books };
    setState(newState);
    localStorage.setItem("booksAndUsersState", JSON.stringify(newState));
  };

  const setUsers = (users: User[]) => {
    const newState = { ...state, users };
    setState(newState);
    localStorage.setItem("booksAndUsersState", JSON.stringify(newState));
  };

  return (
    <BooksAndUsersContext.Provider value={{ state, setBooks, setUsers }}>
      {children}
    </BooksAndUsersContext.Provider>
  );
};

export const useBooksAndUsers = () => useContext(BooksAndUsersContext);
```

---

### 2.1 Adjuntar en formato JSON cómo quedaría el estado, según lo que se planteó en el punto anterior:

**Resultado del Estado en JSON:**

```json
{
  "books": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": { "id": 1, "name": "Uncle Bob" }
    },
    {
      "id": 2,
      "title": "Clean Architecture",
      "author": { "id": 1, "name": "Uncle Bob" }
    }
  ],
  "users": [
    {
      "id": 1,
      "email": "chano@amalgama.co",
      "nickname": "Chano",
      "favorite_books": [
        {
          "id": 1,
          "title": "Clean Code",
          "favorited_at": "2024-01-01",
          "author": { "id": 1, "name": "Uncle Bob" }
        }
      ]
    },
    {
      "id": 2,
      "email": "sebastian@amalgama.co",
      "nickname": "Biche",
      "favorite_books": [
        {
          "id": 1,
          "title": "Clean Code",
          "favorited_at": "2024-06-30",
          "author": { "id": 1, "name": "Uncle Bob" }
        },
        {
          "id": 2,
          "title": "Clean Architecture",
          "favorited_at": "2024-12-31",
          "author": { "id": 1, "name": "Uncle Bob" }
        }
      ]
    }
  ]
}
```

---

## 2.3 Ventajas que tiene la solución propuesta

- Acceso global: El estado se puede acceder desde cualquier componente de la aplicación sin necesidad de pasar props manualmente.
- Reutilización de lógica: Las funciones para actualizar el estado (setBooks, setUsers) están encapsuladas en el proveedor.
- Escalabilidad: Si se requiere agregar más datos o funcionalidades, puedes extender el contexto fácilmente.
- Persistencia: El estado se guarda en localStorage del browser, lo que asegura que los datos persisten incluso después de recargar la página o cerrar la aplicación.

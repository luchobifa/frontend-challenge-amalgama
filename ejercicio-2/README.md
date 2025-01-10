# Ejercicio 2 - Estado

---

### 2.1 Pensar cómo sería la forma más óptima de guardar esta información en el browser. Codear la solución usando alguna estrategia de state management:

**BooksAndUsersReducer.ts**

```ts
import { Book, User, AppState } from "./types";

type Action =
  | { type: "SET_BOOKS"; payload: Book[] }
  | { type: "SET_USERS"; payload: User[] };

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_BOOKS":
      return { ...state, books: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
```

**BooksAndUsersContext.tsx**

```ts
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

import { AppState, Action } from "./types";
import reducer from "./BooksAndUsersReducer";

export const StateContext = createContext<AppState | undefined>(undefined);
export const DispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);
```

**BooksAndUsersProvider**

```tsx
const initialState: AppState = { books: [], users: [] };

export const BooksAndUsersProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const savedState = localStorage.getItem("booksAndUsersState");
  const initialStateFromStorage = savedState
    ? JSON.parse(savedState)
    : initialState;

  const [state, dispatch] = useReducer(reducer, initialStateFromStorage);

  useEffect(() => {
    localStorage.setItem("booksAndUsersState", JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
```

**BooksAndUsers.hooks.tsx**

```tsx
import { useContext } from "react";
import { StateContext, DispatchContext } from "./BooksAndUsersContext";

export const useBooksAndUsersState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      "useBooksAndUsersState must be used within a BooksAndUsersProvider"
    );
  }
  return context;
};

export const useBooksAndUsersDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      "useBooksAndUsersDispatch must be used within a BooksAndUsersProvider"
    );
  }
  return context;
};
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

- Control Total sobre el Estado: El reducer le da un control total sobre cómo se modifican las propiedades del estado, lo que facilita la validación de la lógica de actualización y la manipulación de datos sin riesgos de errores no controlados.
- Se tiene 2 providers lo que permite que cualquier componente puede actualizar la información o leerla. Esto da flexibilidad para que diferentes partes de la aplicación accedan a lo que realmente necesitan.
- Los hooks personalizados como useBooksAndUsersState y useBooksAndUsersDispatch encapsulan la lógica para acceder al estado y al despachador, proporcionando una manera sencilla y reutilizable para cualquier componente que necesite interactuar con el estado global.
- Evita el prop-drilling: Con React.Context, cualquier componente de la aplicación puede acceder al estado global o a las funciones de despacho (dispatch) sin necesidad de pasar propiedades a través de varios niveles de componentes. Esto simplifica la arquitectura de la aplicación..
- Escalabilidad: Si se requiere agregar más datos o funcionalidades, puedes extender el reducer facilmente.

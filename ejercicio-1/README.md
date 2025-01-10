# Ejercicio 1 - Componentes

---

### 1.1 Problemas y Posibilidades de Mejora

1. **Código no tipado:**

   - El código no esta tipado, lo que puede generar varios problemas, como la falta de seguridad en los datos que se manejan y una mayor probabilidad de errores en tiempo de ejecución. Esto también dificulta la comprensión del código y el mantenimiento a largo plazo.

   - Posible solución: Utilizar TypeScript para definir interfaces o tipos para los props y datos que se manejan.

2. **Mala legibilidad:**

   - El código contiene inconsistencias en la indentación, lo que dificulta su lectura. Además, la función que mapea y transforma los datos podría beneficiarse del uso de destructuring, que permite acceder a las propiedades de los objetos de manera más limpia y clara. Esto también ayuda a reducir la cantidad de veces que se hace referencia a propiedades profundamente anidadas.

   - Posible solución a la mala indentación del código: Uso de alguna herramienta de formateo como Prettier.

3. **Responsabilidad Única:**

   - En este caso, ContactsScreen no solo es responsable de la renderización de la vista, sino que también mapea y transforma los datos (contacts, cities, states). Esta lógica de transformación debería delegarse a un método o función externa, ya que no está directamente relacionada con la presentación de la interfaz y reduce la capacidad de reutilizar la lógica de transformación en otros lugares del código

   - También el componente muestra lo que pareciera ser el Header o menú de navegación de la aplicacion haciendo difícil reutilizar solo la lista de contactos en otras partes de la aplicación. Esto podría resolverse creando un componente separado para el Header o Navbar y usarlo como parte de un layout general que envuelve las pantallas.

   - El componente debería recibir la data ya mapeada y no realizar ninguna lógica de transformación dentro. Esto evitaría pasar 2 props extra: "cities" y "states".

4. **Falta de componentización y una estructura de componentes atómica:**

   - El componente ContactsScreen está sobrecargado, renderiza la lista de contactos, y maneja las direcciones de cada contacto. Todo esto debería delegarse a componentes más pequeños con responsabilidades claras.

   Esto provoca:

   - Difícil mantenimiento: La estructura de renderizado dificulta localizar y corregir errores o implementar nuevas características.
   - Poca reutilización: Cada vez que necesites renderizar contactos o direcciones (addresses) en otro lugar, tendrás que duplicar el código o copiar fragmentos de lógica 🚨.

5. **Accesibilidad:**

   - Falta de atributos como `alt` en las imágenes.

### Problemas Más Relevantes

- Código no tipado.
- Falta de componentización y una estructura de componentes atómica.
- ***

## 1.2 Refactorización del Componente

### Solución Refactorizada

**ContactsScreen.tsx**

```tsx
import { ContactCard } from "./ContactCard";
import { ContactParsed } from "../types";

type Props = {
  contacts: ContactParsed[];
};

export const ContactsScreen = ({ contacts }: Props) => (
  <div>
    <h1>Contacts 👥</h1>
    {contactsToDisplay.map((contact) => (
      <ContactCard key={contact.id} contact={contact} />
    ))}
  </div>
);
```

**ContactCard.tsx**

```tsx
import { ContactParsed } from "../types";
import { Link } from "react-router-dom";
import { AddressParsed } from "../types";

type Props = {
  contact: ContactParsed;
};

export const ContactCard = ({
  contact: {
    avatar_url,
    full_name,
    company,
    details,
    email,
    phone_number,
    addresses,
    id,
  },
}: Props) => (
  // suponiendo que cada ContactCard es clickeable y muestra ContactProfile.tsx
  <Link to={`/contact/${id}`} className="block">
    <div>
      <div>
        <img src={avatar_url} alt={full_name} />
        <h3>{full_name}</h3>
        <h4>{company}</h4>
      </div>
      <p>{details}</p>
      <ul>
        <li>Email: {email}</li>
        <li>Phone: {phone_number}</li>
        <li>
          {addresses.length > 1 ? <h4>Addresses:</h4> : <h4>Address:</h4>}
          {addresses.map((address) => (
            <Address key={address.line_1} address={address} />
          ))}
        </li>
      </ul>
    </div>
  </Link>
);
```

**Address.tsx**

```tsx
import { AddressParsed } from "../types";

type Props = {
  address: AddressParsed;
};

export const Address = ({
  address: { line_1, line_2, zip_code, city, state },
}: Props) => (
  <ul>
    <li>{line_1}</li>
    <li>{line_2}</li>
    <li>{zip_code}</li>
    <li>{city}</li>
    <li>{state}</li>
  </ul>
);
```

**mapContactsData.ts**

> El mapper debería ser utilizado fuera de los componentes y estos deberian recibir la información ya mapeada.

```ts
import { Contact, City, State, ContactParsed } from "../types";

export const mapContactsData = (
  contacts: Contact[],
  cities: City[],
  states: State[]
): ContactParsed[] => {
  return contacts.map(
    ({
      id,
      avatar_url,
      first_name,
      last_name,
      company,
      details,
      email,
      phone,
      addresses,
    }) => ({
      id,
      avatar_url,
      full_name: `${first_name} ${last_name}`,
      company,
      details: truncate(details, 100),
      email,
      phone_number: `(${phone.area_code}) ${phone.number}`,
      addresses: addresses.map((address) => ({
        line_1: address.line_1,
        line_2: address.line_2,
        zip_code: address.zip_code,
        city: findById(cities, address.city_id),
        state: findById(states, address.state_id),
      })),
    })
  );
};
```

**types.ts**

```ts
export type Contact = {
  id: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
  company: string;
  details: string;
  email: string;
  phone: {
    area_code: string;
    number: string;
  };
  addresses: Address[];
};

export type ContactParsed = {
  id: string;
  avatar_url: string;
  full_name: string;
  company: string;
  details: string;
  email: string;
  phone_number: string;
  addresses: AddressParsed[];
};

export type Address = {
  line_1: string;
  line_2: string;
  zip_code: number;
  city_id: string;
  state_id: string;
};

export type AddressParsed = {
  line_1: string;
  line_2: string;
  zip_code: number;
  city: string;
  state: string;
};

export type City = {
  id: string;
  name: string;
};

export type State = {
  id: string;
  name: string;
};
```

---

## 1.3 Justificación de las Mejoras (algunas ya fueron explicadas en el punto 1).

1. **Tipado con TypeScript:**

   - La introducción de TypeScript mejora la seguridad del código y facilita su comprensión al definir tipos claros para los props y los datos utilizados.

2. **Mayor legibilidad y simplificación del código:**

   - Se ha corregido la indentación y se ha mejorado la legibilidad general, lo que facilita la comprensión del código. En un entorno de trabajo establecer una configuración de formateo común es una buena práctica.
   - La desestructuración en la función de mapeo de los datos hace que el código sea más limpio y evita accesos repetidos a propiedades profundamente anidadas.

3. **Responsabilidad Única:**

   - El componente ContactsScreen ahora solo se encarga del renderizado, delegando la transformación de los datos a la función mapContactsData. Esto mejora la claridad del flujo de la aplicación y facilita la reutilización del código en otras partes del proyecto.
   - Se extrajo el componente NavBar de ContactsScreen lo que facilita la reutilización de este mismo en otras partes de la aplicación.

4. **Componentización y estructura atómica:**

   - Se ha dividido el código en varios componentes más pequeños, como ContactCard, Address y ContactScreen. Esto hace que el código sea más modular, reutilizable y fácil de mantener. Se separó el componente Navbar del ContactsScreen.

5. **Mejora de la accesibilidad:**

   - Se ha añadido el atributo alt a las imágenes.

---

## 1.4 Vista de Perfil del Contacto.

**ContactProfile.tsx**

> suponienndo que la data ya viene mapeada.

```tsx
import { Contact } from "../types";
import { Address } from "./Address";

type Props = {
  avatar: string;
  first_name: string;
  last_name: string;
  company: string;
  details: string;
  email: string;
  phone_number: string;
  address: AddressParsed | AddressParsed[];
};

export const ContactProfile = ({
  avatar,
  first_name,
  last_name,
  company,
  details,
  email,
  phone_number,
  address,
}: Props) => (
  <div>
    <div>
      <img src={avatar} alt={`${first_name} ${last_name}`} />
      <div>
        <h1>{`${first_name} ${last_name}`}</h1>
        <h2>{company}</h2>
      </div>
    </div>
    <div>
      <p>{details}</p>
      <div>
        <h3>Contact Information</h3>
        <ul>
          <li>
            <strong>Email:</strong> {email}
          </li>
          <li>
            <strong>Phone:</strong> {phone_number}
          </li>
          <li>
            {addresses.length > 1 ? (
              <strong>Addresses:</strong>
            ) : (
              <strong>Address:</strong>
            )}
            {addresses.map((address) => (
              <Address key={address.line_1} address={address} />
            ))}
          </li>
        </ul>
      </div>
    </div>
  </div>
);
```

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

   - En este caso, ContactsScreen no solo es responsable de la renderización de la vista, sino que también mapea y transforma los datos (contacts, cities, states). Esta lógica de transformación debería delegarse a un método o función externa, ya que no está directamente relacionada con la presentación de la interfaz.

   Esto provoca:

   - Que el componente sea más difícil de leer y mantener, ya que mezcla lógica de transformación con la lógica de presentación.
   - Reduce la capacidad de reutilizar la lógica de transformación en otros lugares del código.

4. **Falta de componentización y una estructura de componentes atómica:**

   - El componente ContactsScreen está sobrecargado, ya que realiza múltiples tareas: transforma los datos, renderiza la lista de contactos, y maneja las direcciones de cada contacto. Todo esto debería delegarse a componentes más pequeños con responsabilidades claras.

   Esto provoca:

   - Difícil mantenimiento: La estructura de renderizado dificulta localizar y corregir errores o implementar nuevas características.
   - Poca reutilización: Cada vez que necesites renderizar contactos o direcciones en otro lugar, tendrás que duplicar el código o copiar fragmentos de lógica 🚨.

5. **Accesibilidad:**

   - Falta de atributos como `alt` en las imágenes.

### Problemas Más Relevantes

- Código no tipado.
- Falta de componentización y una estructura de componentes atómica.
- Escalabilidad: Debe ser fácil agregar nuevas funcionalidades o manejar listas más grandes.

---

## 1.2 Refactorización del Componente

### Solución Refactorizada

**ContactsScreen.tsx**

```tsx
import { ContactCard } from './ContactCard';
import { mapContactsData } from '../utils/mapContactsData';
import { Contact, City, State } from '../types';

type Props {
  contacts: Contact[];
  cities: City[];
  states: State[];
}

export const ContactsScreen = ({ contacts, cities, states }: Props) => {
  const contactsToDisplay = mapContactsData(contacts, cities, states);

  return (
    <div>
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/contacts">My Contacts</a></li>
        </ul>
      </nav>
      <h1>Contacts 👥</h1>
      {contactsToDisplay.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};
```

**ContactCard.tsx.tsx**

```tsx
import { Contact } from '../types';
import { Address } from './Address';

type Props {
  contact: Contact;
}

export const ContactCard = ({ contact: { avatar_url, full_name, company, details, email, phone_number, addresses } }: Props) => {
  return (
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
          {addresses.map(address => (
            <Address key={address.line_1} address={address} />
          ))}
        </li>
      </ul>
    </div>
  );
};
```

**Address.tsx**

```tsx
import { Address as AddressType } from '../types';

type Props {
  address: AddressType;
}

export const Address = ({ address }: Props) => {
  return (
    <ul>
      <li>{address.line_1}</li>
      <li>{address.line_2}</li>
      <li>{address.zip_code}</li>
      <li>{address.city}</li>
      <li>{address.state}</li>
    </ul>
  );
};
```

**mapContactsData.ts**

```ts
import { Contact, City, State } from "../types";

export const transformContactsData = (
  contacts: Contact[],
  cities: City[],
  states: State[]
) => {
  return contacts.map((contact) => ({
    id: contact.id,
    avatar_url: contact.avatar_url,
    full_name: `${contact.first_name} ${contact.last_name}`,
    company: contact.company,
    details: truncate(contact.details, 100),
    email: contact.email,
    phone_number: `(${contact.phone.area_code}) ${contact.phone.number}`,
    addresses: contact.addresses.map((address) => ({
      line_1: address.line_1,
      line_2: address.line_2,
      zip_code: address.zip_code,
      city: findById(cities, address.city_id),
      state: findById(states, address.state_id),
    })),
  }));
};
```

**types.ts**

```ts
export interface Contact {
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
}

export interface Address {
  line_1: string;
  line_2: string;
  zip_code: number;
  city_id: string;
  state_id: string;
}

export interface City {
  id: string;
  name: string;
}

export interface State {
  id: string;
  name: string;
}
```

---

## 1.3 Justificación de las Mejoras (ya fueron explicadas en el punto 1).

1. **Tipado con TypeScript:**

   - La introducción de TypeScript mejora la seguridad del código y facilita su comprensión al definir tipos claros para los props y los datos utilizados.

2. **Mayor legibilidad y simplificación del código:**

   - Se ha corregido la indentación y se ha mejorado la legibilidad general, lo que facilita la comprensión del código. En un entorno de trabajo establecer una configuración de formateo común es una buena práctica.
   - La desestructuración en la función de mapeo de los datos hace que el código sea más limpio y evita accesos repetidos a propiedades profundamente anidadas.

3. **Responsabilidad Única:**

   - El componente ContactsScreen ahora solo se encarga de la presentación, delegando la transformación de los datos a la función mapContactsData. Esto mejora la claridad del flujo de la aplicación y facilita la reutilización del código en otras partes del proyecto.

4. **Componentización y estructura atómica:**

   - Se ha dividido el código en varios componentes más pequeños, como ContactCard, Address y ContactScreen. Esto hace que el código sea más modular, reutilizable y fácil de mantener.

5. **Mejora de la accesibilidad:**

   - Se ha añadido el atributo alt a las imágenes.

---

## 1.4 Vista de Perfil del Contacto.

```tsx
import { Contact } from '../types';
import { Address } from './Address';

type Props {
  contact: Contact;
}

export const ContactCard = ({ contact: { avatar_url, full_name, company, details, email, phone_number, addresses } }: Props) => {
  return (
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
          {addresses.map(address => (
            <Address key={address.line_1} address={address} />
          ))}
        </li>
      </ul>
    </div>
  );
};
```

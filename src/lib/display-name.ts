import type { Person, SmallPerson } from './app-types';

export function displayName(person: Person | SmallPerson) {
  return person.display_name || `${person.first_name} ${person.last_name}`;
}

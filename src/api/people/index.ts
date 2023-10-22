import ResponseApi from '../../types/api.ts';
import People from '../../types/people.ts';

export async function getPeoples(search: string = ''): Promise<ResponseApi<People>> {
  try {
    const result = await fetch(`https://swapi.dev/api/people?search=${search}`);
    if (!result.ok) {
      throw new Error();
    }
    return result.json();
  } catch {
    throw new Error("Oops, something's gone wrong");
  }
}

import { ModelWithId, ModelWithIdConstructor } from './types';
export const mapIdToInstance = <T extends ModelWithId>(
  constructor: ModelWithIdConstructor<T>,
  id: number,
): T => {
  const instance = new constructor();
  instance.id = id;
  return instance;
};

export const mapIdsToInstances = <T extends ModelWithId>(
  constructor: ModelWithIdConstructor<T>,
  ids: number[],
): T[] => ids.map((id) => mapIdToInstance<T>(constructor, id));

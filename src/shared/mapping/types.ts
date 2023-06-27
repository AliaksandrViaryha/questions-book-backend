export type ModelWithId = { id: number };
export type ModelWithIdConstructor<T extends ModelWithId> = { new (): T };

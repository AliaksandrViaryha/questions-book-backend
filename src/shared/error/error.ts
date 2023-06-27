import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entity: { new (): unknown } | string, id: number | string) {
    super(
      `${
        typeof entity === 'string' ? entity : entity.name
      } with id=${id} was not found`,
    );
  }
}

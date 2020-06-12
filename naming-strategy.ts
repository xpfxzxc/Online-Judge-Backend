import { plural } from 'pluralize';
import * as changeCase from 'change-case';
import { Relation, RelationId } from 'typeorm-model-generator';

let pluralize: boolean;

export function enablePluralization(value: boolean) {
  pluralize = value;
}

export function relationIdName(
  relationId: RelationId,
  relation: Relation,
): string {
  const columnOldName = relationId.fieldName;

  const isRelationToMany =
    relation.relationType === 'OneToMany' ||
    relation.relationType === 'ManyToMany';
  let newColumnName = changeCase.camelCase(columnOldName.replace(/[0-9]$/, ''));

  if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
    newColumnName = newColumnName.substring(0, newColumnName.length - 1);
  }
  if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
    newColumnName = newColumnName.substring(0, newColumnName.length - 1);
  }
  if (isRelationToMany && pluralize) {
    newColumnName = plural(newColumnName);
  }

  newColumnName = changeCase.snakeCase(newColumnName);
  print('relationIdName', columnOldName, newColumnName);
  return newColumnName;
}

export function relationName(relation: Relation): string {
  const columnOldName = relation.fieldName;

  const isRelationToMany =
    relation.relationType === 'OneToMany' ||
    relation.relationType === 'ManyToMany';
  let newColumnName = changeCase.camelCase(columnOldName.replace(/[0-9]$/, ''));

  if (
    newColumnName.toLowerCase().endsWith('id') &&
    !newColumnName.toLowerCase().endsWith('guid')
  ) {
    newColumnName = newColumnName.substring(
      0,
      newColumnName.toLowerCase().lastIndexOf('id'),
    );
  }
  if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
    newColumnName = newColumnName.substring(0, newColumnName.length - 1);
  }
  if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
    newColumnName = newColumnName.substring(0, newColumnName.length - 1);
  }
  if (isRelationToMany && pluralize) {
    newColumnName = plural(newColumnName);
  }

  newColumnName = changeCase.camelCase(newColumnName);
  print('relationName', columnOldName, newColumnName);
  return newColumnName;
}

export function entityName(oldEntityName: string): string {
  const newEntityName = changeCase.pascalCase(oldEntityName + 'Entity');
  print('entityName', oldEntityName, newEntityName);
  return newEntityName;
}

export function columnName(oldColumnName: string): string {
  const newColumnName = changeCase.camelCase(oldColumnName);
  print('oldColumnName', oldColumnName, newColumnName);
  return newColumnName;
}

function print(type: string, oldString: string, newString: string) {
  console.log(type, ':', oldString, '->', newString);
}

import {Field, ID, Int, ObjectType} from '@nestjs/graphql';
import {IsInt, IsISO31661Alpha3, IsISBN} from 'class-validator';

import {Price} from '../../price/schema/price.schema';

@ObjectType()
export class Author {
  @Field()
  name!: string;

  @Field(() => [String], {nullable: true})
  roles?: string[];
}

@ObjectType()
export class Issuer {
  @Field()
  name!: string;
}

@ObjectType()
export class Company {
  @Field()
  name!: string;
}

@ObjectType()
export class Publisher {
  @Field(() => [Issuer], {nullable: true})
  issuers?: [Issuer];

  @Field(() => [Company], {nullable: true})
  company?: [Company];
}

@ObjectType()
export class Printer {
  @Field(() => Company)
  company!: Company;

  @Field(() => [String], {nullable: true})
  roles?: string[];
}

@ObjectType()
export class Version {
  @Field(() => Int, {defaultValue: 1})
  @IsInt()
  version!: number;

  @Field()
  @IsISBN()
  isbn?: string;

  @Field(() => Date, {nullable: true})
  publishedAt?: string;
}

@ObjectType()
export class BookPrice {
  @Field(() => Price)
  base!: Price;

  @IsISO31661Alpha3()
  tax?: string;
}

@ObjectType()
export class Book {
  @Field((type) => ID)
  id!: string;

  @Field()
  title!: string;

  @Field((type) => [Author], {nullable: true})
  authors?: Author[];

  @Field({nullable: true})
  volume?: number;

  @Field((type) => [Version], {nullable: true})
  versions?: Version[];

  @Field((type) => Int, {nullable: true})
  @IsInt()
  pages?: number;

  @Field((type) => [String], {nullable: true})
  categories?: string[];

  @Field((type) => [String], {nullable: true})
  keywords?: string[];

  @Field((type) => Publisher, {nullable: true})
  publishers?: Publisher;

  @Field((type) => [Printer], {nullable: true})
  printers?: Printer[];

  @Field((type) => BookPrice, {nullable: true})
  price?: BookPrice;
}
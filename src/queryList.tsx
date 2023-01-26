import { useQuery, useQueryClient } from "react-query";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

declare interface ListItem {
  name: string;
  description: string;
  price: string;
}

class ListGenerator {
  private generator: IterableIterator<ListItem>;
  private list: ListItem[] = [];
  private pageSize = 100;

  constructor() {
    this.generator = this.generateList();
  }

  *generateList(): IterableIterator<ListItem> {
    while (true) {
      const name = faker.commerce.productName();
      const description = faker.commerce.productDescription();
      const price = faker.commerce.price();
      yield { name, description, price };
    }
  }

  getNext(pageSize: number): ListItem[] {
    for (let i = 0; i < this.pageSize; i++) {
      const { value, done } = this.generator.next();
      this.list.push(value);
    }
    return this.list;
  }
}

export const useList = (initialPageSize: number, initialPageNumber: number) => {
  const [listGenerator] = useState(() => new ListGenerator());
  const [list, setList] = useState<ListItem[]>(listGenerator.getNext(100));
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  useEffect(() => {
    if(pageNumber>1) {
      setList(listGenerator.getNext(initialPageSize * pageNumber));
    }
  }, [pageNumber]);

  return { list, handleNextPage };
};

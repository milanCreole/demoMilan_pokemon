export type pokemonListModel = {
  name: string;
  url: string;
};

export interface pokemonList {
  data: {
    count: number;
    next: string;
    results: [pokemonListModel];
  };
  page: number;
  isPrevActive: boolean;
  isNextActive: boolean;
  incrementPage: Function;
  decrementPage: Function;
  isFetching: boolean;
  refetch: Function;
}

export interface ContextAuth {
  // setchoosenYear: React.Dispatch<React.SetStateAction<undefined>>;
  models: string[];
  colors: string[];
  fuels: string[];
  // setBrand: React.Dispatch<React.SetStateAction<string>>;
  // brand: string;
  carsBrands: string[];
  year: number[];
  // setYear: React.Dispatch<React.SetStateAction<never[]>>;
  choosenYear: undefined;
  filterClear: boolean;
  setClearFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filter: any;
  setFilter: React.Dispatch<React.SetStateAction<string | number>>;
  filterType: any;
  setFilterType: React.Dispatch<React.SetStateAction<string | number>>;
}

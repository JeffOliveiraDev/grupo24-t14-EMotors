export interface ContextAuth {
  setchoosenYear: React.Dispatch<React.SetStateAction<undefined>>;
  getBrand: () => Promise<void>;
  models: string[];
  colors: string[];
  fuels: string[];
  setBrand: React.Dispatch<React.SetStateAction<string>>;
  brand: string;
  carsBrands: string[];
  year: never[];
  setYear: React.Dispatch<React.SetStateAction<never[]>>;
  choosenYear: undefined;
  filterClear: boolean;
  setClearFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

import { Users } from "@/interfaces";

export interface iHomePageContext {
  setchoosenYear: React.Dispatch<React.SetStateAction<undefined>>;
  getBrand: () => Promise<void>;
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

export interface iannouncesPageContext {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editDeleteModal: boolean;
  setModalEditDelete: React.Dispatch<React.SetStateAction<boolean>>;
  announces: any;
  user: any;
  setAnnounces: React.Dispatch<any>;
  announceId: undefined;
  setAnnounceId: React.Dispatch<React.SetStateAction<undefined>>;
  modalDelete: boolean;
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAnnounce: React.Dispatch<any>;
  detailedImage: boolean;
  selectedAnnounce: any;
  setDetailedImage: React.Dispatch<React.SetStateAction<boolean>>;
}

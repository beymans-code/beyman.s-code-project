import { TypeIcon } from "../../../dynamic-components/models/dynamic-icon.models";

export interface ListCard {
  name: string,
  list: Item[],
  imageUrl: string;
  description?: string;
  thanksTo?: string;
  thanksToName?: string;
}

export interface Item {
  typeIcon: TypeIcon
  icon: string,
  description: string
}
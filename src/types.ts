export interface WowItem {
  id: string;
  name: string;
  type: string;
  attributes: {
    [attribute: string]: number | undefined;
  };
}

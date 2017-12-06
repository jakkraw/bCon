export interface Order{
  id:number,
  tableNumber:number,
  items:Item[],
  status:Status
}

export interface Item{
  name:string,
  price:number,
  quantity: number
}

export enum Status { DONE, PENDING, CANCELLED }

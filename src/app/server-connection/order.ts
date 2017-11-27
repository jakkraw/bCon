export interface Order{
    id:number,
    tableNumber:number,
    items:Item[],
    status:Status
  }

export interface Item{
    name:string,
    price:number
  }

export enum Status { DONE, PENDING, CANCELLED };

export interface Order{
    id:number,
    table:number,
    items:Item[],
    status:Status
  }
  
export interface Item{
    name:string,
    price:number
  }

export enum Status { DONE, PENDING, CANCELLED };
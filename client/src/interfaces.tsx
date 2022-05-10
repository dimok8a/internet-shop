import React from "react";
import {ESize} from "./enums";

export interface IClothe {
    name: string,
    id: number,
    size: ESize,
    price: number,
    images: string
}

interface ISize {
    name: ESize,
    count: number
}

export interface IClotheData {
    name: string,
    structure: { [name: string]: number }[],
    price: number,
    sizes: {
        id: number, name : string, count: number}[],
    images: string[],
    description: string,
    product_type_id: number,
    id:number
}

export interface IClotheCart {
    id:number,
    name: string,
    size_name: string,
    count: number,
    max_count: number,
    price: number,
    images: string
}

export interface IClotheDelivery {
    id:number,
    name:string,
    size_name: string,
    count: number,
    price: number,
    image: string,
    status: string
}


export interface IUrl{
    text: string,
    url: string
}

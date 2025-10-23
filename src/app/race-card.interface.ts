export interface Race{
    title: string,
    circuit: string,
    location:string,
    date:string,
    status: "Proxima" | "En vivo" | "Expirada",
    imageURL: string
};
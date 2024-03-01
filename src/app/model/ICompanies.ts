export interface ICompanies {
  id:number;
  ragioneSociale:String;
  partitaIva:number;
  email:string;
  dataInserimento:string;
  dataUltimoContatto:string;
  fatturatoAnnuale:number;
  per:string;
  telefeno:string;
  emailContatto:string;
  nomeContatto: string;
  cognomeContatto:string;
  telefonoContatto:number;
  logoAziendale:any;
  tipoCliente: string;
  fatture: any[];
  indirizziAzienda: any[];
}

export interface GenericResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: DataModel;
}

// export interface FileData {

// }
// export interface DataBaseHeaderList {

// }

export interface FileHeaderList {
  propertiesId: string;
  propertiesName: string;
  propertiesValue: Array<string>;
  selected: boolean;
  pickList?: Array<PickList>;
}
export interface DataModel extends GenericResponse {

  fileName: string;
  fileHeaderResponse: Array<FileHeaderList>;
  databaseHeadersList: Map<string, number>;
  executiveCompanyList: any;

}

export interface FileRequest {
  fileName: string;
  fileHeaders: Map<number, string>;

}
export interface PickList {
  id: any;
  value: string;
}

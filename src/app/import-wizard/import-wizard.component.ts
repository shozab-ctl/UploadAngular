import { Component, OnInit } from '@angular/core';
import { DataModel, FileHeaderList } from '../file-modal';
import { FileUploadServiceService } from '../file-upload-service.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { element } from 'protractor';
import * as _ from 'lodash';

@Component({
  selector: 'app-import-wizard',
  templateUrl: './import-wizard.component.html',
  styleUrls: ['./import-wizard.component.css']
})
export class ImportWizardComponent implements OnInit {

  displayedColumns: string[] = ['mapped', 'columnNames', 'columnValues', 'columnNameDB'];
  public dataModel: Array<FileHeaderList>;
  public databaseHeadersList: Map<string, number>;
  public anArray = [];
  public propertiesArray = [];
  // public responseArray = [];

  formData: FormGroup;
  constructor(
    private fileUploadService: FileUploadServiceService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formData = new FormGroup({
      fileHeaders: new FormControl(),
      fileName: new FormControl()
    })
    this.fileUploadService.getImportData().subscribe(val => {
      this.dataModel = val.fileHeaderResponse;
      this.databaseHeadersList = val.databaseHeadersList;
      this.formData.controls['fileName'].setValue(val.fileName);
      for (const k in this.databaseHeadersList) {
        if (this.databaseHeadersList.hasOwnProperty(k)) {
          this.anArray.push({ id: Number(k), value: this.databaseHeadersList[k] });
        }
      }
      this.dataModel = this.dataModel.map((data, i) => {
        return {
          ...data,
          pickList: this.anArray.map(picklist => {
            if (picklist.id === data.propertiesId) {
              return {
                ...picklist,
                selected: data.selected
              };
            } else {
              return {
                ...picklist,
              };
            }

          }),
          selectedValue: (data.selected === true ? data.propertiesId : 0),
        };
      });
      this.setSelectedValues();
    });

  }
  pushValuesToArray(value, selectedValue, pickList, index) {
    if (value === 0) {
      this.propertiesArray.push({ columnFile: selectedValue, columnNameDB: _.find(pickList, { id: selectedValue }).value });
      this.dataModel = this.dataModel.map((data, i) => {
        if (index === i) {
          return {
            ...data,
            selected: true,
            pickList: this.anArray.map(picklist => {
              if (picklist.id === selectedValue) {
                return {
                  ...picklist,
                  selected: true
                };
              } else {
                return {
                  ...picklist,
                };
              }
            }),
          };
        } else {
          return {
            ...data
          }
        }

      });
    } else {
      this.propertiesArray.push({ columnFile: value, columnNameDB: _.find(pickList, { id: selectedValue }).value });
    }
  }

  setSelectedValues() {
    this.dataModel.find(element => {
      if (element.selected === true) {
        this.propertiesArray.push({ columnFile: element.propertiesId, columnNameDB: _.find(element.pickList, { id: element.propertiesId }).value });
      }
      return false;
    });
  }
  onSubmit() {
    const finalMap = this.propertiesArray.reduce(function (map, obj) {
      map[obj.columnFile] = obj.columnNameDB;
      return map;
    }, {});
    this.formData.controls['fileHeaders'].setValue(finalMap);
    this.fileUploadService.savefile(this.formData.value).subscribe(val => {
    });
  }
}

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import { ProvisioningService } from './provisioning.service';
import { ProvisioningModel } from './provisioning.model';
import { Router } from '@angular/router';
import { ToastrService, ToastrCode } from '@core';
import { MatStepper, MatStep } from '@angular/material';
import { CloudDataService } from '../services/cloud-data.service';
import { Subscription } from 'rxjs';

import {
  //SharedDataService,
  NotificationService
} from '@global';
import { LoaderService } from '../components/service/loader.service';

enum FormType {
  DROPDOWN = 'DropDown',
  TEXT = 'Text',
  HIDDEN = 'Hidden',
  NUMBER = 'Number',
}

@Component({
  selector: 'app-provisioning',
  templateUrl: './provisioning.component.html',
  styleUrls: ['./provisioning.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})

export class ProvisioningComponent implements OnInit, AfterViewInit {
  provisioningModel: ProvisioningModel;
  @ViewChild("catalogInputType") catalogInputType: ElementRef<any>;
  @ViewChild("catalogNumberType") catalogNumberType: ElementRef<any>;
  @ViewChild("stepperTwoForm") stepperTwoForm: FormGroup;
  @ViewChild("stepperFirst") stepperFirst: MatStep;
  @ViewChild("stepperSecond") stepperSecond: MatStep;
  @ViewChild("stepper") stepper: MatStepper;
  @ViewChild("matAccordians") matAccordians: any;
  @ViewChild("catalogsubmit") catalogsubmit: ElementRef;
  @ViewChild("finalSubmit") finalSubmit: ElementRef;
  private subscriptions: Subscription = new Subscription();
  stepperOneForm: FormGroup;
  // stepperTwoForm: FormGroup;
  isEditable = false;
  userParameterDetails = {};

  //public stepperOneForm: FormGroup;
  htmlStr: string = 'Add';
  departmentData: [];
  projectData: [];
  applicationData: [];
  environmentData: [];
  catalogData: any;
  catalogParam: any;
  fieldType: any[] = [];
  server: any;
  operatingSystem: any;
  catalogID: any;
  customCollapsedHeight: string = 'auto';
  customExpandedHeight: string = 'auto';
  openedPanelStatus: {} = {};
  errorMessage: string = "";
  catalogImage: string;
  secondStepperValidation: boolean;
  stepperOneUpdated: boolean = false;
  currentCatalogIndex: number;
  catalogFormField: Object = {
    "textField": {
      "invalid": true
    },
    "dropdownField": {
      "invalid": true
    },
    "numberField": {
      "invalid": true
    },
    "hiddenField": {
      "invalid": true
    }
  }

  confirmPageResponse: any;
  catalogForm = this._fb.group({
    fields: this._fb.array([])
  });
  isAddedToCatalog: boolean = false;
  secondStepperRequestData = {};
  mergedDropdownData: {} = {};
  catalogAdded: boolean = false;
  hiddenFormData: {} = {};
  requestCount: {} = {};
  cloudData: any;
  displayData = {};

  constructor(private provisioningService: ProvisioningService,
    private router: Router,
    private _toastrService: ToastrService,
    private _fb: FormBuilder,
    private _cloudData: CloudDataService,
    private notification: NotificationService,
    private loaderService: LoaderService
  ) {
    this.notification.setvalue.subscribe(res => {
      let response = res.resetProvision;
      if (response == true) {
        this.cloudData = this._cloudData.getCloudData();
        this.getDepartments(this.cloudData.id);
        if (this.stepper) {
          this.stepper.reset();
        }
        if (this.stepperOneForm) {
          this.stepperOneForm.reset();
        }
        this.catalogForm.reset();
      }
      else {
        this.cloudData = this._cloudData.getCloudData();
        this.getDepartments(this.cloudData.id);
      }
    })

  }

  ngOnInit() {
    this.provisioningModel = new ProvisioningModel();
    this.stepperOneForm = new FormGroup({
      name: new FormControl(null),
      department: new FormControl(''),
      project: new FormControl(''),
      environment: new FormControl(''),
      application: new FormControl(''),
      remark: new FormControl(''),
      autoProvision: new FormControl(false)
    })
  }

  ngAfterViewInit() {
  }

  getDepartments(id) {
    this.provisioningService.getDepartments(id).subscribe(res => {
      let departmentPicklist = res;
      this.departmentData = departmentPicklist.data;
    });
  }

  selectDepartment(val) {
    let departmentId = val.id;
    this.getProjects(departmentId)
    this.stepperOneForm.controls['project'].reset();
    this.stepperOneForm.controls['environment'].reset();
    this.stepperOneForm.controls['application'].reset();
    if (this.catalogAdded) {
      this.stepperOneUpdated = true;
      this.htmlStr = "Add";
    } else {
      this.stepperOneUpdated = true;
    }
  }

  selectProject(val) {
    let projectId = val.id;
    this.getApplication(projectId);
    this.getEnvironments(projectId);
    if (this.catalogAdded) {
      this.stepperOneUpdated = true;
      this.htmlStr = "Add";
    } else {
      this.stepperOneUpdated = true;
    }
  }
  // selectApplication(){
  //   if(this.catalogAdded){
  //     this.stepperOneUpdated = true;
  //     this.htmlStr = "Add";
  //   }
  // }
  // selectEnvironment(){
  //   if(this.catalogAdded){
  //     this.stepperOneUpdated = true;
  //     this.htmlStr = "Add";
  //   }
  // }
  // selectName(){
  //   if(this.catalogAdded){
  //     this.stepperOneUpdated = true;
  //     this.htmlStr = "Add";
  //   }
  // }
  // selectComment(){
  //   if(this.catalogAdded){
  //     this.stepperOneUpdated = true;
  //     this.htmlStr = "Add";
  //   }
  // }
  getProjects(departmentId) {
    this.provisioningService.getProjects(departmentId, this.cloudData.id).subscribe(res => {
      let projectPicklist = res;
      this.projectData = projectPicklist.data;
    });
  }

  getApplication(projectId) {
    this.provisioningService.getApplications(projectId).subscribe(res => {
      let applicationPicklist = res;
      this.applicationData = applicationPicklist.data;
    });
  }

  getEnvironments(projectId) {
    this.provisioningService.getEnvironments(projectId).subscribe(res => {
      let environmentPicklist = res;
      this.environmentData = environmentPicklist.data;
    });
  }

  firstStepperData(nextStepper?) {
    this.stepper.selectedIndex = 0;
    if (this.stepperOneForm.invalid) {
      if (this.stepperFirst) {
        this.stepperFirst.completed = false;

        nextStepper.previous();
      }

      return;
    }
    this.getCatalogs(this.cloudData.id, this.stepperOneForm.value.project.id);
    this.stepperOneForm.value;
    let stepperData: any = {};
    stepperData.departmentId = this.stepperOneForm.value.department.id;
    stepperData.environmentId = this.stepperOneForm.value.environment.id;
    stepperData.name = this.stepperOneForm.value.name;
    stepperData.applicationId = this.stepperOneForm.value.application.id;
    stepperData.projectId = this.stepperOneForm.value.project.id;
    stepperData.remark = this.stepperOneForm.value.remark;
    stepperData.autoProvision = this.stepperOneForm.value.autoProvision;
    if (this.stepperFirst && nextStepper) {
      this.stepperFirst.completed = true;
      nextStepper.next();
    }
    return stepperData;

  }

  getCatalogs(cloudId, projectId) {
    if (this.stepperOneUpdated) {
      this.catalogAdded = false;
      this.openedPanelStatus = [];
      this.provisioningService.getCatalogs(cloudId, projectId).subscribe(res => {
        this.catalogData = res;
        this.requestCount = this.catalogData.data.requestCount;
        this.fieldType = new Array<any>(this.catalogData.data.catalogs.length)
        this.loadForms();
        this.stepperOneUpdated = false;
      });
    } else {
      if (!this.catalogData) {
        this.provisioningService.getCatalogs(cloudId, projectId).subscribe(res => {
          this.catalogData = JSON.parse(res._body);
          this.requestCount = this.catalogData.data.requestCount;
          this.fieldType = new Array<any>(this.catalogData.data.catalogs.length)
          this.loadForms();
        });
      } else {
        if (!this.catalogData) {
          this.provisioningService.getCatalogs(cloudId, projectId).subscribe(res => {
            this.catalogData = res;
            this.requestCount = this.catalogData.data.requestCount;
            this.fieldType = new Array<any>(this.catalogData.data.catalogs.length)
            this.loadForms();
          });
        }
      }
    }
  }

  getCatalogsById(catalogId, index) {
    if (catalogId) {

      this.catalogID = catalogId;
      this.provisioningService.getCatalogById(catalogId).subscribe(res => {
        this.catalogParam = res;
        console.log(this.catalogParam.data.catalogParamTOs);
        this.fieldType[index] = this.catalogParam.data.catalogParamTOs;
        let hiddenParam = this.fieldType[index].filter((item: any) => {
          return item.type === "Hidden";
        });
        hiddenParam.forEach((element: any) => {
          if (element.paramName === "Server") {
            this.server = element.defaultValue;
          }
          else if (element.paramName === "Os") {
            this.operatingSystem = element.defaultValue;
          }
        });
        for (const key in hiddenParam) {
          if (hiddenParam[key] && hiddenParam[key].paramName) {
            this.hiddenFormData[hiddenParam[key].paramName] = hiddenParam[key].defaultValue;

          }
        }

        const fields = this.catalogForm.controls['fields'] as FormArray;
        fields.controls[index] = this.loadFormFields(this.fieldType[index]);

        this.createStepTwoForm(index);
      });
    }

  }

  loadForms() {
    const fields = this.catalogForm.controls['fields'] as FormArray;
    if (this.catalogData && this.catalogData.data && this.catalogData.data.catalogs && this.catalogData.data.catalogs.length > 0) {
      this.catalogData.data.catalogs.forEach(d => { fields.push(new FormArray([])); });
    }
  }

  loadFormFields(d: any) {
    const fieldsArray: FormArray = new FormArray([]);
    //let arr = [];
    // arr[0] = d;
    // arr[0].forEach((catalog) => {
    d.forEach((catalog) => {
      let control: FormControl;
      const validations: ValidatorFn[] = [];
      switch (catalog.type) {
        case FormType.DROPDOWN: break;
        case FormType.TEXT:
          validations.push(Validators.maxLength(catalog.maxLength)); break;
        case FormType.NUMBER:
          validations.push(Validators.min(catalog.minValue));
          validations.push(Validators.max(catalog.maxValue)); break;
        case FormType.HIDDEN: break;
      }

      if (catalog.type != FormType.HIDDEN) {
        if (catalog.isRequired.toLowerCase() === 'yes') { validations.push(Validators.required); }
      }

      control = new FormControl(catalog.defaultValue, validations);
      fieldsArray.push(control);
    });

    return fieldsArray;
  }


  createStepTwoForm(index: number) {
    // FIRST CREATE THE CONTROLS
    const formControls = {};
    this.fieldType[index].forEach((item: any) => {
      if (item.type === 'Hidden') {
        formControls[item.paramName] = new FormControl(item.defaultValue);
      } else {
        formControls[item.paramName] = new FormControl(null)
      }

    });
    this.stepperTwoForm = new FormGroup({ ...formControls });
  }


  showThirdStepperData() {
    this.confirmPageResponse = {
      "info": {
        "name": this.stepperOneForm.value.name,
        "department": this.stepperOneForm.value.department.name,
        "project": this.stepperOneForm.value.project.name,
        "application": this.stepperOneForm.value.application.name,
        "environment": this.stepperOneForm.value.environment.name,
        "remark": this.stepperOneForm.value.remark,
        "autoProvision": this.stepperOneForm.value.autoProvision
      },
    };
    const dataObj = this.userParameterDetails;
    //this.userParameterDetails = dataObj;
    this.userParameterDetails = this.replaceDropdownKeyWithValue(dataObj, this.mergedDropdownData);
  }
  replaceDropdownKeyWithValue(userParameterDetails, mergedDropdownData) {
    this.displayData;
    for (const iterator in mergedDropdownData) {
      if (mergedDropdownData[iterator]) {
        let object = mergedDropdownData[iterator];
        for (const key in object) {
          for (const key_ in this.displayData) {
            if (this.displayData[key_] === key) {
              this.displayData[key_] = object[key];
            }
          }
        }
      }
    }
    this.catalogImage = mergedDropdownData["imageURL"];

    return this.displayData;
  }

  summarySubmit() {
    this.loaderService.startLoading();
    let stepOne = this.firstStepperData();
    const stepSecond = this.secondStepperRequestData;
    let finalData = {
      data: {
        "request": {
          "id": null,
          "athenaID": null,
          "iTSMID": null,
          "remark": null,
          "active": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "statusId": 1,
          "catalogId": this.catalogID,
          "cloudUserId": 1,
          ...stepOne
        },
        "userParameterDetails": {
          ...stepSecond
        }
      },
    }
    this.provisioningService.provisioningSubmitData(finalData).subscribe(res => {
      if (res.result.ServiceNowRequestId) {
        this.redirectToDashboard(res);
        this.loaderService.stopLoading();
      } else {
        this._toastrService.showError(` ${res.data.AthenaRequestId} : ${res.data.message}`);
      }
      console.log(res);
    },
      err => {
        this._toastrService.showError(`Error : ` + err);
      });
  }
  resetSubmit(stepper) {
    stepper.reset();
    this.router.navigate(['/dashboard']);
  }
  stepperThirdData(nextStepper) {
    if (this.catalogAdded && !(this.catalogForm.get('fields') as FormArray).controls[this.currentCatalogIndex].invalid) {
      this.showThirdStepperData();
      if (this.stepperSecond && nextStepper) {
        this.stepperSecond.completed = true;
        nextStepper.next();
      }
      this.setFocusOnFinalSubmit();
    } else {
      if (this.stepperSecond) {
        this.stepper.selectedIndex = 1;
        this.stepperSecond.completed = false;
      }
      this._toastrService.showError(ToastrCode.PleaseConfigureCatalg);
    }

  }

  goToFirstStepper(stepper_, index: number) {
    if (stepper_) {
      setTimeout(() => {
        this.stepper.selectedIndex = index;
      });
      if (index == 0) {
        this.stepperFirst.editable = true;
      } else if (index == 1) {
        this.stepperSecond.editable = true;
      }
    }
  }

  openGroup = (event: Event, index: number, catalogId: number) => {
    if (!this.catalogAdded) {
      if (catalogId) {
        this.getCatalogsById(catalogId, index);
      }
    }
    (document.getElementById("descriptionDiv" + index)) ? document.getElementById("descriptionDiv" + index).style.display = "none" : "";
    (document.getElementById("footerDiv" + index)) ? document.getElementById("footerDiv" + index).style.display = "none" : "";

    (document.getElementById("toggleIcons" + index)) ? document.getElementById("toggleIcons" + index).style.display = "block" : "";
    this.openedPanelStatus["isExpanded" + index] = true;
    this.toggleCloseOrSelectedButton(index);
    this.disableUnselectedAccordians(index);
  }

  closeGroup = (event: Event, index: number) => {
    if (this.catalogAdded)
      return;
    (document.getElementById("descriptionDiv" + index)) ? document.getElementById("descriptionDiv" + index).style.display = "block" : "";
    (document.getElementById("footerDiv" + index)) ? document.getElementById("footerDiv" + index).style.display = "block" : "";
    (document.getElementById("toggleIcons" + index)) ? document.getElementById("toggleIcons" + index).style.display = "none" : "";
    this.openedPanelStatus["isExpanded" + index] = false;
    if (this.catalogAdded) {
      this.disableUnselectedAccordians(index);
    } else {
      this.enableAllAccordians();
    }
  }

  mappingKeyValueOfSelectedCatalog(formControlsArray: any, selectedCatalog: any) {
    let requestData = {};
    let counter: number = 0;
    if (formControlsArray.length === selectedCatalog.length) {
      for (let index = 0; index < formControlsArray.length; index++) {
        if (selectedCatalog[index].paramName) {
          requestData[selectedCatalog[index].paramName] = formControlsArray[index].value;
          this.displayData[selectedCatalog[index].name] = formControlsArray[index].value;
          if (selectedCatalog[index].type === FormType.DROPDOWN) {
            selectedCatalog[index].catalogParamListTOs.forEach((obj) => {
              if ((obj.key) === formControlsArray[index].value) {
                this.mergedDropdownData[counter] = { [formControlsArray[index].value]: obj.value };
                counter++;
              }
            });
          }
          if (selectedCatalog[index].imageURL) {
            this.mergedDropdownData["imageURL"] = selectedCatalog[index].imageURL;
          }
        }
      }
      return requestData;
    }
  }

  enableAllAccordians() {
    if (this.matAccordians && this.matAccordians.nativeElement) {
      let childrens = this.matAccordians.nativeElement.children;
      for (let index = 0; index < childrens.length; index++) {
        const element = childrens[index];
        element.disabled = false;
        element.className = "";
      }
    }
  }
  disableUnselectedAccordians(index_) {
    if (this.matAccordians && this.matAccordians.nativeElement) {
      let childrens = this.matAccordians.nativeElement.children;
      for (let index = 0; index < childrens.length; index++) {
        const element = childrens[index];
        if (index_ == index) {
          element.disabled = false;
          element.className = "";
        } else {
          element.disabled = true;
          element.className = "disable-accordian";
        }
      }
    }
  }

  toggleAddButton = (event: any, index: number) => {
    // let data_: any = this.catalogForm.get('fields') as FormArray;
    const currentCatalog: any = (this.catalogForm.get('fields') as FormArray).controls[index];
    this.secondStepperRequestData = this.mappingKeyValueOfSelectedCatalog(currentCatalog.controls, this.fieldType[index]);
    this.userParameterDetails = { ...this.displayData };
    this.secondStepperRequestData = { ...this.secondStepperRequestData, ...this.hiddenFormData };



    let isValidationSuccessful: boolean = !currentCatalog.invalid;
    this.secondStepperValidation = isValidationSuccessful;
    this.currentCatalogIndex = index;
    if (event && event.target) {
      let catalogAddButton: HTMLElement = document.getElementById(event.target.id);
      if (catalogAddButton) {
        if (event.target.className === "stepper-button") {
          currentCatalog.controls.forEach((field) => { field.touched = true });
          if (currentCatalog.invalid) {
            return;
          }
          if (isValidationSuccessful) {
            catalogAddButton.className = "stepper-button-error";
            //catalogAddButton.innerHTML = "Remove";
            this.htmlStr = "Remove"
            this.openedPanelStatus["closeIcon" + index] = false;
            this.catalogAdded = true;
            this.catalogsubmit.nativeElement.focus();
          }
        } else {
          catalogAddButton.className = "stepper-button";
          //catalogAddButton.innerHTML = "Add";
          this.htmlStr = "Add";
          this.catalogAdded = false;
          this.openedPanelStatus["closeIcon" + index] = true;
          currentCatalog.reset();
          this.userParameterDetails = {}
          currentCatalog.controls.forEach((field) => { field.touched = false });
          //this.stepperTwoForm.reset();
        }
      }
      this.toggleCloseOrSelectedButton(index);
    }

  }

  toggleCloseOrSelectedButton = (index: number) => {
    if (typeof (this.openedPanelStatus["closeIcon" + index]) === "undefined") {
      this.openedPanelStatus["closeIcon" + index] = true;
      this.openedPanelStatus["selectedIcon" + index] = false;
    }
    let closeIconStatus: boolean = this.openedPanelStatus["closeIcon" + index];
    let closeIconElement: HTMLElement = document.getElementById("closeIcon" + index);
    closeIconElement.style.display = "block";
    let selectedIconElement: HTMLElement = document.getElementById("selectedIcon" + index);
    this.setCloseIconStatus(closeIconStatus, closeIconElement, selectedIconElement, index);
  }

  setCloseIconStatus = (closeIconStatus: boolean, closeIconElement: HTMLElement, selectedIconElement: HTMLElement, index: number): void => {
    if (closeIconStatus) {
      closeIconElement.style.display = "block";
      selectedIconElement.style.display = "none";
      this.openedPanelStatus["closeIcon" + index] = true;
    } else {
      this.openedPanelStatus["selectedIcon" + index] = true;
      closeIconElement.style.display = "none";
      selectedIconElement.style.display = "block";
    }
  }

  redirectToDashboard(res: any) {
    this._toastrService.showSuccess("REQUEST_NO:" + ` ${res.result.AthenaRequestId} : ${res.result.message}`);
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 200);
  }

  setFocusOnFinalSubmit() {
    setTimeout(() => {
      if (this.finalSubmit && this.finalSubmit.nativeElement)
        this.finalSubmit.nativeElement.focus();
    }, 200);
  }
}

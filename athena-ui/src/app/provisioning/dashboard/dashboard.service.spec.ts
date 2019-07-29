import { DashboardService } from './dashboard.service'
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerService, HttpService } from '@core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { UtilityService, EnvironmentConfig } from 'core-module/infrastructure/index';
import { NGXLogger, CustomNGXLoggerService, } from 'ngx-logger';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AuthService } from '@core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from '../../components/service/loader.service';
import { CloudDataService } from '../../services/cloud-data.service';
import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GraphComponent } from './graph/graph.component';
import { TableModule } from 'primeng/table';
import { CardComponent } from './card/card.component';
import { SearchPipe } from '../../filter/search.pipe';
import { ChartsModule } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
} from '@angular/material';

describe('DashboardService', () => {
    let cloudDataService;
    let service: DashboardService;
    let httpTestingController: HttpTestingController;
    cloudDataService = new CloudDataService(),
        cloudDataService = {
            getCloudData: jasmine.createSpy('getCloudData').and.returnValue('')
        },
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [DashboardComponent, GraphComponent, CardComponent, SearchPipe],
                imports: [HttpClientModule, MatIconModule, MatInputModule,
                    ReactiveFormsModule, FormsModule, TableModule, MatCardModule,
                    MatButtonModule, HttpClientTestingModule, BrowserModule, TranslateModule,
                    ChartsModule, RouterTestingModule, HttpModule,
                    LoggerModule.forRoot(
                        {
                            serverLoggingUrl: '/api/logs',
                            level: NgxLoggerLevel.DEBUG,
                            serverLogLevel: NgxLoggerLevel.ERROR
                        }),
                ],
                providers: [DashboardService, HttpService, LoggerService, HttpClient, { provide: CloudDataService, useValue: cloudDataService }, LoaderService, EnvironmentConfig, UtilityService, CustomNGXLoggerService,
                    { provide: NGXLogger, useClass: class { } }, AuthService, MessageService, TranslateService]
            });
            service = TestBed.get(DashboardService);
            httpTestingController = TestBed.get(HttpTestingController);

            let store = {

                "header": {

                    "authKey": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6MSwicGFzc3dvcmQiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIkdvdmVyYW5jZSIsIkJpbGxpbmciLCJVc2VyIG1hbmFnZW1lbnQiLCJQcm92aXNpb25pbmciLCJNb25pdG9yaW5nIiwiQXRoZW5hIEFkbWluIl0sImlhdCI6MTU1OTc0Mjc5MSwiZXhwIjoxNTU5ODI5MTkxfQ.VbBVT0hlCX3dWzZOsKnOVK9CZ57tBZ2tP298fKeMVyk",

                    "numberOfRecords": 0,

                    "errorFlag": false

                },

                "data": {

                    "id": 1,
                    "loginUserName": null,
                    "firstName": "Athena",
                    "lastName": "Admin",
                    "loginUserpassword": null,
                    "userStatus": null,
                    "email": "admin@athena.com",
                    "phone": null,
                    "active": null,
                    "createdBy": null,
                    "createdOn": null,
                    "updatedBy": null,
                    "updatedOn": null,
                    "userHomePage": "Requests page",
                    "projects": []
                }
            }
            sessionStorage.setItem('userDetails', JSON.stringify(store));
        });

    it('should be created', inject([DashboardService], (service: DashboardService) => {
        expect(service).toBeTruthy();
    }));

    it(`should execute getRequestGrid request on dashboard`, inject([DashboardService],
        (service: DashboardService) => {
            const mockResponse = {
                "header": {
                    "authKey": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6MSwicGFzc3dvcmQiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIkdvdmVyYW5jZSIsIkJpbGxpbmciLCJVc2VyIG1hbmFnZW1lbnQiLCJQcm92aXNpb25pbmciLCJNb25pdG9yaW5nIiwiQXRoZW5hIEFkbWluIl0sImlhdCI6MTU1OTc0MTAzNCwiZXhwIjoxNTU5ODI3NDM0fQ.jODMa-Jtp5_NtS-WhkVyztTzzKPuaOyqi3vpR4iswdk",
                    "serviceRequest": "getDepartment",
                    "dataSource": "Testing",
                    "numberOfRecords": 1,
                    "tenantId": "Expanxion",
                    "errorFlag": false
                },
                "data": {
                    "requestTOs": [{
                        "id": 79,
                        "name": "test 5",
                        "createdBy": "admin",
                        "createdOn": 1559740749000,
                        "updatedBy": "admin",
                        "updatedOn": 1559740749000,
                        "statusTO": {
                            "id": 5,
                            "name": "Provisioning Inprogress",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 72,
                            "approverComments": ""
                        }
                    }, {
                        "id": 78,
                        "name": "test 4",
                        "createdBy": "admin",
                        "createdOn": 1559740272000,
                        "updatedBy": "admin",
                        "updatedOn": 1559740272000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 71,
                            "approverComments": null
                        }
                    }, {
                        "id": 77,
                        "name": "Test 3",
                        "createdBy": "admin",
                        "createdOn": 1559738336000,
                        "updatedBy": "admin",
                        "updatedOn": 1559738336000,
                        "statusTO": {
                            "id": 8,
                            "name": "Provisioning Failed",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 70,
                            "approverComments": ""
                        }
                    }, {
                        "id": 76,
                        "name": "Test 2",
                        "createdBy": "admin",
                        "createdOn": 1559738155000,
                        "updatedBy": "admin",
                        "updatedOn": 1559738155000,
                        "statusTO": {
                            "id": 8,
                            "name": "Provisioning Failed",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 69,
                            "approverComments": ""
                        }
                    }, {
                        "id": 75,
                        "name": "Test",
                        "createdBy": "admin",
                        "createdOn": 1559724835000,
                        "updatedBy": "admin",
                        "updatedOn": 1559724835000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 68,
                            "approverComments": ""
                        }
                    }, {
                        "id": 74,
                        "name": "WebApp",
                        "createdBy": "admin",
                        "createdOn": 1559651770000,
                        "updatedBy": "admin",
                        "updatedOn": 1559651770000,
                        "statusTO": {
                            "id": 3,
                            "name": "Rejected",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 67,
                            "approverComments": "Rejected"
                        }
                    }, {
                        "id": 73,
                        "name": "AZureRequest",
                        "createdBy": "admin",
                        "createdOn": 1559651541000,
                        "updatedBy": "admin",
                        "updatedOn": 1559651541000,
                        "statusTO": {
                            "id": 5,
                            "name": "Provisioning Inprogress",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 66,
                            "approverComments": "Approved"
                        }
                    }, {
                        "id": 72,
                        "name": "AWSRequest2",
                        "createdBy": "admin",
                        "createdOn": 1559651329000,
                        "updatedBy": "admin",
                        "updatedOn": 1559651329000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 65,
                            "approverComments": "Request is Approved"
                        }
                    }, {
                        "id": 71,
                        "name": "test",
                        "createdBy": "admin",
                        "createdOn": 1559631745000,
                        "updatedBy": "admin",
                        "updatedOn": 1559631745000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 64,
                            "approverComments": null
                        }
                    }, {
                        "id": 70,
                        "name": "Athena request",
                        "createdBy": "admin",
                        "createdOn": 1559629673000,
                        "updatedBy": "admin",
                        "updatedOn": 1559629673000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 63,
                            "approverComments": ""
                        }
                    }, {
                        "id": 69,
                        "name": "ayehu test",
                        "createdBy": "admin",
                        "createdOn": 1559574116000,
                        "updatedBy": "admin",
                        "updatedOn": 1559574116000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 62,
                            "approverComments": ""
                        }
                    }, {
                        "id": 68,
                        "name": "Provision",
                        "createdBy": "admin",
                        "createdOn": 1559570446000,
                        "updatedBy": "admin",
                        "updatedOn": 1559570446000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 61,
                            "approverComments": null
                        }
                    }, {
                        "id": 67,
                        "name": "Demo request",
                        "createdBy": "admin",
                        "createdOn": 1559295828000,
                        "updatedBy": "admin",
                        "updatedOn": 1559295828000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 60,
                            "approverComments": "Approved"
                        }
                    }, {
                        "id": 66,
                        "name": "Manish-Request 31 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559294429000,
                        "updatedBy": "admin",
                        "updatedOn": 1559294429000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 59,
                            "approverComments": null
                        }
                    }, {
                        "id": 65,
                        "name": "Manish-Request 31 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559294364000,
                        "updatedBy": "admin",
                        "updatedOn": 1559294364000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 58,
                            "approverComments": null
                        }
                    }, {
                        "id": 64,
                        "name": "dsvsd",
                        "createdBy": "admin",
                        "createdOn": 1559283293000,
                        "updatedBy": "admin",
                        "updatedOn": 1559283293000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 57,
                            "approverComments": null
                        }
                    }, {
                        "id": 63,
                        "name": "Admin",
                        "createdBy": "admin",
                        "createdOn": 1559279336000,
                        "updatedBy": "admin",
                        "updatedOn": 1559279336000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 56,
                            "approverComments": null
                        }
                    }, {
                        "id": 62,
                        "name": "thhty",
                        "createdBy": "admin",
                        "createdOn": 1559217640000,
                        "updatedBy": "admin",
                        "updatedOn": 1559217640000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 55,
                            "approverComments": null
                        }
                    }, {
                        "id": 61,
                        "name": "dfva",
                        "createdBy": "admin",
                        "createdOn": 1559217592000,
                        "updatedBy": "admin",
                        "updatedOn": 1559217592000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 54,
                            "approverComments": null
                        }
                    }, {
                        "id": 60,
                        "name": "fdv",
                        "createdBy": "admin",
                        "createdOn": 1559217552000,
                        "updatedBy": "admin",
                        "updatedOn": 1559217552000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 53,
                            "approverComments": null
                        }
                    }, {
                        "id": 59,
                        "name": "sddd",
                        "createdBy": "admin",
                        "createdOn": 1559217518000,
                        "updatedBy": "admin",
                        "updatedOn": 1559217518000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 52,
                            "approverComments": null
                        }
                    }, {
                        "id": 58,
                        "name": "abc",
                        "createdBy": "admin",
                        "createdOn": 1559217480000,
                        "updatedBy": "admin",
                        "updatedOn": 1559217480000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 51,
                            "approverComments": null
                        }
                    }, {
                        "id": 57,
                        "name": "rgerg",
                        "createdBy": "admin",
                        "createdOn": 1559217397000,
                        "updatedBy": "admin",
                        "updatedOn": 1559217397000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 50,
                            "approverComments": null
                        }
                    }, {
                        "id": 55,
                        "name": "request24",
                        "createdBy": "admin",
                        "createdOn": 1559216517000,
                        "updatedBy": "admin",
                        "updatedOn": 1559216517000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 49,
                            "approverComments": null
                        }
                    }, {
                        "id": 54,
                        "name": "Request 02",
                        "createdBy": "admin",
                        "createdOn": 1559216491000,
                        "updatedBy": "admin",
                        "updatedOn": 1559216491000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 48,
                            "approverComments": null
                        }
                    }, {
                        "id": 53,
                        "name": "request23",
                        "createdBy": "admin",
                        "createdOn": 1559216469000,
                        "updatedBy": "admin",
                        "updatedOn": 1559216469000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 47,
                            "approverComments": null
                        }
                    }, {
                        "id": 52,
                        "name": "request12",
                        "createdBy": "admin",
                        "createdOn": 1559216420000,
                        "updatedBy": "admin",
                        "updatedOn": 1559216420000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 46,
                            "approverComments": null
                        }
                    }, {
                        "id": 51,
                        "name": "Request 01",
                        "createdBy": "admin",
                        "createdOn": 1559216416000,
                        "updatedBy": "admin",
                        "updatedOn": 1559216416000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 45,
                            "approverComments": null
                        }
                    }, {
                        "id": 50,
                        "name": "test",
                        "createdBy": "admin",
                        "createdOn": 1559216352000,
                        "updatedBy": "admin",
                        "updatedOn": 1559216352000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 44,
                            "approverComments": null
                        }
                    }, {
                        "id": 49,
                        "name": "sdfsf",
                        "createdBy": "admin",
                        "createdOn": 1559214445000,
                        "updatedBy": "admin",
                        "updatedOn": 1559214445000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 43,
                            "approverComments": null
                        }
                    }, {
                        "id": 48,
                        "name": "TestRequest0006",
                        "createdBy": "admin",
                        "createdOn": 1559211924000,
                        "updatedBy": "admin",
                        "updatedOn": 1559211924000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 42,
                            "approverComments": ""
                        }
                    }, {
                        "id": 47,
                        "name": "Request 30",
                        "createdBy": "admin",
                        "createdOn": 1559211245000,
                        "updatedBy": "admin",
                        "updatedOn": 1559211245000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 41,
                            "approverComments": null
                        }
                    }, {
                        "id": 46,
                        "name": "test",
                        "createdBy": "admin",
                        "createdOn": 1559211193000,
                        "updatedBy": "admin",
                        "updatedOn": 1559211193000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 40,
                            "approverComments": null
                        }
                    }, {
                        "id": 45,
                        "name": "test",
                        "createdBy": "admin",
                        "createdOn": 1559211147000,
                        "updatedBy": "admin",
                        "updatedOn": 1559211147000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 39,
                            "approverComments": null
                        }
                    }, {
                        "id": 44,
                        "name": "test",
                        "createdBy": "admin",
                        "createdOn": 1559208385000,
                        "updatedBy": "admin",
                        "updatedOn": 1559208385000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 38,
                            "approverComments": null
                        }
                    }, {
                        "id": 43,
                        "name": "sdfsf",
                        "createdBy": "admin",
                        "createdOn": 1559208176000,
                        "updatedBy": "admin",
                        "updatedOn": 1559208176000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 37,
                            "approverComments": null
                        }
                    }, {
                        "id": 42,
                        "name": "test 30",
                        "createdBy": "admin",
                        "createdOn": 1559208026000,
                        "updatedBy": "admin",
                        "updatedOn": 1559208026000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 36,
                            "approverComments": null
                        }
                    }, {
                        "id": 41,
                        "name": "fdsfs",
                        "createdBy": "admin",
                        "createdOn": 1559207984000,
                        "updatedBy": "admin",
                        "updatedOn": 1559207984000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 35,
                            "approverComments": null
                        }
                    }, {
                        "id": 40,
                        "name": "test",
                        "createdBy": "admin",
                        "createdOn": 1559205963000,
                        "updatedBy": "admin",
                        "updatedOn": 1559205963000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 34,
                            "approverComments": null
                        }
                    }, {
                        "id": 39,
                        "name": "test",
                        "createdBy": "admin",
                        "createdOn": 1559205834000,
                        "updatedBy": "admin",
                        "updatedOn": 1559205834000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 33,
                            "approverComments": null
                        }
                    }, {
                        "id": 38,
                        "name": "test",
                        "createdBy": "admin",
                        "createdOn": 1559205496000,
                        "updatedBy": "admin",
                        "updatedOn": 1559205496000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 32,
                            "approverComments": null
                        }
                    }, {
                        "id": 37,
                        "name": "test1",
                        "createdBy": "admin",
                        "createdOn": 1559205074000,
                        "updatedBy": "admin",
                        "updatedOn": 1559205074000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 31,
                            "approverComments": null
                        }
                    }, {
                        "id": 36,
                        "name": "Azure Request",
                        "createdBy": "admin",
                        "createdOn": 1559203181000,
                        "updatedBy": "admin",
                        "updatedOn": 1559203181000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 30,
                            "approverComments": ""
                        }
                    }, {
                        "id": 35,
                        "name": "TestingAzureReq",
                        "createdBy": "admin",
                        "createdOn": 1559200738000,
                        "updatedBy": "admin",
                        "updatedOn": 1559200738000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 29,
                            "approverComments": ""
                        }
                    }, {
                        "id": 34,
                        "name": "TestRequest0005",
                        "createdBy": "admin",
                        "createdOn": 1559199026000,
                        "updatedBy": "admin",
                        "updatedOn": 1559199026000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 28,
                            "approverComments": ""
                        }
                    }, {
                        "id": 33,
                        "name": "TestingAzure",
                        "createdBy": "admin",
                        "createdOn": 1559195516000,
                        "updatedBy": "admin",
                        "updatedOn": 1559195516000,
                        "statusTO": {
                            "id": 5,
                            "name": "Provisioning Inprogress",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 27,
                            "approverComments": ""
                        }
                    }, {
                        "id": 32,
                        "name": "TestRequest0004",
                        "createdBy": "admin",
                        "createdOn": 1559195280000,
                        "updatedBy": "admin",
                        "updatedOn": 1559195280000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 26,
                            "approverComments": ""
                        }
                    }, {
                        "id": 31,
                        "name": "TestingReq",
                        "createdBy": "admin",
                        "createdOn": 1559194530000,
                        "updatedBy": "admin",
                        "updatedOn": 1559194530000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 25,
                            "approverComments": ""
                        }
                    }, {
                        "id": 30,
                        "name": "test",
                        "createdBy": "admin",
                        "createdOn": 1559140620000,
                        "updatedBy": "admin",
                        "updatedOn": 1559140620000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 24,
                            "approverComments": null
                        }
                    }, {
                        "id": 29,
                        "name": "test",
                        "createdBy": "admin",
                        "createdOn": 1559140397000,
                        "updatedBy": "admin",
                        "updatedOn": 1559140397000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 23,
                            "approverComments": null
                        }
                    }, {
                        "id": 28,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134747000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134747000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 22,
                            "approverComments": null
                        }
                    }, {
                        "id": 27,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134746000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134746000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 21,
                            "approverComments": null
                        }
                    }, {
                        "id": 26,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134745000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134745000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 20,
                            "approverComments": null
                        }
                    }, {
                        "id": 25,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134745000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134745000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 19,
                            "approverComments": null
                        }
                    }, {
                        "id": 24,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134744000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134744000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 18,
                            "approverComments": null
                        }
                    }, {
                        "id": 23,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134445000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134445000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 17,
                            "approverComments": null
                        }
                    }, {
                        "id": 22,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134444000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134444000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 16,
                            "approverComments": null
                        }
                    }, {
                        "id": 20,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134443000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134443000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 15,
                            "approverComments": null
                        }
                    }, {
                        "id": 19,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134443000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134443000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 12,
                            "approverComments": null
                        }
                    }, {
                        "id": 21,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134443000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134443000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 14,
                            "approverComments": null
                        }
                    }, {
                        "id": 18,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134443000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134443000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 11,
                            "approverComments": null
                        }
                    }, {
                        "id": 17,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134442000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134442000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 13,
                            "approverComments": null
                        }
                    }, {
                        "id": 16,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134347000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134347000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 10,
                            "approverComments": null
                        }
                    }, {
                        "id": 15,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134343000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134343000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 9,
                            "approverComments": null
                        }
                    }, {
                        "id": 13,
                        "name": "Manish-Request 29 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559134263000,
                        "updatedBy": "admin",
                        "updatedOn": 1559134263000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 8,
                            "approverComments": null
                        }
                    }, {
                        "id": 12,
                        "name": "Manish-Request 22 May 2019",
                        "createdBy": "admin",
                        "createdOn": 1559123652000,
                        "updatedBy": "admin",
                        "updatedOn": 1559123652000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 7,
                            "approverComments": null
                        }
                    }, {
                        "id": 11,
                        "name": "TestRequest0003",
                        "createdBy": "admin",
                        "createdOn": 1559113887000,
                        "updatedBy": "admin",
                        "updatedOn": 1559113887000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 6,
                            "approverComments": ""
                        }
                    }, {
                        "id": 10,
                        "name": "TestRequest0002",
                        "createdBy": "admin",
                        "createdOn": 1559111781000,
                        "updatedBy": "admin",
                        "updatedOn": 1559111781000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 5,
                            "approverComments": ""
                        }
                    }, {
                        "id": 9,
                        "name": "TestReuest0001",
                        "createdBy": "admin",
                        "createdOn": 1559111412000,
                        "updatedBy": "admin",
                        "updatedOn": 1559111412000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 4,
                            "approverComments": ""
                        }
                    }, {
                        "id": 8,
                        "name": "Provision1",
                        "createdBy": "admin",
                        "createdOn": 1559056145000,
                        "updatedBy": "admin",
                        "updatedOn": 1559056145000,
                        "statusTO": {
                            "id": 1,
                            "name": "Pending",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 3,
                            "approverComments": null
                        }
                    }, {
                        "id": 6,
                        "name": "Test1011",
                        "createdBy": "admin",
                        "createdOn": 1559056041000,
                        "updatedBy": "admin",
                        "updatedOn": 1559056041000,
                        "statusTO": {
                            "id": 7,
                            "name": "Provisioning Successful",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 2,
                            "approverComments": ""
                        }
                    }, {
                        "id": 2,
                        "name": "Test101",
                        "createdBy": "admin",
                        "createdOn": 1559055908000,
                        "updatedBy": "admin",
                        "updatedOn": 1559055908000,
                        "statusTO": {
                            "id": 5,
                            "name": "Provisioning Inprogress",
                            "active": null
                        },
                        "itsmRequestTO": {
                            "id": 1,
                            "approverComments": ""
                        }
                    }]
                }
            };

            service.getRequestGrid().subscribe(data => {
                expect(data).toEqual(mockResponse);
            });

        })
    );

    it(`should execute processRequest request on dashboard`,
        inject([DashboardService],
            (service: DashboardService) => {
                const id = 77;
                const mockResponse = null;

                service.processRequest(id).subscribe(data => {
                    expect(data).toEqual(mockResponse);
                });

            })
    );

    it(`should execute getDashboardCardData request on dashboard`,
        inject([DashboardService],
            (service: DashboardService) => {
                const mockResponse = {
                    "header": {
                        "authKey": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6MSwicGFzc3dvcmQiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIkdvdmVyYW5jZSIsIkJpbGxpbmciLCJVc2VyIG1hbmFnZW1lbnQiLCJQcm92aXNpb25pbmciLCJNb25pdG9yaW5nIiwiQXRoZW5hIEFkbWluIl0sImlhdCI6MTU1OTc0MTAzNCwiZXhwIjoxNTU5ODI3NDM0fQ.jODMa-Jtp5_NtS-WhkVyztTzzKPuaOyqi3vpR4iswdk",
                        "serviceRequest": "getDepartment",
                        "dataSource": "Testing",
                        "numberOfRecords": 1,
                        "tenantId": "Expanxion",
                        "errorFlag": false
                    },
                    "data": [{
                        "projectId": 1,
                        "projectName": "WK_Project1",
                        "cloudId": 1,
                        "cloudName": "AWS",
                        "cloudImageURL": "/assets/Images/AWS-white.png",
                        "environmentDetails": {
                            "QA": 9,
                            "PROD": 3
                        }
                    }, {
                        "projectId": 2,
                        "projectName": "WK_Project2",
                        "cloudId": 2,
                        "cloudName": "AZURE",
                        "cloudImageURL": "/assets/Images/Azure-white.png",
                        "environmentDetails": {
                            "PROD": 1,
                            "DEV": 3
                        }
                    }]
                };

                service.getDashboardCardData().subscribe(data => {
                    expect(data).toEqual(mockResponse);
                });

            })
    );
});
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActionRequestService } from './ActionRequest.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-ActionRequest',
	templateUrl: './ActionRequest.component.html',
	styleUrls: ['./ActionRequest.component.css'],
  providers: [ActionRequestService]
})
export class ActionRequestComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          requestId = new FormControl("", Validators.required);
        
  
      
          requestValue = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  
      
          assignedValidators = new FormControl("", Validators.required);
        
  
      
          approvedValidators = new FormControl("", Validators.required);
        
  
      
          treasuryValidator = new FormControl("", Validators.required);
        
  


  constructor(private serviceActionRequest:ActionRequestService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          requestId:this.requestId,
        
    
        
          requestValue:this.requestValue,
        
    
        
          owner:this.owner,
        
    
        
          assignedValidators:this.assignedValidators,
        
    
        
          approvedValidators:this.approvedValidators,
        
    
        
          treasuryValidator:this.treasuryValidator
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceActionRequest.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.usgov.grantblock.ActionRequest",
      
        
          "requestId":this.requestId.value,
        
      
        
          "requestValue":this.requestValue.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "assignedValidators":this.assignedValidators.value,
        
      
        
          "approvedValidators":this.approvedValidators.value,
        
      
        
          "treasuryValidator":this.treasuryValidator.value
        
      
    };

    this.myForm.setValue({
      
        
          "requestId":null,
        
      
        
          "requestValue":null,
        
      
        
          "owner":null,
        
      
        
          "assignedValidators":null,
        
      
        
          "approvedValidators":null,
        
      
        
          "treasuryValidator":null
        
      
    });

    return this.serviceActionRequest.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "requestId":null,
        
      
        
          "requestValue":null,
        
      
        
          "owner":null,
        
      
        
          "assignedValidators":null,
        
      
        
          "approvedValidators":null,
        
      
        
          "treasuryValidator":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.usgov.grantblock.ActionRequest",
      
        
          
        
    
        
          
            "requestValue":this.requestValue.value,
          
        
    
        
          
            "owner":this.owner.value,
          
        
    
        
          
            "assignedValidators":this.assignedValidators.value,
          
        
    
        
          
            "approvedValidators":this.approvedValidators.value,
          
        
    
        
          
            "treasuryValidator":this.treasuryValidator.value
          
        
    
    };

    return this.serviceActionRequest.updateAsset(form.get("requestId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceActionRequest.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceActionRequest.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "requestId":null,
          
        
          
            "requestValue":null,
          
        
          
            "owner":null,
          
        
          
            "assignedValidators":null,
          
        
          
            "approvedValidators":null,
          
        
          
            "treasuryValidator":null 
          
        
      };



      
        if(result.requestId){
          
            formObject.requestId = result.requestId;
          
        }else{
          formObject.requestId = null;
        }
      
        if(result.requestValue){
          
            formObject.requestValue = result.requestValue;
          
        }else{
          formObject.requestValue = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      
        if(result.assignedValidators){
          
            formObject.assignedValidators = result.assignedValidators;
          
        }else{
          formObject.assignedValidators = null;
        }
      
        if(result.approvedValidators){
          
            formObject.approvedValidators = result.approvedValidators;
          
        }else{
          formObject.approvedValidators = null;
        }
      
        if(result.treasuryValidator){
          
            formObject.treasuryValidator = result.treasuryValidator;
          
        }else{
          formObject.treasuryValidator = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "requestId":null,
        
      
        
          "requestValue":null,
        
      
        
          "owner":null,
        
      
        
          "assignedValidators":null,
        
      
        
          "approvedValidators":null,
        
      
        
          "treasuryValidator":null 
        
      
      });
  }

}

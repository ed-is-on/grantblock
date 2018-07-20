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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Set Up Demo Transaction -- FOR ADMINISTRATORS AND DEMO PURPOSES ONLY -- populates the demo with participants and assets
 * @param {com.usgov.grantblock.SetUpDemo} setupParams
 * @transaction
 */
async function setUpDemo(setupParams){
    const balance = setupParams.grantBalance;
    const factory = getFactory();
    const NS = 'com.usgov.grantblock';

    const grantees = [
        factory.newResource(NS, 'Grantee', 'g0'),
        factory.newResource(NS, 'Grantee', 'g1'),
        factory.newResource(NS, 'Grantee', 'g2'),
        factory.newResource(NS, 'Grantee', 'g3'),
        factory.newResource(NS, 'Grantee', 'g4'),
        factory.newResource(NS, 'Grantee', 'g5'),
        factory.newResource(NS, 'Grantee', 'g6'),
        factory.newResource(NS, 'Grantee', 'g7')
    ]

    grantees.forEach(function(grantee) {
        grantee.granteeId = grantee.getIdentifier();
        //this next line is where the grantee's balance is initialized.  If you want to initialize them at zero for obligation, use the line which is commented out
        grantee.grantBalance = balance;
        //grantee.grantBalance = 0;
        grantee.pocName = 'Greg Grantee';
        grantee.pocEmail = 'ggrant@college.edu';
        //console.log(grantee.granteeId + ' has been created.');
    });
    //console.log(grantees);
    
    const granteeRegistry = await getParticipantRegistry(NS + '.Grantee');
    await granteeRegistry.addAll(grantees);

    const eduser = factory.newResource(NS, 'Education', 'ed');
    eduser.userId = eduser.getIdentifier();
    eduser.pocName = 'Emma Education';
    eduser.pocEmail = 'eedu@ed.gov';
    const educationRegistry = await getParticipantRegistry(NS + '.Education');
    await educationRegistry.addAll([eduser]);

    const treasury = factory.newResource(NS, 'Treasury', 'treasury');
    treasury.userId = treasury.getIdentifier();
    treasury.pocName = 'Tommy Treasury';
    treasury.pocEmail = 'ttreas@treasury.gov';
    const treasuryRegistry = await getParticipantRegistry(NS + '.Treasury');
    await treasuryRegistry.addAll([treasury]);

}


/**
 * Create Grantee - this will generate a new grantee's profile 
 * @param {com.usgov.grantblock.CreateGrantee} granteeParams
 *  @transaction
 */
async function createGrantee(granteeParams){
    const factory = getFactory();
    const NS = 'com.usgov.grantblock';

    var params = granteeParams;

    const grantee = factory.newResource(NS, 'Grantee', params.granteeId);
    grantee.granteeId = grantee.getIdentifier();
    grantee.grantBalance = 0;
    grantee.pocName = params.pocName;
    grantee.pocEmail = params.pocEmail;
    const granteeRegistry = await getParticipantRegistry(NS + '.Grantee');
    await granteeRegistry.addAll([grantee]);

 }

 /**
  * Create Education -- this will generate a new Department of Education user
  * @param {com.usgov.grantblock.CreateEdUser} edParams
  * @transaction
  */
 async function createEd(edParams){
    const factory = getFactory();
    const NS = 'com.usgov.grantblock';

    var params = edParams;

    const education = factory.newResource(NS, 'Education', params.userId);
    education.userId = education.getIdentifier();
    education.pocName = params.pocName;
    education.pocEmail = params.pocEmail;
    const educationRegistry = await getParticipantRegistry(NS + '.Education');
    await educationRegistry.addAll([education]);
 }

 /**
  * Create Action Request -- this one is a little trickier b/c some of the randomness and rules involved.
  * @param {com.usgov.grantblock.CreateActionRequest} arParams
  * @transaction
  */
 async function createActionRequest(arParams){
    const factory = getFactory();
    const NS = 'com.usgov.grantblock';
    
    var params =arParams;

    const arRegistry = await getAssetRegistry(NS + '.ActionRequest');
    
    var creationDate = new Date();
    creationDate = creationDate.toString();

    // This code should put the date in the correct format
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var hr = today.getHours();
    if(hr<10){
        hr='0'+hr;
    }
    var min = today.getMinutes();
    if(min<10){
        min='0'+min;
    }
    var sec = today.getSeconds();
    if(sec<10){
        sec='0'+sec;
    }
    var today = yyyy+mm+dd+hr+min+sec;
    creationDate = today.toString();

    var requestorId = arParams.requestor.getIdentifier();
    requestorId = requestorId.toString();

    const actionReq = factory.newResource(NS, 'ActionRequest', (requestorId + "AR" + creationDate));

    actionReq.requestId = actionReq.getIdentifier();
    actionReq.requestValue = params.requestValue;    

    actionReq.assignedValidators = [];
    //actionReq.assignedValidators.push(params.requestor);
    actionReq.approvedValidators = [];
    //actionReq.approvedValidators.push(params.requestor);

    //actionReq.owner = factory.newRelationship(NS, 'Grantee', params.requestor.getIdentifier());
    actionReq.treasuryValidator = false;
    
    actionReq.owner = factory.newRelationship(NS, 'Grantee', params.requestor);
    await arRegistry.add(actionReq);
 }

/**
 * Populate Action Request Approvers - this call will randomly select two participants from the grantee list and add them to the assigned validators field
 * @param {com.usgov.grantblock.AddValidatingGrantees} validatorParams
 * @transaction
 */

 async function addValidatingGrantees(validatorParams){
    //const factory = getFactory();
    const NS = 'com.usgov.grantblock';

    var numValidators = validatorParams.validators;
    var ar = validatorParams.request.getIdentifier();
    ar = ar.toString();
    //get the grantee and Action Request registry
    const arRegistry = await getAssetRegistry(NS + ".ActionRequest");
    var currentReq = await arRegistry.get(ar);

    //create an array and move all grantees to it
    const gRegistry = await getParticipantRegistry(NS + '.Grantee');
    var granteeArray = await gRegistry.getAll();
    var numGrantees = granteeArray.map(function(grantee){
        return grantee['granteeId'];
    });

    var countGrantees = numGrantees.length;
    //currentReq.assignedValidators.push(granteeArray);
    var validatorCount = numValidators;

    while(validatorCount>0){
        var validNum = Math.floor(Math.random()*countGrantees);
        var granteeidentifier = numGrantees[validNum];
        if(granteeidentifier != currentReq.getIdentifier()){
            var pushReq = await gRegistry.get(granteeidentifier);
            if(!currentReq.assignedValidators.includes(pushReq)){
                currentReq.assignedValidators.push(pushReq);
                validatorCount=validatorCount-1;
            }
        }
    }

    await arRegistry.update(currentReq);
 }
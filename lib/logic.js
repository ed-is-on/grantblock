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
 * Load Scenario Transaction -- FOR ADMIN PURPOSES ONLY - populates the demo with a given set of JSON that includes participants and action requests in different states
 * @param {com.usgov.grantblock.LoadScenario} loadParams
 * @transaction
 */
async function loadScenario(loadParams){

//     o Grantee[] gList
//   o Education[] eList
//   o Treasury[] tList
//   o ActionRequest[] arList
    
    const params = loadParams;
    const factory = getFactory();
    const NS = 'com.usgov.grantblock';
    //let config = require('config');
    // const grantees = config.get("demo_grantees");
    granteeList = params.gList;
    educationList = params.eList;
    treasuryList = params.tList;
    actionReqList = params.arList;

    grantees = [];
    granteeList.forEach(function(element){
        console.log(element);
        var g = factory.newResource(NS, 'Grantee', element.granteeId);
        g.granteeId = g.getIdentifier();
        g.grantBalance = element.grantBalance;
        g.pocName = element.pocName;
        g.pocEmail = element.pocEmail;
        grantees.push(g);
    });
    
    const granteeRegistry = await getParticipantRegistry(NS + '.Grantee');
    await granteeRegistry.addAll(grantees);

    // const edusers = config.get("demo_education");
    edUsers = [];

    educationList.forEach(function(element){
        console.log(element);
        var e = factory.newResource(NS, 'Education', element.userId);
        e.userId = e.getIdentifier();
        e.pocName = element.pocName;
        e.pocEmail = element.pocEmail;
        edUsers.push(e);
    });

    const educationRegistry = await getParticipantRegistry(NS + '.Education');
    await educationRegistry.addAll(edUsers);

    // const treasurys = config.get("demo_treasury");
    treasuryUsers = [];

    treasuryList.forEach(function(element){
        console.log(element);
        var t = factory.newResource(NS, 'Treasury', element.userId);
        t.userId = t.getIdentifier();
        t.pocName = element.pocName;
        t.pocEmail = element.pocEmail;
        treasuryUsers.push(t);
    });

    const treasuryRegistry = await getParticipantRegistry(NS + '.Treasury');
    await treasuryRegistry.addAll(treasuryUsers);

    // const actionReqs = config.get("action_reqs");
    actionReqs = [];

    actionReqList.forEach(function(element){
        console.log(element);
        var ar = factory.newResource(NS, 'ActionRequest', element.requestId);
        ar.requestId = ar.getIdentifier();
        ar.creationDate = element.creationDate;
        ar.status = element.status;
        ar.requestValue = element.requestValue;
        ar.owner = element.owner;
        ar.assignedValidators = element.assignedValidators;
        ar.approvedValidators = element.approvedValidators;
        if(element.receiptImage){
            ar.receiptImage = element.receiptImage;
        }
        ar.receiptHash = element.receiptHash;
        actionReqs.push(ar);
    });


    const arRegistry = await getAssetRegistry(NS + '.ActionRequest');
    await arRegistry.addAll(actionReqs);
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
    let result = await issueIdentity('net.biz.digitalPropertyNetwork.Person#mae@biznet.org', 'maeid1')
          console.log(`userID = ${result.userID}`);
          console.log(`userSecret = ${result.userSecret}`);
 }

 /**
  * Create Action Request -- this one is a little trickier b/c some of the randomness and rules involved.
  * @param {com.usgov.grantblock.CreateActionRequest} arParams
  * @returns {com.usgov.grantblock.arId} the return data
  * @transaction
  */
 async function createActionRequest(arParams){
    const factory = getFactory();
    const NS = 'com.usgov.grantblock';
    
    var params =arParams;

    const arRegistry = await getAssetRegistry(NS + '.ActionRequest');
    
    const gRegistry = await getParticipantRegistry(NS + '.Grantee');

    var creationDate = new Date();
    creationDate = creationDate.toString();

    // This code should put the date in the correct format
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    //time zone conversion to east coast time

    // var time = dd + "/" + mm + "/" + yyyy + " " + hr + ':' + min + ':' + sec; 
    
    var cDate = new Date(yyyy, mm-1, dd);
    
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    if(hr<10){
        hr='0'+hr;
    }
    
    if(min<10){
        min='0'+min;
    }
    if(sec<10){
        sec='0'+sec;
    }
    var date_1 = yyyy+mm+dd+hr+min+sec;

    creationDate = date_1.toString();

    var requestorId = arParams.requestor.getIdentifier();
    requestorId = requestorId.toString();

    const actionReq = factory.newResource(NS, 'ActionRequest', (requestorId + "AR" + creationDate));
    actionReq.status = "INITIALIZED";
    actionReq.requestId = actionReq.getIdentifier();
    console.log(actionReq.requestId);   //for debugging purposes only

    //Check to see if the request valuation is less than or equal to the amount the grantee has
    var reqValue = params.requestValue;
    var grantee = await gRegistry.get(params.requestor.granteeId);
    var gBalance = grantee.grantBalance;
    if(reqValue <= gBalance){
        actionReq.requestValue = params.requestValue;    
        grantee.grantBalance=grantee.grantBalance-reqValue;
    }else{
        throw new Error('Request amount exceeds available balance!');
    }

    //day month year hour minute second
    

    // After this construct a string with the above results as below
    //var time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second; 
    // var d = new Date(time);
    actionReq.creationDate = cDate;
    actionReq.assignedValidators = [];
    //actionReq.assignedValidators.push(params.requestor);
    actionReq.approvedValidators = [];
    //actionReq.approvedValidators.push(params.requestor);

    //actionReq.owner = factory.newRelationship(NS, 'Grantee', params.requestor.getIdentifier());
    
    //add in the hash for the receipt stored off chain here
    actionReq.receiptHash = params.receiptHash;

    actionReq.owner = factory.newRelationship(NS, 'Grantee', params.requestor);

    const c = getFactory().newConcept('com.usgov.grantblock', 'arId');
    c.requestId = actionReq.getIdentifier();

    await arRegistry.add(actionReq);
    await gRegistry.update(grantee);

    return c;
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
    var ar = validatorParams.request.getIdentifier().toString();
    
    //get the grantee and Action Request registry
    const arRegistry = await getAssetRegistry(NS + '.ActionRequest');
    var currentReq = await arRegistry.get(ar);

    //create an array and move all grantees to it
    const gRegistry = await getParticipantRegistry(NS + '.Grantee');
    var granteeArray = await gRegistry.getAll();
    var granteeList = granteeArray.map(function(grantee){
        return grantee['granteeId'];
    });
    console.log(granteeList);

    //remove the owner from contention for validation
    var identifier = currentReq.owner.getIdentifier();
    identifier = identifier.substring((identifier.indexOf("#")+1), (identifier.indexOf("}")));
    // var qgReg = currentReq.owner.getFullyQualifiedType();
    // var owid = currentReq.owner.getIdentifier();
    // var identifier = qgReg.get(owid);
    // var arOw = await gRegistry.resolve(currentReq.owner);
    // var identifier = arOw.granteeId;

    // Once you have a Widget asset, you can call Widget.owner.getFullyQualifiedType()
    //  which returns the name of the participant registry the owner is in.
    //   Then call Widget.owner.getIdentifier() to get the id of the owner in the 
    //   PersonRegistry, then call  PersonRegistry.get(identifier) to get the owner 
    //   participant
    // When getting the Widget from the WidgetRegistry, you can call WidgetRegistry.resolve(identifier)
    //  to resolve all relationships


    var index = granteeList.indexOf(identifier);
    if (index > -1) {
      granteeList.splice(index, 1);
    }
    
    // CHECK 1 - Does the record already have validators? If so, how many more does it need and ensure no duplicates.
    if(currentReq.status==="VALIDATORS_SELECTED"){
        throw new Error("You already selected the validators for this request.");
    }

    // CHECK 2 - Are there enough different grantees in the registry for the number of validators requested?
    var granteesCount = granteeList.length;
    var validatorCount = numValidators;

    //The reason I don't need to subtract 1 from the granteesCount is because I already removed one grantee (the request owner) above
    if(validatorCount > granteesCount){
        throw new Error("You're asking for more validators than there are grantees.");
        //TODO - set default input to three and change this error such that if they want more than are available you set the number of validators to the max possible
    }

    //TODO - add in the option to automatically select the number of validators based on the percentage of the grantee's funds that the action Request is for

    //Enter the loop with the number of validators left to add
    var validatorIndexes = [];
    while(validatorCount>0){
        var randomInt = Math.floor(Math.random()*granteesCount);
        if(validatorIndexes.includes(randomInt)===true){
    
        }else{
            validatorIndexes.push(randomInt);
            validatorCount = validatorCount-1;
        }
    }
    //TODO - add in load balancing for the grantees

    // If everything else has done well at this point, just get everything, push it, and decrement accordingly
    var secondCount = validatorIndexes.length;
    var x;
    for(x=0; x<secondCount;x++){
        var recNo = granteeList[validatorIndexes[x]];
        var pushReq = await gRegistry.get(recNo);
        currentReq.assignedValidators.push(pushReq);
    }

    currentReq.status = "VALIDATORS_SELECTED";
    await arRegistry.update(currentReq);

    //emit an event that this Action Request has been created
    const creationNotification = getFactory().newEvent('com.usgov.grantblock', 'NotifyValidators');
    creationNotification.request = currentReq;
    emit(creationNotification);
 }

 /**
  * Approve Action Request - takes the ID of the person and a value (true or false) to show approval or disapproval and moves the ID to approval accordingly
  * @param {com.usgov.grantblock.ApproveActionRequest} approveParams
  * @transaction
  */
 async function approveActionRequest(approveParams){
    

    var approver = approveParams.approver;
    var approval = approveParams.approve;
    var currentReqId = approveParams.request.requestId;

    const NS = 'com.usgov.grantblock';
    const arRegistry = await getAssetRegistry(NS + '.ActionRequest');
    const currentReq = await arRegistry.get(currentReqId);

    var identifier = currentReq.owner.getIdentifier();
    identifier = identifier.substring((identifier.indexOf("#")+1), (identifier.indexOf("}")));
    // console.log("SEARCHME --THIS SHOULD HAVE THE CURRENT REQ OWNER" + currentReq.owner);

    const gRegistry = await getParticipantRegistry(NS + '.Grantee');
    // const recOwner =  await gRegistry.get(approveParams.arOwner.granteeId);
    const recOwner = await gRegistry.get(identifier);
    
    //CHECK 1 - is the current hash of the receipt image the same as the last one recorded in the Blockchain
    if(currentReq.receiptHash===approveParams.receiptHash){

    }else{
        throw new Error('Receipt hashes do not match!');
    }
    //TODO - Implement assigned identity credentials for each validator to make sure that the grantee that is assigned is the one actually validating
    //TODO - key generation and identity assigning - demonstrate key validation
    
    // let owner = currentReq.owner.toString();
    // let x = currentReq.owner.getFullyQualifiedType();
    // var somethingR = await arRegistry.resolve(currentReqId);
    // var identifier = currentReq.owner.id.getIdentifier().toString();
    // var arOwner = await gRegistry.get(identifier);
    // var ownerIdentifier = owner.granteeId.toString();

    if(approval === true && currentReq.status !== "REJECTED"){
        //check to make sure the requestor is included in the list of approvers
        //add the approver to the list of approved validators

        currentReq.approvedValidators.push(approver);

        if(currentReq.approvedValidators === currentReq.assignedValidators){
            currentReq.status = "APPROVED";
        }else{
            currentReq.status = "VALIDATION_IN_PROGRESS";
         }
    }else {
        //emit an event to action request owner that their request was rejected
        
        if(currentReq.status==="REJECTED"){
            
        }else{
            recOwner.grantBalance = recOwner.grantBalance + currentReq.requestValue;
            currentReq.status="REJECTED";
        }
        // const failureNotification =getFactory().newEvent('com.usgov.grantblock', 'NotifyRequestFailure');
        // failureNotification.request = currentReq;
        // emit(failureNotification);
    }
    // else{
    //     throw new Error('Could not determine whether the approver approved or declined to approve the request.');
    // }
    await gRegistry.update(recOwner);
    await arRegistry.update(currentReq);
 }

 /**
  * Get User History - This gets the list of action requests that a grantee has made
  * @param {com.usgov.grantblock.GetUserHistory} historyParams
  * @transaction
  */
 async function getUserHistory(historyParams){
    var id = historyParams.grantee.getIdentifier();
    id = identifier.substring((identifier.indexOf("#")+1), (identifier.indexOf("}")));

    const arHistory = await query('selectGranteeARs', { inputValue: id });
    
    return arHistory;
 }

 /**
  * Get Action Items - this will return a list of action requests for which the grantee in question has been selected as an assigned validator
  * @param {com.usgov.grantblock.GetActionItems} aiParams
  * @transaction
  */
 async function getActionItems(aiParams){
    var id = aiParams.grantee.getIdentifier();
    id = identifier.substring((identifier.indexOf("#")+1), (identifier.indexOf("}")));

    const ais = await query('selectARsForValidation', { inputValue: id});
    return ais;
 }

 /**
  * Get Action Items - this will return a list of action requests for which the grantee in question has been selected as an assigned validator
  * @param {com.usgov.grantblock.GetActionItems} aiParams
  * @transaction
  */
 async function getActionItems(aiParams){
    var id = aiParams.grantee.getIdentifier();
    id = identifier.substring((identifier.indexOf("#")+1), (identifier.indexOf("}")));

    const ais = await query('selectARsForValidation', { inputValue: id});
    return ais;
 }
 /**
  * Get Action Items - this will return a list of action requests for which the grantee in question has been selected as an assigned validator
  * @param {com.usgov.grantblock.GetActionItems} aiParams
  * @transaction
  */
 async function getActionItems(aiParams){
    var id = aiParams.grantee.getIdentifier();
    id = identifier.substring((identifier.indexOf("#")+1), (identifier.indexOf("}")));

    const ais = await query('selectARsForValidation', { inputValue: id});
    return ais;
 }
 //TODO - build a call for GetEscrowAmount() - uses owner query to return the current funds in process        

 //TODO - debug the following transactions below this line

 /**
  * Get Escrow Balance - this will return the total amount of money that is in escrow for a given grantee
  * @param {com.usgov.grantblock.GetEscrowBalance} escrowParams
  * @transaction
  */
 async function getEscrowBalance(escrowParams){
    var id = escrowParams.grantee.getIdentifier();
    id = identifier.substring((identifier.indexOf("#")+1), (identifier.indexOf("}")));

    const ais = await query('selectGranteeARs', { inputValue: id});
    const totalescrow = 0;
    ais.forEach(function(element){
        totalescrow = totalescrow + element.requestValue;
    });
    return totalescrow;
 }

//This function doesn't currently work and was deprioritized.  
//This would have been part of the obligation process which would go 
// 1. Create a slate asset, 
// 2. add obligations to the slate
// 3. obligate the slate to put funds in the grantee accounts
//  /**
//   * Obligate Slate - This allows you to add in money to the accounts of one or more grantees
//   * @param {com.usgov.grantblock.ObligateSlate} obligateParams
//   * @transaction
//   */
//  async function obligateSlate(obligateParams){
//     // const factory = getFactory();
//     const NS = 'com.usgov.grantblock';
//     const slate = obligateParams.slate;

//     // var granteeIds = [];
//     // granteeIds.push(obligateParams.granteeIds);
//     // var allottedAmounts = [];
//     // allottedAmounts.push(obligateParams.allottedAmounts);
//     // var granteeIds = obligateParams.granteeIds;
//     // var allottedAmounts = obligateParams.allottedAmounts;

//     const gRegistry = await getParticipantRegistry(NS + '.Grantee');
//     // var grantee = await gRegistry.get(granteeIds);
//     // grantee.grantBalance = grantee.grantBalance + allottedAmounts;
//     // const obligations = [];
//     var grantees = [];
//     // var i;
//     // for(i=0; i<granteeIds.length; i++){
//         // const grantee = gRegistry.get(params.grantees[i]);
//         // grantee.grantBalance = grantee.grantBalance + allottedAmounts[i];
//         // grantees.push(grantee);
//     // }
//     var granteeIdList = slate.map(function(obligation){
//         return obligation["granteeId"];
//     });
//     var i;
//     for(i=0; i<granteeIdList.length; i++){
//         var obl = slate.pop();
//         var grantee = await gRegistry.get(obl.granteeId);
//         grantee.grantBalance = grantee.grantBalance + obl.allottedAmount;
//         grantees.push(grantee);
//     }
//     // slate.forEach(function(obligation){
//     //     var id = Obligation.granteeId;
//     //     var grantee = await gRegistry.get(id);
//     //     grantee.grantBalance = grantee.grantBalance + obligation.allottedAmount;
//     //     grantees.push(grantee);
//     // });

//     await gRegistry.update(grantees);
//  }

/**
 * Set Up Demo Transaction -- FOR ADMINISTRATORS AND DEMO PURPOSES ONLY -- populates the demo with participants and assets
 * @param {com.usgov.grantblock.SetUpDemo} setupParams
 * @transaction
 */
async function setUpDemo(){
    // const balance = setupParams.grantBalance;
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
        // grantee.grantBalance = balance;
        grantee.grantBalance = Math.random()*1000000;
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
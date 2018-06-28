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
 * Sample transaction
 * @param {com.usgov.ed.grants.SampleTransaction} sampleTransaction
 * @transaction
 */
/*
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('com.usgov.ed.grants.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('com.usgov.ed.grants', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
*/

/**
 * Set Up Demo Transaction -- FOR ADMINISTRATORS AND DEMO PURPOSES ONLY -- populates the demo with participants and assets
 * @param {com.usgov.ed.grants.SetUpDemo} demoParams
 * @transaction
 */
async function setUpDemo(demoParams){

}


/**
 * Create Grantee - this will generate a new grantee's profile 
 * @param {com.usgov.ed.grants.CreateGrantee} granteeParams
 *  @transaction
 */
async function createGrantee(granteeParams){
    const factory = getFactory();
    const NS = 'com.usgov.ed.grants'

    var params = granteeParams;

    const grantee = factory.newResource(NS, 'Grantee', params.granteeId);
    grantee.granteeId = grantee.getIdentifier();
    grantee.grantBalance = 0;
    grantee.pocName = params.pocName;
    grantee.pocEmail = params.pocEmail;
    const granteeRegistry = await getParticipantRegistry(NS + '.Grantee');
    await granteeRegistry.addAll([grantee]);

 }

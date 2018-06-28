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
 * @param {com.usgov.ed.grants.SetUpDemo} setupParams
 * @transaction
 */
async function setUpDemo(setupParams){
    const factory = getFactory();
    const NS = 'com.usgov.ed.grants';

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
        grantee.grantBalance = Math.floor(Math.random() * 101);
        //grantee.grantBalance = 0;
        grantee.pocName = 'Greg Grantee';
        grantee.pocEmail = 'ggrant@college.edu';
        console.log(grantee.granteeId + ' has been created.');
    });

    console.log(grantees);
    
    const granteeRegistry = await getParticipantRegistry(NS + '.Grantee');
    await granteeRegistry.addAll(grantees);

    const eduser = factory.newResource(NS, 'Education', 'ed');
    eduser.userId = eduser.getIdentifier();
    eduser.pocName = 'Emma Education';
    eduser.pocEmail = 'eedu@ed.gov';
    const educationRegistry = await getParticipantRegistry(NS + 'Education');
    await educationRegistry.addAll([eduser]);

    const treasury = factory.newResource(NS, 'Treasury', 'treasury');
    treasury.userId = treasury.getIdentifier();
    treasury.pocName = 'Tommy Treasury';
    treasury.pocEmail = 'ttreas@treasury.gov';
    const treasuryRegistry = await getParticipantRegistry(NS + 'Treasury');
    await treasuryRegistry.addAll([treasury]);

}


/**
 * Create Grantee - this will generate a new grantee's profile 
 * @param {com.usgov.ed.grants.CreateGrantee} granteeParams
 *  @transaction
 */
async function createGrantee(granteeParams){
    const factory = getFactory();
    const NS = 'com.usgov.ed.grants';

    var params = granteeParams;

    const grantee = factory.newResource(NS, 'Grantee', params.granteeId);
    grantee.granteeId = grantee.getIdentifier();
    grantee.grantBalance = 0;
    grantee.pocName = params.pocName;
    grantee.pocEmail = params.pocEmail;
    const granteeRegistry = await getParticipantRegistry(NS + '.Grantee');
    await granteeRegistry.addAll([grantee]);

 }

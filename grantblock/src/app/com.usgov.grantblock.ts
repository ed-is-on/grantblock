import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.usgov.grantblock{
   export class Obligation {
      granteeId: string;
      allottedAmount: number;
   }
   export class Education extends Participant {
      userId: string;
      pocName: string;
      pocEmail: string;
   }
   export class Treasury extends Participant {
      userId: string;
      pocName: string;
      pocEmail: string;
   }
   export class Grantee extends Participant {
      granteeId: string;
      grantBalance: number;
      pocName: string;
      pocEmail: string;
      numActionReqs: number;
   }
   export class ActionRequest extends Asset {
      requestId: string;
      requestValue: number;
      owner: Grantee;
      assignedValidators: Grantee[];
      approvedValidators: Grantee[];
      treasuryValidator: boolean;
   }
   export class CreateGrantee extends Transaction {
      granteeId: string;
      grantBalance: number;
      pocName: string;
      pocEmail: string;
   }
   export class CreateEdUser extends Transaction {
      userId: string;
      pocName: string;
      pocEmail: string;
   }
   export class CreateTreasury extends Transaction {
      userId: string;
      pocName: string;
      pocEmail: string;
   }
   export class ImportGrantee extends Transaction {
      granteeId: string;
      grantBalance: number;
      pocName: string;
      pocEmail: string;
   }
   export class ObligateSlate extends Transaction {
      slate: Obligation[];
   }
   export class CreateActionRequest extends Transaction {
      requestValue: number;
      validators: number;
      requestor: Grantee;
   }
   export class VerifyActionRequest extends Transaction {
   }
   export class ApproveActionRequest extends Transaction {
   }
   export class SetUpDemo extends Transaction {
      grantBalance: number;
   }
// }

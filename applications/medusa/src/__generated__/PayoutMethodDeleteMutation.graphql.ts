/**
 * @generated SignedSource<<02e74f60ffdf64d92aa726b7ff21d656>>
 * @relayHash d05ef2b078b977d7c6a453a9e0402641
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d05ef2b078b977d7c6a453a9e0402641

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteAccountPayoutMethodInput = {
  payoutMethodId: string;
};
export type PayoutMethodDeleteMutation$variables = {
  input: DeleteAccountPayoutMethodInput;
};
export type PayoutMethodDeleteMutationVariables = PayoutMethodDeleteMutation$variables;
export type PayoutMethodDeleteMutation$data = {
  readonly deleteAccountPayoutMethod: {
    readonly deletedAccountPayoutMethodId: string;
  } | null;
};
export type PayoutMethodDeleteMutationResponse = PayoutMethodDeleteMutation$data;
export type PayoutMethodDeleteMutation = {
  variables: PayoutMethodDeleteMutationVariables;
  response: PayoutMethodDeleteMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "DeleteAccountPayoutMethodPayload",
    "kind": "LinkedField",
    "name": "deleteAccountPayoutMethod",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "deletedAccountPayoutMethodId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PayoutMethodDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PayoutMethodDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "d05ef2b078b977d7c6a453a9e0402641",
    "metadata": {},
    "name": "PayoutMethodDeleteMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "72374d44ae3e610974e952b9da546597";

export default node;

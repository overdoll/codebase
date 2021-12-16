/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash f949eac0bb807076baf26b8240cba212 */

import { ConcreteRequest } from "relay-runtime";
export type RecoveryCodesSetupMutationVariables = {};
export type RecoveryCodesSetupMutationResponse = {
    readonly generateAccountMultiFactorRecoveryCodes: {
        readonly accountMultiFactorRecoveryCodes: ReadonlyArray<{
            readonly __id: string;
            readonly code: string;
        }>;
    } | null;
};
export type RecoveryCodesSetupMutation = {
    readonly response: RecoveryCodesSetupMutationResponse;
    readonly variables: RecoveryCodesSetupMutationVariables;
};



/*
mutation RecoveryCodesSetupMutation {
  generateAccountMultiFactorRecoveryCodes {
    accountMultiFactorRecoveryCodes {
      code
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GenerateAccountMultiFactorRecoveryCodesPayload",
    "kind": "LinkedField",
    "name": "generateAccountMultiFactorRecoveryCodes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountMultiFactorRecoveryCode",
        "kind": "LinkedField",
        "name": "accountMultiFactorRecoveryCodes",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          {
            "kind": "ClientExtension",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__id",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RecoveryCodesSetupMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RecoveryCodesSetupMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "f949eac0bb807076baf26b8240cba212",
    "metadata": {},
    "name": "RecoveryCodesSetupMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '567a08fbc1bb394289fb0530d4cccabe';
export default node;

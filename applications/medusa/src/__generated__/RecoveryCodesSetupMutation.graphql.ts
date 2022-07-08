/**
 * @generated SignedSource<<6de36dc3a6a73a3bc55328ba76896d5c>>
 * @relayHash f949eac0bb807076baf26b8240cba212
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f949eac0bb807076baf26b8240cba212

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RecoveryCodesSetupMutation$variables = {};
export type RecoveryCodesSetupMutation$data = {
  readonly generateAccountMultiFactorRecoveryCodes: {
    readonly accountMultiFactorRecoveryCodes: ReadonlyArray<{
      readonly __id: string;
      readonly code: string;
    }>;
  } | null;
};
export type RecoveryCodesSetupMutation = {
  response: RecoveryCodesSetupMutation$data;
  variables: RecoveryCodesSetupMutation$variables;
};

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

(node as any).hash = "567a08fbc1bb394289fb0530d4cccabe";

export default node;

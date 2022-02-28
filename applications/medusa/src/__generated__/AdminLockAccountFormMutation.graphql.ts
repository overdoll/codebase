/**
 * @generated SignedSource<<7256ab9d222c97a68207cc42ca9420eb>>
 * @relayHash e150add009c6617d8625fb109686a309
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e150add009c6617d8625fb109686a309

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LockAccountInput = {
  accountID: string;
  endTime: any;
};
export type AdminLockAccountFormMutation$variables = {
  input: LockAccountInput;
};
export type AdminLockAccountFormMutationVariables = AdminLockAccountFormMutation$variables;
export type AdminLockAccountFormMutation$data = {
  readonly lockAccount: {
    readonly account: {
      readonly id: string;
      readonly lock: {
        readonly expires: any;
      } | null;
    } | null;
  } | null;
};
export type AdminLockAccountFormMutationResponse = AdminLockAccountFormMutation$data;
export type AdminLockAccountFormMutation = {
  variables: AdminLockAccountFormMutationVariables;
  response: AdminLockAccountFormMutation$data;
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
    "concreteType": "LockAccountPayload",
    "kind": "LinkedField",
    "name": "lockAccount",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expires",
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminLockAccountFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AdminLockAccountFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "e150add009c6617d8625fb109686a309",
    "metadata": {},
    "name": "AdminLockAccountFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "89b93c016d1615f32a9795b4d5d0cf9f";

export default node;

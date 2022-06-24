/**
 * @generated SignedSource<<b0ffa61111e4898cfecc58e8921fadb1>>
 * @relayHash 3156551a3b42e591ea6e0339661ee6e4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3156551a3b42e591ea6e0339661ee6e4

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LockAccountInput = {
  accountID: string;
  endTime: any;
};
export type StaffLockAccountFormMutation$variables = {
  input: LockAccountInput;
};
export type StaffLockAccountFormMutation$data = {
  readonly lockAccount: {
    readonly account: {
      readonly id: string;
      readonly lock: {
        readonly expires: any;
      } | null;
    } | null;
  } | null;
};
export type StaffLockAccountFormMutation = {
  response: StaffLockAccountFormMutation$data;
  variables: StaffLockAccountFormMutation$variables;
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
    "name": "StaffLockAccountFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffLockAccountFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "3156551a3b42e591ea6e0339661ee6e4",
    "metadata": {},
    "name": "StaffLockAccountFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "07bc2704b577e2e52662bf87f5f83a5d";

export default node;

/**
 * @generated SignedSource<<54006abf26b234b12672d7691df10d94>>
 * @relayHash a1440aace9828c9d8a4b25dc64d80b80
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a1440aace9828c9d8a4b25dc64d80b80

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteAccountEmailInput = {
  accountEmailId: string;
};
export type DeleteEmailMutation$variables = {
  connections: ReadonlyArray<string>;
  input: DeleteAccountEmailInput;
};
export type DeleteEmailMutation$data = {
  readonly deleteAccountEmail: {
    readonly accountEmailId: string;
  } | null;
};
export type DeleteEmailMutation = {
  response: DeleteEmailMutation$data;
  variables: DeleteEmailMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accountEmailId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "DeleteAccountEmailPayload",
        "kind": "LinkedField",
        "name": "deleteAccountEmail",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "DeleteEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "DeleteAccountEmailPayload",
        "kind": "LinkedField",
        "name": "deleteAccountEmail",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "accountEmailId",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "a1440aace9828c9d8a4b25dc64d80b80",
    "metadata": {},
    "name": "DeleteEmailMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "5bba266634b889a266f21018e702fdeb";

export default node;

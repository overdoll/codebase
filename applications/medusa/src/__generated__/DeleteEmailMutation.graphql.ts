/**
 * @generated SignedSource<<5f1795fe8a69e62cdb7212cf1e4aa4e2>>
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
  input: DeleteAccountEmailInput;
  connections: ReadonlyArray<string>;
};
export type DeleteEmailMutationVariables = DeleteEmailMutation$variables;
export type DeleteEmailMutation$data = {
  readonly deleteAccountEmail: {
    readonly accountEmailId: string;
  } | null;
};
export type DeleteEmailMutationResponse = DeleteEmailMutation$data;
export type DeleteEmailMutation = {
  variables: DeleteEmailMutationVariables;
  response: DeleteEmailMutation$data;
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

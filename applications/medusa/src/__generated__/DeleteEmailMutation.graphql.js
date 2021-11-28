/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type DeleteAccountEmailInput = {|
  accountEmailId: string
|};
export type DeleteEmailMutationVariables = {|
  input: DeleteAccountEmailInput,
  connections: $ReadOnlyArray<string>,
|};
export type DeleteEmailMutationResponse = {|
  +deleteAccountEmail: ?{|
    +accountEmailId: string
  |}
|};
export type DeleteEmailMutation = {|
  variables: DeleteEmailMutationVariables,
  response: DeleteEmailMutationResponse,
|};


/*
mutation DeleteEmailMutation(
  $input: DeleteAccountEmailInput!
) {
  deleteAccountEmail(input: $input) {
    accountEmailId
  }
}
*/

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
    "cacheID": "a1440aace9828c9d8a4b25dc64d80b80",
    "id": null,
    "metadata": {},
    "name": "DeleteEmailMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteEmailMutation(\n  $input: DeleteAccountEmailInput!\n) {\n  deleteAccountEmail(input: $input) {\n    accountEmailId\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '5bba266634b889a266f21018e702fdeb';
module.exports = node;

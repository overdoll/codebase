/**
 * @flow
 * @relayHash e304b765321a6eba67df87778eed3c7e
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type EmailsPrimaryMutationVariables = {|
  email: string
|};
export type EmailsPrimaryMutationResponse = {|
  +addAccountEmail: {|
    +ok: boolean,
    +validation: ?{|
      +code: string
    |},
  |}
|};
export type EmailsPrimaryMutation = {|
  variables: EmailsPrimaryMutationVariables,
  response: EmailsPrimaryMutationResponse,
|};


/*
mutation EmailsPrimaryMutation(
  $email: String!
) {
  addAccountEmail(email: $email) {
    ok
    validation {
      code
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      }
    ],
    "concreteType": "Response",
    "kind": "LinkedField",
    "name": "addAccountEmail",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Validation",
        "kind": "LinkedField",
        "name": "validation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
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
    "name": "EmailsPrimaryMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EmailsPrimaryMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "e304b765321a6eba67df87778eed3c7e",
    "metadata": {},
    "name": "EmailsPrimaryMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '7d855f30c3aa31b0633dfe909ffd8c4a';
module.exports = node;

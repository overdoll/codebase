/**
 * @flow
 * @relayHash 0791e7155d7a6930e9fd33f5f42a13be
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type DeleteAccountEmailInput = {|
  accountEmailId: string
|};
export type EmailsDeleteMutationVariables = {|
  input: DeleteAccountEmailInput
|};
export type EmailsDeleteMutationResponse = {|
  +deleteAccountEmail: ?{|
    +accountEmailId: string
  |}
|};
export type EmailsDeleteMutation = {|
  variables: EmailsDeleteMutationVariables,
  response: EmailsDeleteMutationResponse,
|};


/*
mutation EmailsDeleteMutation(
  $input: DeleteAccountEmailInput!
) {
  deleteAccountEmail(input: $input) {
    accountEmailId
  }
}
*/

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
    "concreteType": "DeleteAccountEmailPayload",
    "kind": "LinkedField",
    "name": "deleteAccountEmail",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accountEmailId",
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
    "name": "EmailsDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EmailsDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0791e7155d7a6930e9fd33f5f42a13be",
    "metadata": {},
    "name": "EmailsDeleteMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '72821f14524e88d3e570c95ab5e868dd';
module.exports = node;

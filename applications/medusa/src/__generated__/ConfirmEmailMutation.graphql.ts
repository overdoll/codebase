/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 1f650479820cf72957f1588bc01645a4 */

import { ConcreteRequest } from "relay-runtime";
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
export type ConfirmAccountEmailInput = {
    id: string;
    secret: string;
};
export type ConfirmEmailMutationVariables = {
    input: ConfirmAccountEmailInput;
};
export type ConfirmEmailMutationResponse = {
    readonly confirmAccountEmail: {
        readonly accountEmail: {
            readonly id: string;
            readonly email: string;
            readonly status: AccountEmailStatus;
        } | null;
    } | null;
};
export type ConfirmEmailMutation = {
    readonly response: ConfirmEmailMutationResponse;
    readonly variables: ConfirmEmailMutationVariables;
};



/*
mutation ConfirmEmailMutation(
  $input: ConfirmAccountEmailInput!
) {
  confirmAccountEmail(input: $input) {
    accountEmail {
      id
      email
      status
    }
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
    "concreteType": "ConfirmAccountEmailPayload",
    "kind": "LinkedField",
    "name": "confirmAccountEmail",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountEmail",
        "kind": "LinkedField",
        "name": "accountEmail",
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
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
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
    "name": "ConfirmEmailMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConfirmEmailMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "1f650479820cf72957f1588bc01645a4",
    "metadata": {},
    "name": "ConfirmEmailMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '16b339e960c3dc5e49b65409a9b20a66';
export default node;

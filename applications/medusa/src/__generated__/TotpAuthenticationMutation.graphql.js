/**
 * @flow
 * @relayHash 0402b82cbd53bb0ec56d9fdf1e67d405
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation = "INVALID_CODE" | "TOKEN_EXPIRED" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput = {|
  code: string
|};
export type TotpAuthenticationMutationVariables = {|
  input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput
|};
export type TotpAuthenticationMutationResponse = {|
  +grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp: ?{|
    +validation: ?GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation
  |}
|};
export type TotpAuthenticationMutation = {|
  variables: TotpAuthenticationMutationVariables,
  response: TotpAuthenticationMutationResponse,
|};


/*
mutation TotpAuthenticationMutation(
  $input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput!
) {
  grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp(input: $input) {
    validation
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
    "concreteType": "GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload",
    "kind": "LinkedField",
    "name": "grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "validation",
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
    "name": "TotpAuthenticationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TotpAuthenticationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0402b82cbd53bb0ec56d9fdf1e67d405",
    "metadata": {},
    "name": "TotpAuthenticationMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '8ad475b67dd763163f089f78bdf45d95';
module.exports = node;

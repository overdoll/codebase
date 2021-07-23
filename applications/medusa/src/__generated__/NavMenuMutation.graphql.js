/**
 * @flow
 * @relayHash 35e6c42c1ed318ec1d189ef56ec9570f
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type NavMenuMutationVariables = {||};
export type NavMenuMutationResponse = {|
  +revokeAccountAccess: ?{|
    +revokedAccountId: string
  |}
|};
export type NavMenuMutation = {|
  variables: NavMenuMutationVariables,
  response: NavMenuMutationResponse,
|};


/*
mutation NavMenuMutation {
  revokeAccountAccess {
    revokedAccountId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "RevokeAccountAccessPayload",
    "kind": "LinkedField",
    "name": "revokeAccountAccess",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "revokedAccountId",
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
    "name": "NavMenuMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NavMenuMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "35e6c42c1ed318ec1d189ef56ec9570f",
    "metadata": {},
    "name": "NavMenuMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'ae763c4adbdbe6536012c719f7714a52';
module.exports = node;

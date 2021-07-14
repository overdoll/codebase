/**
 * @flow
 * @relayHash f00a2e79d26efad10f0bc4e1ac9a0220
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type NavMenuMutationVariables = {||};
export type NavMenuMutationResponse = {|
  +logout: {|
    +validation: ?{|
      +code: string
    |},
    +ok: boolean,
  |}
|};
export type NavMenuMutation = {|
  variables: NavMenuMutationVariables,
  response: NavMenuMutationResponse,
|};


/*
mutation NavMenuMutation {
  logout {
    validation {
      code
    }
    ok
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Response",
    "kind": "LinkedField",
    "name": "logout",
    "plural": false,
    "selections": [
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
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
    "id": "f00a2e79d26efad10f0bc4e1ac9a0220",
    "metadata": {},
    "name": "NavMenuMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '897e9d4f5bd2a75578d56697fdb5d8a6';
module.exports = node;

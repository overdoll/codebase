/**
 * @flow
 * @relayHash 171135cf317baffe9e38fc48365f6877
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type TopRightMenuMutationVariables = {||};
export type TopRightMenuMutationResponse = {|
  +revokeAccountAccess: ?{|
    +revokedAccountId: string
  |}
|};
export type TopRightMenuMutation = {|
  variables: TopRightMenuMutationVariables,
  response: TopRightMenuMutationResponse,
|};


/*
mutation TopRightMenuMutation {
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
    "name": "TopRightMenuMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TopRightMenuMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "171135cf317baffe9e38fc48365f6877",
    "metadata": {},
    "name": "TopRightMenuMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '23512c413fbb44a4cda1f3a9c43500dc';
module.exports = node;

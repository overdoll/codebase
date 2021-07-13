/**
 * @flow
 * @relayHash ea4cbdb02f4888cdd14a5b393f55addb
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type LobbyMutationVariables = {||};
export type LobbyMutationResponse = {|
  +authenticateEmail: {|
    +ok: boolean
  |}
|};
export type LobbyMutation = {|
  variables: LobbyMutationVariables,
  response: LobbyMutationResponse,
|};


/*
mutation LobbyMutation {
  authenticateEmail {
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
    "name": "authenticateEmail",
    "plural": false,
    "selections": [
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
    "name": "LobbyMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LobbyMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "ea4cbdb02f4888cdd14a5b393f55addb",
    "metadata": {},
    "name": "LobbyMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '883b88813dc01d00e36725fa88437d2f';
module.exports = node;

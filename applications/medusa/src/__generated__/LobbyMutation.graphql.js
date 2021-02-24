/**
 * @flow
 * @relayHash 90f66151793c514fcbbc647a644bec16
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type LobbyMutationVariables = {||};
export type LobbyMutationResponse = {|
  +authEmail: boolean
|};
export type LobbyMutation = {|
  variables: LobbyMutationVariables,
  response: LobbyMutationResponse,
|};


/*
mutation LobbyMutation {
  authEmail
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "authEmail",
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
    "id": "90f66151793c514fcbbc647a644bec16",
    "metadata": {},
    "name": "LobbyMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'dea3b01c7d28227337c212e820a85b25';
module.exports = node;

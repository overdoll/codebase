/**
 * @flow
 * @relayHash 2d5391180cfa5ba29e2940ce0529f58a
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type NavMenuMutationVariables = {||};
export type NavMenuMutationResponse = {|
  +logout: boolean
|};
export type NavMenuMutation = {|
  variables: NavMenuMutationVariables,
  response: NavMenuMutationResponse,
|};


/*
mutation NavMenuMutation {
  logout
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "logout",
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
    "id": "2d5391180cfa5ba29e2940ce0529f58a",
    "metadata": {},
    "name": "NavMenuMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'f9a904c38588c278775391992fdbd817';
module.exports = node;

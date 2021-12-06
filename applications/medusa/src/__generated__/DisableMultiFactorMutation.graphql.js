/**
 * @flow
 * @relayHash 295afab893be13dad8b4d59ba21b9133
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type DisableMultiFactorMutationVariables = {||};
export type DisableMultiFactorMutationResponse = {|
  +disableAccountMultiFactor: ?{|
    +accountMultiFactorTotpEnabled: ?boolean
  |}
|};
export type DisableMultiFactorMutation = {|
  variables: DisableMultiFactorMutationVariables,
  response: DisableMultiFactorMutationResponse,
|};


/*
mutation DisableMultiFactorMutation {
  disableAccountMultiFactor {
    accountMultiFactorTotpEnabled
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "DisableAccountMultiFactorPayload",
    "kind": "LinkedField",
    "name": "disableAccountMultiFactor",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accountMultiFactorTotpEnabled",
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
    "name": "DisableMultiFactorMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DisableMultiFactorMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "295afab893be13dad8b4d59ba21b9133",
    "metadata": {},
    "name": "DisableMultiFactorMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '4f0a20523c07a69a21529ae78274f51a';
module.exports = node;

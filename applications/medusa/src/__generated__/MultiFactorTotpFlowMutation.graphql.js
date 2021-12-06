/**
 * @flow
 * @relayHash d0f7d44cd800726b46e53e970757851a
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MultiFactorTotpFlowMutationVariables = {||};
export type MultiFactorTotpFlowMutationResponse = {|
  +generateAccountMultiFactorTotp: ?{|
    +multiFactorTotp: ?{|
      +secret: string,
      +imageSrc: string,
    |}
  |}
|};
export type MultiFactorTotpFlowMutation = {|
  variables: MultiFactorTotpFlowMutationVariables,
  response: MultiFactorTotpFlowMutationResponse,
|};


/*
mutation MultiFactorTotpFlowMutation {
  generateAccountMultiFactorTotp {
    multiFactorTotp {
      secret
      imageSrc
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GenerateAccountMultiFactorTotpPayload",
    "kind": "LinkedField",
    "name": "generateAccountMultiFactorTotp",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MultiFactorTotp",
        "kind": "LinkedField",
        "name": "multiFactorTotp",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "secret",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "imageSrc",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MultiFactorTotpFlowMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MultiFactorTotpFlowMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "d0f7d44cd800726b46e53e970757851a",
    "metadata": {},
    "name": "MultiFactorTotpFlowMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'ab43a8171fd19c2f81c11c6f3297a611';
module.exports = node;

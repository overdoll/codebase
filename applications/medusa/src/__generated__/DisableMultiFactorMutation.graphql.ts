/**
 * @generated SignedSource<<713cb5e38c450bd70f98177ebd050138>>
 * @relayHash 295afab893be13dad8b4d59ba21b9133
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 295afab893be13dad8b4d59ba21b9133

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DisableMultiFactorMutation$variables = {};
export type DisableMultiFactorMutationVariables = DisableMultiFactorMutation$variables;
export type DisableMultiFactorMutation$data = {
  readonly disableAccountMultiFactor: {
    readonly accountMultiFactorTotpEnabled: boolean | null;
  } | null;
};
export type DisableMultiFactorMutationResponse = DisableMultiFactorMutation$data;
export type DisableMultiFactorMutation = {
  variables: DisableMultiFactorMutationVariables;
  response: DisableMultiFactorMutation$data;
};

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

(node as any).hash = "4f0a20523c07a69a21529ae78274f51a";

export default node;

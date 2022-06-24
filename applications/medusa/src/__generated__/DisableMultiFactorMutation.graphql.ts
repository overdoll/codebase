/**
 * @generated SignedSource<<f7cb413b78953ecffc8d1a723c807522>>
 * @relayHash a00cddee8171c2359ee52bd1541c53fb
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a00cddee8171c2359ee52bd1541c53fb

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DisableMultiFactorMutation$variables = {};
export type DisableMultiFactorMutation$data = {
  readonly disableAccountMultiFactor: {
    readonly account: {
      readonly multiFactorEnabled: boolean;
    } | null;
  } | null;
};
export type DisableMultiFactorMutation = {
  response: DisableMultiFactorMutation$data;
  variables: DisableMultiFactorMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "multiFactorEnabled",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DisableMultiFactorMutation",
    "selections": [
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
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DisableMultiFactorMutation",
    "selections": [
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
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "a00cddee8171c2359ee52bd1541c53fb",
    "metadata": {},
    "name": "DisableMultiFactorMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "de8c255083e9fb8509c28007ef126226";

export default node;

/**
 * @generated SignedSource<<5b0b647e28283dc4788c8700c85d4391>>
 * @relayHash 8ff037e504b055ff04061393c42088d1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8ff037e504b055ff04061393c42088d1

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MultiFactorTotpFlowMutation$variables = {};
export type MultiFactorTotpFlowMutation$data = {
  readonly generateAccountMultiFactorTotp: {
    readonly multiFactorTotp: {
      readonly id: string;
      readonly imageSrc: string;
      readonly secret: string;
    } | null;
  } | null;
};
export type MultiFactorTotpFlowMutation = {
  response: MultiFactorTotpFlowMutation$data;
  variables: MultiFactorTotpFlowMutation$variables;
};

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
            "name": "id",
            "storageKey": null
          },
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
    "id": "8ff037e504b055ff04061393c42088d1",
    "metadata": {},
    "name": "MultiFactorTotpFlowMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e3553fc0ce0d27b96991a0298cfb97af";

export default node;

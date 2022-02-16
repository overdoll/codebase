/**
 * @generated SignedSource<<3774cc035395d55472df5e51d3624db0>>
 * @relayHash 56745124b1ccaaa6fb8719309331df80
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 56745124b1ccaaa6fb8719309331df80

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateAudienceIsStandardInput = {
  id: string;
  standard: boolean;
};
export type ChangeAudienceStandardMutation$variables = {
  input: UpdateAudienceIsStandardInput;
};
export type ChangeAudienceStandardMutationVariables = ChangeAudienceStandardMutation$variables;
export type ChangeAudienceStandardMutation$data = {
  readonly updateAudienceIsStandard: {
    readonly audience: {
      readonly id: string;
      readonly standard: boolean;
    } | null;
  } | null;
};
export type ChangeAudienceStandardMutationResponse = ChangeAudienceStandardMutation$data;
export type ChangeAudienceStandardMutation = {
  variables: ChangeAudienceStandardMutationVariables;
  response: ChangeAudienceStandardMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateAudienceIsStandardPayload",
    "kind": "LinkedField",
    "name": "updateAudienceIsStandard",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Audience",
        "kind": "LinkedField",
        "name": "audience",
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
            "name": "standard",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeAudienceStandardMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeAudienceStandardMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "56745124b1ccaaa6fb8719309331df80",
    "metadata": {},
    "name": "ChangeAudienceStandardMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a9fa2015ce8fcd5f83460b8b16a0802b";

export default node;

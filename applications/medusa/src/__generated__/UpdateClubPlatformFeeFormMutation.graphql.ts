/**
 * @generated SignedSource<<06a8f007aa1a64d3d81664bd8a21e336>>
 * @relayHash a5f6256299b3f4e1f18c58b9547da094
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a5f6256299b3f4e1f18c58b9547da094

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateClubPlatformFeeInput = {
  clubId: string;
  percent: number;
};
export type UpdateClubPlatformFeeFormMutation$variables = {
  input: UpdateClubPlatformFeeInput;
};
export type UpdateClubPlatformFeeFormMutationVariables = UpdateClubPlatformFeeFormMutation$variables;
export type UpdateClubPlatformFeeFormMutation$data = {
  readonly updateClubPlatformFee: {
    readonly clubPlatformFee: {
      readonly id: string;
      readonly percent: number;
    } | null;
  } | null;
};
export type UpdateClubPlatformFeeFormMutationResponse = UpdateClubPlatformFeeFormMutation$data;
export type UpdateClubPlatformFeeFormMutation = {
  variables: UpdateClubPlatformFeeFormMutationVariables;
  response: UpdateClubPlatformFeeFormMutation$data;
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
    "concreteType": "UpdateClubPlatformFeePayload",
    "kind": "LinkedField",
    "name": "updateClubPlatformFee",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ClubPlatformFee",
        "kind": "LinkedField",
        "name": "clubPlatformFee",
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
            "name": "percent",
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
    "name": "UpdateClubPlatformFeeFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateClubPlatformFeeFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a5f6256299b3f4e1f18c58b9547da094",
    "metadata": {},
    "name": "UpdateClubPlatformFeeFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "ad85c36edb464da322952018214c2d77";

export default node;

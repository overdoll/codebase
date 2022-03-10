/**
 * @generated SignedSource<<708be44bfa2dcf91654b9e4f11e19923>>
 * @relayHash 54ce97eb0a119c5089ee326c98213071
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 54ce97eb0a119c5089ee326c98213071

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "%future added value";
export type SubmitPostInput = {
  id: string;
};
export type SubmitPostButtonMutation$variables = {
  input: SubmitPostInput;
};
export type SubmitPostButtonMutationVariables = SubmitPostButtonMutation$variables;
export type SubmitPostButtonMutation$data = {
  readonly submitPost: {
    readonly post: {
      readonly id: string;
      readonly state: PostState;
    } | null;
  } | null;
};
export type SubmitPostButtonMutationResponse = SubmitPostButtonMutation$data;
export type SubmitPostButtonMutation = {
  variables: SubmitPostButtonMutationVariables;
  response: SubmitPostButtonMutation$data;
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
    "concreteType": "SubmitPostPayload",
    "kind": "LinkedField",
    "name": "submitPost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
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
            "name": "state",
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
    "name": "SubmitPostButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmitPostButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "54ce97eb0a119c5089ee326c98213071",
    "metadata": {},
    "name": "SubmitPostButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "c235b80e32afa292d8128f666a4d9fd7";

export default node;

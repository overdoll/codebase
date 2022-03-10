/**
 * @generated SignedSource<<3a5d60de9d4488294ab00da5455a2de7>>
 * @relayHash 46442a2e632818c647dea45c8eaf6766
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 46442a2e632818c647dea45c8eaf6766

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostLikeButtonUndoMutation$variables = {
  postId: string;
};
export type PostLikeButtonUndoMutationVariables = PostLikeButtonUndoMutation$variables;
export type PostLikeButtonUndoMutation$data = {
  readonly undoLikePost: {
    readonly postLikeId: string | null;
  } | null;
};
export type PostLikeButtonUndoMutationResponse = PostLikeButtonUndoMutation$data;
export type PostLikeButtonUndoMutation = {
  variables: PostLikeButtonUndoMutationVariables;
  response: PostLikeButtonUndoMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "postId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "postId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UndoLikePostPayload",
    "kind": "LinkedField",
    "name": "undoLikePost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "postLikeId",
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
    "name": "PostLikeButtonUndoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostLikeButtonUndoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "46442a2e632818c647dea45c8eaf6766",
    "metadata": {},
    "name": "PostLikeButtonUndoMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "f79b5426f629f58f741d2c013caf301f";

export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 4babf55feb150e59ac42b0e02d92241d */

import { ConcreteRequest } from "relay-runtime";
export type PostLikeButtonUndoMutationVariables = {
    postId: string;
};
export type PostLikeButtonUndoMutationResponse = {
    readonly undoLikePost: {
        readonly postLikeId: string | null;
    } | null;
};
export type PostLikeButtonUndoMutation = {
    readonly response: PostLikeButtonUndoMutationResponse;
    readonly variables: PostLikeButtonUndoMutationVariables;
};



/*
mutation PostLikeButtonUndoMutation(
  $postId: ID!
) {
  undoLikePost(input: {postId: $postId}) {
    postLikeId
  }
}
*/

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
            "name": "postId",
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
    "id": "4babf55feb150e59ac42b0e02d92241d",
    "metadata": {},
    "name": "PostLikeButtonUndoMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'a18fec8f59444e652aa13e9b62d8abe6';
export default node;

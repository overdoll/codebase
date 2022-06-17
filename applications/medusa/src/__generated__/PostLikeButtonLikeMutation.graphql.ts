/**
 * @generated SignedSource<<ef44a6ceecafe83e4a873fc669dc0f78>>
 * @relayHash 02a1a8c01339109de64fe3fa24040481
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 02a1a8c01339109de64fe3fa24040481

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostLikeButtonLikeMutation$variables = {
  postId: string;
};
export type PostLikeButtonLikeMutationVariables = PostLikeButtonLikeMutation$variables;
export type PostLikeButtonLikeMutation$data = {
  readonly likePost: {
    readonly postLike: {
      readonly __typename: string;
    } | null;
  } | null;
};
export type PostLikeButtonLikeMutationResponse = PostLikeButtonLikeMutation$data;
export type PostLikeButtonLikeMutation = {
  variables: PostLikeButtonLikeMutationVariables;
  response: PostLikeButtonLikeMutation$data;
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PostLikeButtonLikeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LikePostPayload",
        "kind": "LinkedField",
        "name": "likePost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostLike",
            "kind": "LinkedField",
            "name": "postLike",
            "plural": false,
            "selections": [
              (v2/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostLikeButtonLikeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LikePostPayload",
        "kind": "LinkedField",
        "name": "likePost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostLike",
            "kind": "LinkedField",
            "name": "postLike",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    "id": "02a1a8c01339109de64fe3fa24040481",
    "metadata": {},
    "name": "PostLikeButtonLikeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "0b73534429aa9406b441bf86e382bbb1";

export default node;

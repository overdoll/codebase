/**
 * @generated SignedSource<<8cfb1a2c47fc22c31da5350bf70f8bf1>>
 * @relayHash 23bd0c2540662c13f85ccaaa247c9305
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 23bd0c2540662c13f85ccaaa247c9305

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostLikeButtonLikeMutation$variables = {
  postId: string;
};
export type PostLikeButtonLikeMutationVariables = PostLikeButtonLikeMutation$variables;
export type PostLikeButtonLikeMutation$data = {
  readonly likePost: {
    readonly postLike: {
      readonly post: {
        readonly viewerLiked: {
          readonly __typename: string;
        } | null;
      };
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
                    "concreteType": "PostLike",
                    "kind": "LinkedField",
                    "name": "viewerLiked",
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
                    "concreteType": "PostLike",
                    "kind": "LinkedField",
                    "name": "viewerLiked",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "23bd0c2540662c13f85ccaaa247c9305",
    "metadata": {},
    "name": "PostLikeButtonLikeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "69bc0fbf3421afc9e0e8989ed040f21b";

export default node;

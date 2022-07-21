/**
 * @generated SignedSource<<dc28864e93d3abdc8cf84705647ecfb7>>
 * @relayHash 98f077f6e9b1f56ef5f9ca9151718e44
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 98f077f6e9b1f56ef5f9ca9151718e44

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LikePostInput = {
  id: string;
};
export type PostLikeWrapperLikeMutation$variables = {
  input: LikePostInput;
};
export type PostLikeWrapperLikeMutation$data = {
  readonly likePost: {
    readonly postLike: {
      readonly __typename: "PostLike";
    } | null;
  } | null;
};
export type PostLikeWrapperLikeMutation = {
  response: PostLikeWrapperLikeMutation$data;
  variables: PostLikeWrapperLikeMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
    "name": "PostLikeWrapperLikeMutation",
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
    "name": "PostLikeWrapperLikeMutation",
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
    "id": "98f077f6e9b1f56ef5f9ca9151718e44",
    "metadata": {},
    "name": "PostLikeWrapperLikeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "1d588adb89a319d86114452478dc5f0a";

export default node;

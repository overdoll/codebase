/**
 * @generated SignedSource<<32e381b6cee73c14c92bf94a10b8e939>>
 * @relayHash 7a2e692fb1223f86d2d3b897c2b62435
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7a2e692fb1223f86d2d3b897c2b62435

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
      readonly id: string;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
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
    "name": "PostLikeWrapperLikeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostLikeWrapperLikeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "7a2e692fb1223f86d2d3b897c2b62435",
    "metadata": {},
    "name": "PostLikeWrapperLikeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "d5982b26746b7ec8ecb490927a818421";

export default node;

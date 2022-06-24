/**
 * @generated SignedSource<<7af2018ed6f38d02fba7e3c734b13b54>>
 * @relayHash 4507276f7be03af7c8648e69f1b14017
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4507276f7be03af7c8648e69f1b14017

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreatePostFlowMutation$variables = {
  clubId: string;
};
export type CreatePostFlowMutation$data = {
  readonly createPost: {
    readonly post: {
      readonly reference: string;
    } | null;
  } | null;
};
export type CreatePostFlowMutation = {
  response: CreatePostFlowMutation$data;
  variables: CreatePostFlowMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clubId"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "clubId",
        "variableName": "clubId"
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
  "name": "reference",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePostFlowMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreatePostPayload",
        "kind": "LinkedField",
        "name": "createPost",
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
    "name": "CreatePostFlowMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreatePostPayload",
        "kind": "LinkedField",
        "name": "createPost",
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
    "id": "4507276f7be03af7c8648e69f1b14017",
    "metadata": {},
    "name": "CreatePostFlowMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a6db6645e4e8be71575635c46dcde872";

export default node;

/**
 * @generated SignedSource<<b16dd8cbf3e6ee6042914da062bb7dae>>
 * @relayHash 08da6b99b7e9bf68e6bd9acdb49c49fe
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 08da6b99b7e9bf68e6bd9acdb49c49fe

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type RemovePostContentInput = {
  contentIds: ReadonlyArray<string>;
  id: string;
};
export type RemovePostContentButtonMutation$variables = {
  input: RemovePostContentInput;
};
export type RemovePostContentButtonMutation$data = {
  readonly removePostContent: {
    readonly post: {
      readonly content: ReadonlyArray<{
        readonly resource: {
          readonly failed: boolean;
          readonly id: string;
          readonly processed: boolean;
          readonly type: ResourceType;
          readonly urls: ReadonlyArray<{
            readonly mimeType: string;
            readonly url: string;
          }>;
        };
      }>;
      readonly id: string;
      readonly reference: string;
    } | null;
  } | null;
};
export type RemovePostContentButtonMutation = {
  response: RemovePostContentButtonMutation$data;
  variables: RemovePostContentButtonMutation$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "resource",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "processed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "failed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "urls",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "mimeType",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemovePostContentButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemovePostContentPayload",
        "kind": "LinkedField",
        "name": "removePostContent",
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PostContent",
                "kind": "LinkedField",
                "name": "content",
                "plural": true,
                "selections": [
                  (v4/*: any*/)
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
    "name": "RemovePostContentButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemovePostContentPayload",
        "kind": "LinkedField",
        "name": "removePostContent",
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PostContent",
                "kind": "LinkedField",
                "name": "content",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
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
    ]
  },
  "params": {
    "id": "08da6b99b7e9bf68e6bd9acdb49c49fe",
    "metadata": {},
    "name": "RemovePostContentButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "3e67d26b64afe017ef017206e7de2e2d";

export default node;

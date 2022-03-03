/**
 * @generated SignedSource<<d63a42860fcf49f18bbc0170580f0854>>
 * @relayHash ddbf1d76d1de80b2332011fd23b8214f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ddbf1d76d1de80b2332011fd23b8214f

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type RemovePostContentInput = {
  contentIds: ReadonlyArray<string>;
  id: string;
};
export type ArrangeUploadsMutation$variables = {
  input: RemovePostContentInput;
};
export type ArrangeUploadsMutationVariables = ArrangeUploadsMutation$variables;
export type ArrangeUploadsMutation$data = {
  readonly removePostContent: {
    readonly post: {
      readonly id: string;
      readonly reference: string;
      readonly content: ReadonlyArray<{
        readonly resource: {
          readonly id: string;
          readonly type: ResourceType;
          readonly processed: boolean;
          readonly urls: ReadonlyArray<{
            readonly url: string;
            readonly mimeType: string;
          }>;
        };
      }>;
    } | null;
  } | null;
};
export type ArrangeUploadsMutationResponse = ArrangeUploadsMutation$data;
export type ArrangeUploadsMutation = {
  variables: ArrangeUploadsMutationVariables;
  response: ArrangeUploadsMutation$data;
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
    "name": "ArrangeUploadsMutation",
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
    "name": "ArrangeUploadsMutation",
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
    "id": "ddbf1d76d1de80b2332011fd23b8214f",
    "metadata": {},
    "name": "ArrangeUploadsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "c99611c34a362066989bcf571cbe4508";

export default node;

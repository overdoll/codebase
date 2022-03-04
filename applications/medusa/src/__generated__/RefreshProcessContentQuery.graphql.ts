/**
 * @generated SignedSource<<9af363340135bb2b91397e1256a6881e>>
 * @relayHash c69acd8b7c7a7bbe19e62275a91e1cdc
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c69acd8b7c7a7bbe19e62275a91e1cdc

import { ConcreteRequest, Query } from 'relay-runtime';
export type RefreshProcessContentQuery$variables = {
  reference: string;
};
export type RefreshProcessContentQueryVariables = RefreshProcessContentQuery$variables;
export type RefreshProcessContentQuery$data = {
  readonly post: {
    readonly id: string;
    readonly reference: string;
    readonly content: ReadonlyArray<{
      readonly id: string;
      readonly resource: {
        readonly processed: boolean;
        readonly videoDuration: number;
        readonly videoThumbnail: {
          readonly url: string;
        } | null;
        readonly urls: ReadonlyArray<{
          readonly mimeType: string;
          readonly url: string;
        }>;
      };
    }>;
  } | null;
};
export type RefreshProcessContentQueryResponse = RefreshProcessContentQuery$data;
export type RefreshProcessContentQuery = {
  variables: RefreshProcessContentQueryVariables;
  response: RefreshProcessContentQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
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
  "kind": "ScalarField",
  "name": "processed",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoDuration",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "videoThumbnail",
  "plural": false,
  "selections": [
    (v6/*: any*/)
  ],
  "storageKey": null
},
v8 = {
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
      "name": "mimeType",
      "storageKey": null
    },
    (v6/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RefreshProcessContentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "resource",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RefreshProcessContentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "resource",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
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
    "id": "c69acd8b7c7a7bbe19e62275a91e1cdc",
    "metadata": {},
    "name": "RefreshProcessContentQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "9cccadf3be01de8b079899f1911344d6";

export default node;

/**
<<<<<<< HEAD
 * @generated SignedSource<<47e4535d7fdfe752440693a5031079a3>>
 * @relayHash fe458110f217192092aa98969f0f8f39
=======
 * @generated SignedSource<<801d1607879fbb113cf1ff0c6ab17e75>>
 * @relayHash 3dcd6dbea1a6016a2cf628d3f919dcee
>>>>>>> master
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

<<<<<<< HEAD
// @relayRequestID fe458110f217192092aa98969f0f8f39
=======
// @relayRequestID 3dcd6dbea1a6016a2cf628d3f919dcee
>>>>>>> master

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
<<<<<<< HEAD
      readonly processed: boolean;
      readonly videoDuration: number;
      readonly videoThumbnail: {
        readonly url: string;
      } | null;
      readonly urls: ReadonlyArray<{
        readonly mimeType: string;
        readonly url: string;
      }>;
=======
      readonly resource: {
        readonly processed: boolean;
      };
>>>>>>> master
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
<<<<<<< HEAD
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "reference",
        "variableName": "reference"
      }
    ],
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "post",
    "plural": false,
=======
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RefreshProcessContentQuery",
>>>>>>> master
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
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "videoDuration",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceUrl",
            "kind": "LinkedField",
            "name": "videoThumbnail",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
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
                "name": "mimeType",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
<<<<<<< HEAD
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RefreshProcessContentQuery",
    "selections": (v3/*: any*/),
=======
>>>>>>> master
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RefreshProcessContentQuery",
<<<<<<< HEAD
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "fe458110f217192092aa98969f0f8f39",
=======
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
    "id": "3dcd6dbea1a6016a2cf628d3f919dcee",
>>>>>>> master
    "metadata": {},
    "name": "RefreshProcessContentQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

<<<<<<< HEAD
(node as any).hash = "038c0aa448f19cc1db944154447ea146";
=======
(node as any).hash = "869952080b2e9cfb54a931d45e857f94";
>>>>>>> master

export default node;

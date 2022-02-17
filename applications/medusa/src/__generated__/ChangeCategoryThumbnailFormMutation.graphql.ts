/**
 * @generated SignedSource<<37bab0d2026f4d78b02eb45e36f46e75>>
 * @relayHash 85da579d43838544cb859c06eaebebc6
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 85da579d43838544cb859c06eaebebc6

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdateCategoryThumbnailInput = {
  id: string;
  thumbnail: string;
};
export type ChangeCategoryThumbnailFormMutation$variables = {
  input: UpdateCategoryThumbnailInput;
};
export type ChangeCategoryThumbnailFormMutationVariables = ChangeCategoryThumbnailFormMutation$variables;
export type ChangeCategoryThumbnailFormMutation$data = {
  readonly updateCategoryThumbnail: {
    readonly category: {
      readonly id: string;
      readonly thumbnail: {
        readonly type: ResourceType;
        readonly urls: ReadonlyArray<{
          readonly url: string;
          readonly mimeType: string;
        }>;
      } | null;
    } | null;
  } | null;
};
export type ChangeCategoryThumbnailFormMutationResponse = ChangeCategoryThumbnailFormMutation$data;
export type ChangeCategoryThumbnailFormMutation = {
  variables: ChangeCategoryThumbnailFormMutationVariables;
  response: ChangeCategoryThumbnailFormMutation$data;
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
  "name": "type",
  "storageKey": null
},
v4 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeCategoryThumbnailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateCategoryThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateCategoryThumbnail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Category",
            "kind": "LinkedField",
            "name": "category",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
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
    "name": "ChangeCategoryThumbnailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateCategoryThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateCategoryThumbnail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Category",
            "kind": "LinkedField",
            "name": "category",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
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
    "id": "85da579d43838544cb859c06eaebebc6",
    "metadata": {},
    "name": "ChangeCategoryThumbnailFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e2ebcd5e38b8f137b76376f83e1f7ace";

export default node;

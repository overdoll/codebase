/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 5ad5fb0fd15f89acb4a7f9867a3f7a74 */

import { ConcreteRequest } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdatePostCategoriesInput = {
    id: string;
    categoryIds: Array<string>;
};
export type UpdateCategoryButtonMutationVariables = {
    input: UpdatePostCategoriesInput;
};
export type UpdateCategoryButtonMutationResponse = {
    readonly updatePostCategories: {
        readonly post: {
            readonly id: string;
            readonly categories: ReadonlyArray<{
                readonly id: string;
                readonly title: string;
                readonly slug: string;
                readonly thumbnail: {
                    readonly type: ResourceType;
                    readonly urls: ReadonlyArray<{
                        readonly mimeType: string;
                        readonly url: string;
                    }>;
                } | null;
            }>;
        } | null;
    } | null;
};
export type UpdateCategoryButtonMutation = {
    readonly response: UpdateCategoryButtonMutationResponse;
    readonly variables: UpdateCategoryButtonMutationVariables;
};



/*
mutation UpdateCategoryButtonMutation(
  $input: UpdatePostCategoriesInput!
) {
  updatePostCategories(input: $input) {
    post {
      id
      categories {
        id
        title
        slug
        thumbnail {
          type
          urls {
            mimeType
            url
          }
          id
        }
      }
    }
  }
}
*/

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
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v6 = {
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
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
    "name": "UpdateCategoryButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdatePostCategoriesPayload",
        "kind": "LinkedField",
        "name": "updatePostCategories",
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
                "concreteType": "Category",
                "kind": "LinkedField",
                "name": "categories",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Resource",
                    "kind": "LinkedField",
                    "name": "thumbnail",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/)
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
    "name": "UpdateCategoryButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdatePostCategoriesPayload",
        "kind": "LinkedField",
        "name": "updatePostCategories",
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
                "concreteType": "Category",
                "kind": "LinkedField",
                "name": "categories",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Resource",
                    "kind": "LinkedField",
                    "name": "thumbnail",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
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
    ]
  },
  "params": {
    "id": "5ad5fb0fd15f89acb4a7f9867a3f7a74",
    "metadata": {},
    "name": "UpdateCategoryButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '465c37370b5643dc645a71dbce126c0c';
export default node;

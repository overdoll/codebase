/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 519d81f1ea9e72c4e805fcabfd4bb10a */

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
                        readonly url: unknown;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Category",
            "kind": "LinkedField",
            "name": "categories",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateCategoryButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateCategoryButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "519d81f1ea9e72c4e805fcabfd4bb10a",
    "metadata": {},
    "name": "UpdateCategoryButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '465c37370b5643dc645a71dbce126c0c';
export default node;

/**
 * @flow
 * @relayHash cf36f820974a3c9facacc19c43dee447
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdatePostCategoriesInput = {|
  id: string,
  categoryIds: $ReadOnlyArray<string>,
|};
export type useUpdateCategoryMutationVariables = {|
  input: UpdatePostCategoriesInput
|};
export type useUpdateCategoryMutationResponse = {|
  +updatePostCategories: ?{|
    +post: ?{|
      +id: string,
      +categories: $ReadOnlyArray<{|
        +id: string,
        +title: string,
        +slug: string,
        +thumbnail: ?{|
          +type: ResourceType,
          +urls: $ReadOnlyArray<{|
            +mimeType: string,
            +url: any,
          |}>,
        |},
      |}>,
    |}
  |}
|};
export type useUpdateCategoryMutation = {|
  variables: useUpdateCategoryMutationVariables,
  response: useUpdateCategoryMutationResponse,
|};


/*
mutation useUpdateCategoryMutation(
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
    "name": "useUpdateCategoryMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateCategoryMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "cf36f820974a3c9facacc19c43dee447",
    "metadata": {},
    "name": "useUpdateCategoryMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '99e406aa281639ca0f29664b540688c9';
module.exports = node;

/**
 * @generated SignedSource<<12e9c10e444c261eab4c99a3071168fc>>
 * @relayHash 0dc33f403b642460e4e18274d1caea66
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0dc33f403b642460e4e18274d1caea66

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdatePostCategoriesInput = {
  categoryIds: ReadonlyArray<string>;
  id: string;
};
export type UpdateCategoryButtonMutation$variables = {
  input: UpdatePostCategoriesInput;
};
export type UpdateCategoryButtonMutation$data = {
  readonly updatePostCategories: {
    readonly post: {
      readonly categories: ReadonlyArray<{
        readonly id: string;
        readonly slug: string;
        readonly title: string;
      }>;
      readonly id: string;
    } | null;
  } | null;
};
export type UpdateCategoryButtonMutation = {
  response: UpdateCategoryButtonMutation$data;
  variables: UpdateCategoryButtonMutation$variables;
};

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
    "id": "0dc33f403b642460e4e18274d1caea66",
    "metadata": {},
    "name": "UpdateCategoryButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "c560d537f2373909ffca828e266d9714";

export default node;

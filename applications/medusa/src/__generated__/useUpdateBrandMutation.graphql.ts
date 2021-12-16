/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 63ee749773a706f92db28613269e1270 */

import { ConcreteRequest } from "relay-runtime";
export type UpdatePostBrandInput = {
    id: string;
    brandId: string;
};
export type useUpdateBrandMutationVariables = {
    input: UpdatePostBrandInput;
};
export type useUpdateBrandMutationResponse = {
    readonly updatePostBrand: {
        readonly post: {
            readonly id: string;
            readonly brand: {
                readonly id: string;
                readonly name: string;
            } | null;
        } | null;
    } | null;
};
export type useUpdateBrandMutation = {
    readonly response: useUpdateBrandMutationResponse;
    readonly variables: useUpdateBrandMutationVariables;
};



/*
mutation useUpdateBrandMutation(
  $input: UpdatePostBrandInput!
) {
  updatePostBrand(input: $input) {
    post {
      id
      brand {
        id
        name
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
    "concreteType": "UpdatePostBrandPayload",
    "kind": "LinkedField",
    "name": "updatePostBrand",
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
            "concreteType": "Brand",
            "kind": "LinkedField",
            "name": "brand",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
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
    "name": "useUpdateBrandMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateBrandMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "63ee749773a706f92db28613269e1270",
    "metadata": {},
    "name": "useUpdateBrandMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '417d000710b784ef98a14b12f161631d';
export default node;

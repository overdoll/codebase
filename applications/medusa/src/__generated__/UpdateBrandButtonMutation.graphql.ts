/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash c7f2732f829de817ddd5e11ac55249dd */

import { ConcreteRequest } from "relay-runtime";
export type UpdatePostBrandInput = {
    id: string;
    brandId: string;
};
export type UpdateBrandButtonMutationVariables = {
    input: UpdatePostBrandInput;
};
export type UpdateBrandButtonMutationResponse = {
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
export type UpdateBrandButtonMutation = {
    readonly response: UpdateBrandButtonMutationResponse;
    readonly variables: UpdateBrandButtonMutationVariables;
};



/*
mutation UpdateBrandButtonMutation(
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
    "name": "UpdateBrandButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateBrandButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "c7f2732f829de817ddd5e11ac55249dd",
    "metadata": {},
    "name": "UpdateBrandButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '8406be183397b42c612b79ad6c6ba26b';
export default node;

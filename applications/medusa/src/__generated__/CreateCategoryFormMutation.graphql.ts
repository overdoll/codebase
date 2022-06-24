/**
 * @generated SignedSource<<ce834583a74d490fbfd15e0c6029f028>>
 * @relayHash 23dfc3141aebab39a7ff92c5c057114f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 23dfc3141aebab39a7ff92c5c057114f

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateCategoryValidation = "SLUG_TAKEN" | "%future added value";
export type CreateCategoryInput = {
  slug: string;
  title: string;
};
export type CreateCategoryFormMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateCategoryInput;
};
export type CreateCategoryFormMutation$data = {
  readonly createCategory: {
    readonly category: {
      readonly id: string;
      readonly slug: string;
      readonly title: string;
    } | null;
    readonly validation: CreateCategoryValidation | null;
  } | null;
};
export type CreateCategoryFormMutation = {
  response: CreateCategoryFormMutation$data;
  variables: CreateCategoryFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Category",
  "kind": "LinkedField",
  "name": "category",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "validation",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateCategoryFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateCategoryPayload",
        "kind": "LinkedField",
        "name": "createCategory",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateCategoryFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateCategoryPayload",
        "kind": "LinkedField",
        "name": "createCategory",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "category",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "createCategoryEdge"
              }
            ]
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "23dfc3141aebab39a7ff92c5c057114f",
    "metadata": {},
    "name": "CreateCategoryFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "646499943cb8db24beea16f824e248db";

export default node;

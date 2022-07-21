/**
 * @generated SignedSource<<c05393a6709daa6f4c1319abb0dcd819>>
 * @relayHash 4ac7165e15ba7ac0ae7dfcf779748890
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4ac7165e15ba7ac0ae7dfcf779748890

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateCategoryValidation = "SLUG_TAKEN" | "%future added value";
export type CreateCategoryInput = {
  slug: string;
  title: string;
  topicId?: string | null;
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
      readonly topic: {
        readonly id: string;
        readonly title: string;
      } | null;
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
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Category",
  "kind": "LinkedField",
  "name": "category",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
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
      "concreteType": "Topic",
      "kind": "LinkedField",
      "name": "topic",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        (v4/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
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
          (v5/*: any*/),
          (v6/*: any*/)
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
          (v5/*: any*/),
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
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "4ac7165e15ba7ac0ae7dfcf779748890",
    "metadata": {},
    "name": "CreateCategoryFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "cbc6e61f5868ebbd7cc98a9a8376fa3a";

export default node;

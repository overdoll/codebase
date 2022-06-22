/**
 * @generated SignedSource<<b09115d6828077dd5ee4a14c0244b890>>
 * @relayHash 269cec9b33c14d80cebaeca7a552aab1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 269cec9b33c14d80cebaeca7a552aab1

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateSeriesValidation = "SLUG_TAKEN" | "%future added value";
export type CreateSeriesInput = {
  slug: string;
  title: string;
};
export type CreateSeriesFormMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateSeriesInput;
};
export type CreateSeriesFormMutation$data = {
  readonly createSeries: {
    readonly series: {
      readonly id: string;
      readonly slug: string;
      readonly title: string;
    } | null;
    readonly validation: CreateSeriesValidation | null;
  } | null;
};
export type CreateSeriesFormMutation = {
  response: CreateSeriesFormMutation$data;
  variables: CreateSeriesFormMutation$variables;
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
  "concreteType": "Series",
  "kind": "LinkedField",
  "name": "series",
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
    "name": "CreateSeriesFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateSeriesPayload",
        "kind": "LinkedField",
        "name": "createSeries",
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
    "name": "CreateSeriesFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateSeriesPayload",
        "kind": "LinkedField",
        "name": "createSeries",
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
            "name": "series",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "createSeriesEdge"
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
    "id": "269cec9b33c14d80cebaeca7a552aab1",
    "metadata": {},
    "name": "CreateSeriesFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "6150d42d15ad81f356fdad62414509df";

export default node;

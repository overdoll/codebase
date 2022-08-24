/**
 * @generated SignedSource<<38cb9036ace5f74fa0e126f19b209f3f>>
 * @relayHash acdb396fbf751a08e02ee86566b2ebbd
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID acdb396fbf751a08e02ee86566b2ebbd

import { ConcreteRequest, Query } from 'relay-runtime';
export type SpinRouletteUpdateQuery$variables = {
  reference: string;
};
export type SpinRouletteUpdateQuery$data = {
  readonly gameSessionStatus: {
    readonly __typename: "RouletteStatus";
    readonly gameSession: {
      readonly id: string;
      readonly isClosed: boolean;
      readonly reference: string;
    };
    readonly score: number;
    readonly totalDoubles: number;
    readonly totalRolls: number;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null;
};
export type SpinRouletteUpdateQuery = {
  response: SpinRouletteUpdateQuery$data;
  variables: SpinRouletteUpdateQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "reference",
        "variableName": "reference"
      }
    ],
    "concreteType": null,
    "kind": "LinkedField",
    "name": "gameSessionStatus",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GameSession",
            "kind": "LinkedField",
            "name": "gameSession",
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
                "name": "reference",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "score",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalDoubles",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalRolls",
            "storageKey": null
          }
        ],
        "type": "RouletteStatus",
        "abstractKey": null
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
    "name": "SpinRouletteUpdateQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SpinRouletteUpdateQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "acdb396fbf751a08e02ee86566b2ebbd",
    "metadata": {},
    "name": "SpinRouletteUpdateQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "9552f7970ee469fa1969c9e8fe953dff";

export default node;

/**
 * @generated SignedSource<<017795692a0eeb483e4bc81a59ce08db>>
 * @relayHash 348f35a71a292178b3b1ca0ba98fb86b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 348f35a71a292178b3b1ca0ba98fb86b

import { ConcreteRequest, Query } from 'relay-runtime';
export type CountriesOptionsQuery$variables = {};
export type CountriesOptionsQueryVariables = CountriesOptionsQuery$variables;
export type CountriesOptionsQuery$data = {
  readonly countries: ReadonlyArray<{
    readonly id: string;
    readonly emoji: string;
    readonly name: string;
  }>;
};
export type CountriesOptionsQueryResponse = CountriesOptionsQuery$data;
export type CountriesOptionsQuery = {
  variables: CountriesOptionsQueryVariables;
  response: CountriesOptionsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Country",
    "kind": "LinkedField",
    "name": "countries",
    "plural": true,
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
        "name": "emoji",
        "storageKey": null
      },
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CountriesOptionsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CountriesOptionsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "348f35a71a292178b3b1ca0ba98fb86b",
    "metadata": {},
    "name": "CountriesOptionsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "cf5295e06cfbb4a4d388f7c24332f234";

export default node;

/**
 * @generated SignedSource<<40c40e8fb4e3815473f673787ed805be>>
 * @relayHash 15182e8e9e125bda5574764aa156047b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 15182e8e9e125bda5574764aa156047b

import { ConcreteRequest, Query } from 'relay-runtime';
export type CountriesOptionsQuery$variables = {};
export type CountriesOptionsQueryVariables = CountriesOptionsQuery$variables;
export type CountriesOptionsQuery$data = {
  readonly countries: ReadonlyArray<{
    readonly id: string;
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
    "id": "15182e8e9e125bda5574764aa156047b",
    "metadata": {},
    "name": "CountriesOptionsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "455409bc39aa517eb8d614623363f29c";

export default node;

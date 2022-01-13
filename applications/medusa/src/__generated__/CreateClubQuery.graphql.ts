/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 804fe907fb28b2a3a8486ac387e04dd1 */

import { ConcreteRequest } from "relay-runtime";
export type CreateClubQueryVariables = {};
export type CreateClubQueryResponse = {
    readonly viewer: {
        readonly clubsLimit: number;
        readonly clubsCount: number;
    } | null;
};
export type CreateClubQuery = {
    readonly response: CreateClubQueryResponse;
    readonly variables: CreateClubQueryVariables;
};



/*
query CreateClubQuery {
  viewer {
    clubsLimit
    clubsCount
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clubsLimit",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clubsCount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateClubQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CreateClubQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "804fe907fb28b2a3a8486ac387e04dd1",
    "metadata": {},
    "name": "CreateClubQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'e90a49fd67094a9cabdc5840f44733c3';
export default node;

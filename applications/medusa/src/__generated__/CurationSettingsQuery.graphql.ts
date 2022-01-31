/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 878fba8266f5f67b58ddbfa3335fd6d7 */

import { ConcreteRequest } from "relay-runtime";
export type CurationSettingsQueryVariables = {};
export type CurationSettingsQueryResponse = {
    readonly viewer: {
        readonly curationProfile: {
            readonly id: string;
            readonly completed: boolean;
        };
    } | null;
};
export type CurationSettingsQuery = {
    readonly response: CurationSettingsQueryResponse;
    readonly variables: CurationSettingsQueryVariables;
};



/*
query CurationSettingsQuery {
  viewer {
    curationProfile {
      id
      completed
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "CurationProfile",
  "kind": "LinkedField",
  "name": "curationProfile",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "completed",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CurationSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
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
    "name": "CurationSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "878fba8266f5f67b58ddbfa3335fd6d7",
    "metadata": {},
    "name": "CurationSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '9807e3b02dab84b1feb7c1513aacb9bc';
export default node;

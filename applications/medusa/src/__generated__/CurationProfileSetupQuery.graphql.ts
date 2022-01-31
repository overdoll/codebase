/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 46a642c8f8426a15eb18818ab35478d8 */

import { ConcreteRequest } from "relay-runtime";
export type CurationProfileSetupQueryVariables = {};
export type CurationProfileSetupQueryResponse = {
    readonly viewer: {
        readonly curationProfile: {
            readonly id: string;
            readonly completed: boolean;
        };
    } | null;
};
export type CurationProfileSetupQuery = {
    readonly response: CurationProfileSetupQueryResponse;
    readonly variables: CurationProfileSetupQueryVariables;
};



/*
query CurationProfileSetupQuery {
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
    "name": "CurationProfileSetupQuery",
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
    "name": "CurationProfileSetupQuery",
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
    "id": "46a642c8f8426a15eb18818ab35478d8",
    "metadata": {},
    "name": "CurationProfileSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '14965aab6b7140143fef64cc1be1ffbe';
export default node;

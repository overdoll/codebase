/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash c6cbdb6e23fc49e1572e646f4a2749c5 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurationProfileSetupQueryVariables = {};
export type CurationProfileSetupQueryResponse = {
    readonly viewer: {
        readonly curationProfile: {
            readonly id: string;
            readonly completed: boolean;
            readonly " $fragmentRefs": FragmentRefs<"DateOfBirthStepFragment">;
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
      ...DateOfBirthStepFragment
    }
    id
  }
}

fragment DateOfBirthStepFragment on CurationProfile {
  dateOfBirth {
    skipped
    completed
    dateOfBirth
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
  "kind": "ScalarField",
  "name": "completed",
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
          {
            "alias": null,
            "args": null,
            "concreteType": "CurationProfile",
            "kind": "LinkedField",
            "name": "curationProfile",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "DateOfBirthStepFragment"
              }
            ],
            "storageKey": null
          }
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
          {
            "alias": null,
            "args": null,
            "concreteType": "CurationProfile",
            "kind": "LinkedField",
            "name": "curationProfile",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "DateOfBirthCurationProfile",
                "kind": "LinkedField",
                "name": "dateOfBirth",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "skipped",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "dateOfBirth",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "c6cbdb6e23fc49e1572e646f4a2749c5",
    "metadata": {},
    "name": "CurationProfileSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'fc324ab027b5d26f40b08df88d4943cf';
export default node;

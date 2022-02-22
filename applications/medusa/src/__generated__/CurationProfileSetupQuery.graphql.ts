/**
 * @generated SignedSource<<ad3744a079d242d09816ac96f7425c41>>
 * @relayHash 7a05033bcbc27033c0ea37e8252be1d3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7a05033bcbc27033c0ea37e8252be1d3

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationProfileSetupQuery$variables = {};
export type CurationProfileSetupQueryVariables = CurationProfileSetupQuery$variables;
export type CurationProfileSetupQuery$data = {
  readonly viewer: {
    readonly curationProfile: {
      readonly completed: boolean;
      readonly dateOfBirth: {
        readonly dateOfBirth: any | null;
      };
      readonly audience: {
        readonly audiences: ReadonlyArray<{
          readonly id: string;
          readonly title: string;
        }>;
      };
      readonly category: {
        readonly categories: ReadonlyArray<{
          readonly id: string;
          readonly title: string;
        }>;
      };
      readonly " $fragmentSpreads": FragmentRefs<"CurationStepperFooterFragment">;
    };
  } | null;
};
export type CurationProfileSetupQueryResponse = CurationProfileSetupQuery$data;
export type CurationProfileSetupQuery = {
  variables: CurationProfileSetupQueryVariables;
  response: CurationProfileSetupQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completed",
  "storageKey": null
},
v1 = {
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
      "name": "dateOfBirth",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "AudienceCurationProfile",
  "kind": "LinkedField",
  "name": "audience",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audiences",
      "plural": true,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "CategoryCurationProfile",
  "kind": "LinkedField",
  "name": "category",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
      "selections": (v3/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "concreteType": "CurationProfile",
            "kind": "LinkedField",
            "name": "curationProfile",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CurationStepperFooterFragment"
              },
              (v0/*: any*/),
              (v1/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
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
              (v1/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v0/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "7a05033bcbc27033c0ea37e8252be1d3",
    "metadata": {},
    "name": "CurationProfileSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "ab6c7b80fb0075f7d293c77c545af368";

export default node;

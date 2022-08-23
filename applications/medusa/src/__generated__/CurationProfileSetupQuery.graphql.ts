/**
 * @generated SignedSource<<9a30d8e7625dc59e409a0283d08df52b>>
 * @relayHash 7499d691b047ccd34d839d5ac5d9ac59
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7499d691b047ccd34d839d5ac5d9ac59

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationProfileSetupQuery$variables = {};
export type CurationProfileSetupQuery$data = {
  readonly viewer: {
    readonly curationProfile: {
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
      readonly completed: boolean;
      readonly dateOfBirth: {
        readonly dateOfBirth: any | null;
      };
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"CurationStepperFooterFragment">;
    };
  } | null;
};
export type CurationProfileSetupQuery = {
  response: CurationProfileSetupQuery$data;
  variables: CurationProfileSetupQuery$variables;
};

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
},
v2 = {
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
v3 = [
  (v0/*: any*/),
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
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CurationStepperFooterFragment"
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
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
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
    "id": "7499d691b047ccd34d839d5ac5d9ac59",
    "metadata": {},
    "name": "CurationProfileSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "9eaac14fc99e64b79233a3541a27e4b2";

export default node;

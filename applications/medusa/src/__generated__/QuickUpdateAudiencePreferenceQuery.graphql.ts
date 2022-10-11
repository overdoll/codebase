/**
 * @generated SignedSource<<594a07e4151a992e05f412b8fd73e697>>
 * @relayHash 6f395e185d3c7c5319903834ea5de354
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6f395e185d3c7c5319903834ea5de354

import { ConcreteRequest, Query } from 'relay-runtime';
export type QuickUpdateAudiencePreferenceQuery$variables = {};
export type QuickUpdateAudiencePreferenceQuery$data = {
  readonly viewer: {
    readonly curationProfile: {
      readonly audience: {
        readonly audiences: ReadonlyArray<{
          readonly id: string;
          readonly title: string;
        }>;
      };
    };
  } | null;
};
export type QuickUpdateAudiencePreferenceQuery = {
  response: QuickUpdateAudiencePreferenceQuery$data;
  variables: QuickUpdateAudiencePreferenceQuery$variables;
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
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
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
    "name": "QuickUpdateAudiencePreferenceQuery",
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
              (v1/*: any*/)
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
    "name": "QuickUpdateAudiencePreferenceQuery",
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
              (v0/*: any*/)
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
    "id": "6f395e185d3c7c5319903834ea5de354",
    "metadata": {},
    "name": "QuickUpdateAudiencePreferenceQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "6490497cbbb2e2462580bd70042328ad";

export default node;

/**
 * @generated SignedSource<<d38e4f2954e9cfde9deecf86baa7153a>>
 * @relayHash 704fdc15256d93a75db0cbbb720e230e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 704fdc15256d93a75db0cbbb720e230e

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffSearchRulesQuery$variables = {};
export type StaffSearchRulesQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StaffSearchRulesFragment">;
};
export type StaffSearchRulesQuery = {
  response: StaffSearchRulesQuery$data;
  variables: StaffSearchRulesQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffSearchRulesQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "StaffSearchRulesFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "StaffSearchRulesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RuleConnection",
        "kind": "LinkedField",
        "name": "rules",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RuleEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Rule",
                "kind": "LinkedField",
                "name": "node",
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
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "filters": null,
        "handle": "connection",
        "key": "StaffRulesConnection_rules",
        "kind": "LinkedHandle",
        "name": "rules"
      }
    ]
  },
  "params": {
    "id": "704fdc15256d93a75db0cbbb720e230e",
    "metadata": {},
    "name": "StaffSearchRulesQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "04408bc06d5bc4bc3b946886f7ae41b0";

export default node;

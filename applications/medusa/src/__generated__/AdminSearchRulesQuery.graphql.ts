/**
 * @generated SignedSource<<b03e60590bde5be62f0adc09c76ef97d>>
 * @relayHash 02e2f74e9c33600cf9bc185d9093c15d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 02e2f74e9c33600cf9bc185d9093c15d

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminSearchRulesQuery$variables = {};
export type AdminSearchRulesQueryVariables = AdminSearchRulesQuery$variables;
export type AdminSearchRulesQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AdminSearchRulesFragment">;
};
export type AdminSearchRulesQueryResponse = AdminSearchRulesQuery$data;
export type AdminSearchRulesQuery = {
  variables: AdminSearchRulesQueryVariables;
  response: AdminSearchRulesQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminSearchRulesQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "AdminSearchRulesFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AdminSearchRulesQuery",
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
                    "name": "id",
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
        "key": "AdminRulesConnection_rules",
        "kind": "LinkedHandle",
        "name": "rules"
      }
    ]
  },
  "params": {
    "id": "02e2f74e9c33600cf9bc185d9093c15d",
    "metadata": {},
    "name": "AdminSearchRulesQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "6ccd4c21c731930f92b71ac80582077c";

export default node;

/**
 * @generated SignedSource<<c4861cbf1b91a48bf12b61b4558b952f>>
 * @relayHash eb7c9bb5a34245881e881b0c3e64528b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID eb7c9bb5a34245881e881b0c3e64528b

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DisposeStaffClubsQuery$variables = {
  name?: string | null;
};
export type DisposeStaffClubsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ResultStaffClubsFragment">;
};
export type DisposeStaffClubsQuery = {
  response: DisposeStaffClubsQuery$data;
  variables: DisposeStaffClubsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = {
  "kind": "Variable",
  "name": "name",
  "variableName": "name"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DisposeStaffClubsQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ResultStaffClubsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DisposeStaffClubsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ClubConnection",
        "kind": "LinkedField",
        "name": "clubs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
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
                    "name": "name",
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
                    "name": "slug",
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
        "args": (v2/*: any*/),
        "filters": [
          "name"
        ],
        "handle": "connection",
        "key": "ResultStaffClubsConnection_clubs",
        "kind": "LinkedHandle",
        "name": "clubs"
      }
    ]
  },
  "params": {
    "id": "eb7c9bb5a34245881e881b0c3e64528b",
    "metadata": {},
    "name": "DisposeStaffClubsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "91954e551158932d6fc8fed32d0c5a95";

export default node;

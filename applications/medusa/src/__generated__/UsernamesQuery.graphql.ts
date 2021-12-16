/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 6fdd71db6b8be5a80b955e67dd5659b9 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UsernamesQueryVariables = {
    first?: number | null | undefined;
};
export type UsernamesQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"UsernamesSettingsFragment">;
    } | null;
};
export type UsernamesQuery = {
    readonly response: UsernamesQueryResponse;
    readonly variables: UsernamesQueryVariables;
};



/*
query UsernamesQuery(
  $first: Int
) {
  viewer {
    ...UsernamesSettingsFragment
    id
  }
}

fragment UsernamesSettingsFragment on Account {
  username
  usernames(first: $first) {
    edges {
      node {
        username
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsernamesQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "UsernamesSettingsFragment"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsernamesQuery",
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
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "AccountUsernameConnection",
            "kind": "LinkedField",
            "name": "usernames",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AccountUsernameEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AccountUsername",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v3/*: any*/),
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
              },
              {
                "kind": "ClientExtension",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__id",
                    "storageKey": null
                  }
                ]
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "UsernamesSettingsFragment_usernames",
            "kind": "LinkedHandle",
            "name": "usernames"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "6fdd71db6b8be5a80b955e67dd5659b9",
    "metadata": {},
    "name": "UsernamesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '55b4b82bf6b6fc004e5ca92273a7d969';
export default node;

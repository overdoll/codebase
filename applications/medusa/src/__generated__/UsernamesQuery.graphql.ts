<<<<<<< HEAD:applications/medusa/src/__generated__/UsernamesQuery.graphql.js
/**
 * @flow
 * @relayHash 8236bfe9d667180e0daecf28e6693652
 */

=======
/* tslint:disable */
>>>>>>> master:applications/medusa/src/__generated__/UsernamesQuery.graphql.ts
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

<<<<<<< HEAD:applications/medusa/src/__generated__/UsernamesQuery.graphql.js
import type { ConcreteRequest } from 'relay-runtime';
import type { UsernamesSettingsFragment$ref } from "./UsernamesSettingsFragment.graphql";
export type UsernamesQueryVariables = {|
  first?: ?number
|};
export type UsernamesQueryResponse = {|
  +viewer: ?{|
    +usernamesLimit: number,
    +$fragmentRefs: UsernamesSettingsFragment$ref,
  |}
|};
export type UsernamesQuery = {|
  variables: UsernamesQueryVariables,
  response: UsernamesQueryResponse,
|};
=======
>>>>>>> master:applications/medusa/src/__generated__/UsernamesQuery.graphql.ts


/*
query UsernamesQuery(
  $first: Int
) {
  viewer {
    ...UsernamesSettingsFragment
    usernamesLimit
    id
  }
}

fragment UsernameAliasCard on AccountUsername {
  id
  username
}

fragment UsernamesSettingsFragment on Account {
  username
  usernames(first: $first) {
    edges {
      node {
        username
        ...UsernameAliasCard
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
  "name": "usernamesLimit",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v4 = {
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
          (v1/*: any*/),
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
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
                      (v2/*: any*/),
                      (v4/*: any*/),
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
            "args": (v3/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "UsernamesSettingsFragment_usernames",
            "kind": "LinkedHandle",
            "name": "usernames"
          },
          (v1/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "8236bfe9d667180e0daecf28e6693652",
    "metadata": {},
    "name": "UsernamesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
<<<<<<< HEAD:applications/medusa/src/__generated__/UsernamesQuery.graphql.js
// prettier-ignore
(node: any).hash = '16ae99eac1572a04a2d01555a46f28c5';
module.exports = node;
=======
(node as any).hash = '55b4b82bf6b6fc004e5ca92273a7d969';
export default node;
>>>>>>> master:applications/medusa/src/__generated__/UsernamesQuery.graphql.ts

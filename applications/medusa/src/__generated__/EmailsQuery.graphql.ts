<<<<<<< HEAD:applications/medusa/src/__generated__/EmailsQuery.graphql.js
/**
 * @flow
 * @relayHash a516d9806a1edda7403c4fadd48b96ca
 */

=======
/* tslint:disable */
>>>>>>> master:applications/medusa/src/__generated__/EmailsQuery.graphql.ts
/* eslint-disable */
// @ts-nocheck
/* @relayHash f9be5875e86fa71d29040ea7a5daa5bd */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EmailsQueryVariables = {};
export type EmailsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"EmailsSettingsFragment">;
    } | null;
};
export type EmailsQuery = {
    readonly response: EmailsQueryResponse;
    readonly variables: EmailsQueryVariables;
};

<<<<<<< HEAD:applications/medusa/src/__generated__/EmailsQuery.graphql.js
import type { ConcreteRequest } from 'relay-runtime';
import type { EmailsSettingsFragment$ref } from "./EmailsSettingsFragment.graphql";
export type EmailsQueryVariables = {||};
export type EmailsQueryResponse = {|
  +viewer: ?{|
    +emailsLimit: number,
    +$fragmentRefs: EmailsSettingsFragment$ref,
  |}
|};
export type EmailsQuery = {|
  variables: EmailsQueryVariables,
  response: EmailsQueryResponse,
|};
=======
>>>>>>> master:applications/medusa/src/__generated__/EmailsQuery.graphql.ts


/*
query EmailsQuery {
  viewer {
    ...EmailsSettingsFragment
    emailsLimit
    id
  }
}

fragment DeleteFragment on AccountEmail {
  id
  email
}

fragment EmailCardFragment on AccountEmail {
  ...DeleteFragment
  ...MakePrimaryFragment
  email
  status
}

fragment EmailsSettingsFragment on Account {
  emails(first: 5) {
    edges {
      node {
        ...EmailCardFragment
        status
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
  id
}

fragment MakePrimaryFragment on AccountEmail {
  id
  email
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "emailsLimit",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EmailsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EmailsSettingsFragment"
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
    "name": "EmailsQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "AccountEmailConnection",
            "kind": "LinkedField",
            "name": "emails",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AccountEmailEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AccountEmail",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "email",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
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
            "storageKey": "emails(first:5)"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "EmailsSettingsFragment_emails",
            "kind": "LinkedHandle",
            "name": "emails"
          },
          (v2/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "a516d9806a1edda7403c4fadd48b96ca",
    "metadata": {},
    "name": "EmailsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
<<<<<<< HEAD:applications/medusa/src/__generated__/EmailsQuery.graphql.js
// prettier-ignore
(node: any).hash = '54c667dc8800618fc0ee75cf884ffa56';
module.exports = node;
=======
(node as any).hash = '79d7c5220cb84bef2977b5f3d3fd23a8';
export default node;
>>>>>>> master:applications/medusa/src/__generated__/EmailsQuery.graphql.ts

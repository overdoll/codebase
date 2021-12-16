<<<<<<< HEAD:applications/medusa/src/__generated__/EmailsSettingsPaginationQuery.graphql.js
/**
 * @flow
 * @relayHash b8a050d5b709f771a1a0e52b957919fc
 */

=======
/* tslint:disable */
>>>>>>> master:applications/medusa/src/__generated__/EmailsSettingsPaginationQuery.graphql.ts
/* eslint-disable */
// @ts-nocheck
/* @relayHash 77b121a45a09c73a4032c34a97eebe8f */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EmailsSettingsPaginationQueryVariables = {
    after?: string | null | undefined;
    first?: number | null | undefined;
    id: string;
};
export type EmailsSettingsPaginationQueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"EmailsSettingsFragment">;
    } | null;
};
export type EmailsSettingsPaginationQuery = {
    readonly response: EmailsSettingsPaginationQueryResponse;
    readonly variables: EmailsSettingsPaginationQueryVariables;
};



/*
query EmailsSettingsPaginationQuery(
  $after: String
  $first: Int = 5
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...EmailsSettingsFragment_2HEEH6
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

fragment EmailsSettingsFragment_2HEEH6 on Account {
  emails(first: $first, after: $after) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 5,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
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
  "name": "__typename",
  "storageKey": null
},
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
    "name": "EmailsSettingsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v2/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EmailsSettingsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
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
                          (v4/*: any*/),
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
                          (v3/*: any*/)
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
                "key": "EmailsSettingsFragment_emails",
                "kind": "LinkedHandle",
                "name": "emails"
              }
            ],
            "type": "Account",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "b8a050d5b709f771a1a0e52b957919fc",
    "metadata": {},
    "name": "EmailsSettingsPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
<<<<<<< HEAD:applications/medusa/src/__generated__/EmailsSettingsPaginationQuery.graphql.js
// prettier-ignore
(node: any).hash = '61647e9f7d6b3b803b4605825e973488';
module.exports = node;
=======
(node as any).hash = 'aaf30d0896133f4e181ed743d2bf61ef';
export default node;
>>>>>>> master:applications/medusa/src/__generated__/EmailsSettingsPaginationQuery.graphql.ts

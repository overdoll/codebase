/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AuditLogsFragment$ref: FragmentReference;
declare export opaque type AuditLogsFragment$fragmentType: AuditLogsFragment$ref;
export type AuditLogsPaginationQueryVariables = {|
  after?: ?string,
  first?: ?number,
  id: string,
|};
export type AuditLogsPaginationQueryResponse = {|
  +node: ?{|
    +$fragmentRefs: AuditLogsFragment$ref
  |}
|};
export type AuditLogsPaginationQuery = {|
  variables: AuditLogsPaginationQueryVariables,
  response: AuditLogsPaginationQueryResponse,
|};


/*
query AuditLogsPaginationQuery(
  $after: String
  $first: Int = 5
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...AuditLogsFragment_2HEEH6
    id
  }
}

fragment AuditCardFragment on PostAuditLog {
  reverted
  reversibleUntil
  contributor {
    username
    id
  }
  post {
    postedAt
    id
  }
  action
}

fragment AuditInspectFragment on PostAuditLog {
  id
  notes
  reverted
  reversibleUntil
  action
  post {
    ...PostPreviewFragment
    id
  }
}

fragment AuditLogsFragment_2HEEH6 on Account {
  moderatorPostAuditLogs(first: $first, after: $after, dateRange: {from: 0, to: 0}) {
    edges {
      node {
        ...AuditCardFragment
        ...AuditInspectFragment
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

fragment PostArtistFragment on Post {
  brand {
    name
    id
  }
}

fragment PostCategoriesFragment on Post {
  categories {
    title
    id
  }
}

fragment PostCharactersFragment on Post {
  characters {
    name
    series {
      title
      id
    }
    id
  }
}

fragment PostContentFragment on Post {
  content {
    urls {
      url
    }
  }
}

fragment PostPreviewFragment on Post {
  ...PostContentFragment
  ...PostArtistFragment
  ...PostCharactersFragment
  ...PostCategoriesFragment
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
v2 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v3 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "dateRange",
    "value": {
      "from": 0,
      "to": 0
    }
  },
  (v3/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  },
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuditLogsPaginationQuery",
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
            "args": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "AuditLogsFragment"
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
    "name": "AuditLogsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "PostAuditLogConnection",
                "kind": "LinkedField",
                "name": "moderatorPostAuditLogs",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PostAuditLogEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PostAuditLog",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "reverted",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "reversibleUntil",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Account",
                            "kind": "LinkedField",
                            "name": "contributor",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "username",
                                "storageKey": null
                              },
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Post",
                            "kind": "LinkedField",
                            "name": "post",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "postedAt",
                                "storageKey": null
                              },
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Resource",
                                "kind": "LinkedField",
                                "name": "content",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ResourceUrl",
                                    "kind": "LinkedField",
                                    "name": "urls",
                                    "plural": true,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "url",
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
                                "concreteType": "Brand",
                                "kind": "LinkedField",
                                "name": "brand",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/),
                                  (v5/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Character",
                                "kind": "LinkedField",
                                "name": "characters",
                                "plural": true,
                                "selections": [
                                  (v7/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Series",
                                    "kind": "LinkedField",
                                    "name": "series",
                                    "plural": false,
                                    "selections": (v8/*: any*/),
                                    "storageKey": null
                                  },
                                  (v5/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Category",
                                "kind": "LinkedField",
                                "name": "categories",
                                "plural": true,
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "action",
                            "storageKey": null
                          },
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "notes",
                            "storageKey": null
                          },
                          (v4/*: any*/)
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
                "args": (v6/*: any*/),
                "filters": [
                  "dateRange"
                ],
                "handle": "connection",
                "key": "AuditLogs_moderatorPostAuditLogs",
                "kind": "LinkedHandle",
                "name": "moderatorPostAuditLogs"
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
    "cacheID": "422c803ce92d977af61493e208ea44fa",
    "id": null,
    "metadata": {},
    "name": "AuditLogsPaginationQuery",
    "operationKind": "query",
    "text": "query AuditLogsPaginationQuery(\n  $after: String\n  $first: Int = 5\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...AuditLogsFragment_2HEEH6\n    id\n  }\n}\n\nfragment AuditCardFragment on PostAuditLog {\n  reverted\n  reversibleUntil\n  contributor {\n    username\n    id\n  }\n  post {\n    postedAt\n    id\n  }\n  action\n}\n\nfragment AuditInspectFragment on PostAuditLog {\n  id\n  notes\n  reverted\n  reversibleUntil\n  action\n  post {\n    ...PostPreviewFragment\n    id\n  }\n}\n\nfragment AuditLogsFragment_2HEEH6 on Account {\n  moderatorPostAuditLogs(first: $first, after: $after, dateRange: {from: 0, to: 0}) {\n    edges {\n      node {\n        ...AuditCardFragment\n        ...AuditInspectFragment\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment PostArtistFragment on Post {\n  brand {\n    name\n    id\n  }\n}\n\nfragment PostCategoriesFragment on Post {\n  categories {\n    title\n    id\n  }\n}\n\nfragment PostCharactersFragment on Post {\n  characters {\n    name\n    series {\n      title\n      id\n    }\n    id\n  }\n}\n\nfragment PostContentFragment on Post {\n  content {\n    urls {\n      url\n    }\n  }\n}\n\nfragment PostPreviewFragment on Post {\n  ...PostContentFragment\n  ...PostArtistFragment\n  ...PostCharactersFragment\n  ...PostCategoriesFragment\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '9ee7e0baa40cec68cbced30acbca8b46';
module.exports = node;

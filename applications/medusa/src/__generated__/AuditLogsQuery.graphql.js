/**
 * @flow
<<<<<<< HEAD
 * @relayHash 3bb9f6305cd465ea00be8c2f639551a7
=======
 * @relayHash 2c337a39e6f6890b8b343351271de229
>>>>>>> master
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { AuditLogsFragment$ref } from "./AuditLogsFragment.graphql";
export type AuditLogsQueryVariables = {|
  from: any,
  to: any,
|};
export type AuditLogsQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: AuditLogsFragment$ref
  |}
|};
export type AuditLogsQuery = {|
  variables: AuditLogsQueryVariables,
  response: AuditLogsQueryResponse,
|};


/*
query AuditLogsQuery(
  $from: Time!
  $to: Time!
) {
  viewer {
    ...AuditLogsFragment
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

fragment AuditLogsFragment on Account {
<<<<<<< HEAD
  moderatorPostAuditLogs(first: 5, dateRange: {from: $from, to: $to}) {
=======
  moderatorPostAuditLogs(first: 5, dateRange: {from: 0, to: 0}) {
>>>>>>> master
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

fragment PostAudienceFragment on Post {
  audience {
    title
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

fragment PostGalleryContentFragment on Post {
  content {
    type
    urls {
      url
      mimeType
    }
  }
}

fragment PostPreviewFragment on Post {
  ...PostAudienceFragment
  ...PostCharactersFragment
  ...PostCategoriesFragment
  ...PostGalleryContentFragment
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "from"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "to"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "from",
        "variableName": "from"
      },
      {
        "kind": "Variable",
        "name": "to",
        "variableName": "to"
      }
    ],
    "kind": "ObjectValue",
    "name": "dateRange"
  },
  {
    "kind": "Literal",
    "name": "dateRange",
    "value": {
      "from": 0,
      "to": 0
    }
  },
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
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  },
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuditLogsQuery",
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
    "name": "AuditLogsQuery",
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
                          (v2/*: any*/)
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
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Audience",
                            "kind": "LinkedField",
                            "name": "audience",
                            "plural": false,
                            "selections": (v3/*: any*/),
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
                                "concreteType": "Series",
                                "kind": "LinkedField",
                                "name": "series",
                                "plural": false,
                                "selections": (v3/*: any*/),
                                "storageKey": null
                              },
                              (v2/*: any*/)
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
                            "selections": (v3/*: any*/),
                            "storageKey": null
                          },
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
                                "kind": "ScalarField",
                                "name": "type",
                                "storageKey": null
                              },
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
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "mimeType",
                                    "storageKey": null
                                  }
                                ],
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
                        "kind": "ScalarField",
                        "name": "action",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "notes",
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
<<<<<<< HEAD
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
=======
            "storageKey": "moderatorPostAuditLogs(dateRange:{\"from\":0,\"to\":0},first:5)"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
>>>>>>> master
            "filters": [
              "dateRange"
            ],
            "handle": "connection",
            "key": "AuditLogs_moderatorPostAuditLogs",
            "kind": "LinkedHandle",
            "name": "moderatorPostAuditLogs"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
<<<<<<< HEAD
    "id": "3bb9f6305cd465ea00be8c2f639551a7",
=======
    "id": "2c337a39e6f6890b8b343351271de229",
>>>>>>> master
    "metadata": {},
    "name": "AuditLogsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '1de298e271d59f231bb8e9f60082640d';
module.exports = node;

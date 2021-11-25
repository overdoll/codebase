/**
 * @flow
<<<<<<< HEAD
 * @relayHash 10c99719d0d0b1e6de15d290923dffb7
=======
 * @relayHash 422c803ce92d977af61493e208ea44fa
>>>>>>> master
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
  from: any,
  to: any,
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
  $from: Time!
  $to: Time!
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
<<<<<<< HEAD
  moderatorPostAuditLogs(first: $first, after: $after, dateRange: {from: $from, to: $to}) {
=======
  moderatorPostAuditLogs(first: $first, after: $after, dateRange: {from: 0, to: 0}) {
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": 5,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "from"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "to"
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
<<<<<<< HEAD
v6 = {
=======
v2 = {
>>>>>>> master
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
<<<<<<< HEAD
v7 = {
=======
v3 = {
>>>>>>> master
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
<<<<<<< HEAD
v8 = {
=======
v4 = {
>>>>>>> master
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
<<<<<<< HEAD
v9 = {
=======
v5 = {
>>>>>>> master
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
<<<<<<< HEAD
v10 = [
  (v6/*: any*/),
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
  (v7/*: any*/)
],
v11 = [
=======
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
>>>>>>> master
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  },
<<<<<<< HEAD
  (v9/*: any*/)
=======
  (v5/*: any*/)
>>>>>>> master
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuditLogsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
<<<<<<< HEAD
              (v6/*: any*/),
              (v7/*: any*/)
=======
              (v2/*: any*/),
              (v3/*: any*/)
>>>>>>> master
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "AuditLogsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
<<<<<<< HEAD
          (v8/*: any*/),
          (v9/*: any*/),
=======
          (v4/*: any*/),
          (v5/*: any*/),
>>>>>>> master
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
<<<<<<< HEAD
                "args": (v10/*: any*/),
=======
                "args": (v6/*: any*/),
>>>>>>> master
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
<<<<<<< HEAD
                              (v9/*: any*/)
=======
                              (v5/*: any*/)
>>>>>>> master
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
<<<<<<< HEAD
                              (v9/*: any*/),
=======
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
>>>>>>> master
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Audience",
                                "kind": "LinkedField",
                                "name": "audience",
                                "plural": false,
<<<<<<< HEAD
                                "selections": (v11/*: any*/),
=======
                                "selections": [
                                  (v7/*: any*/),
                                  (v5/*: any*/)
                                ],
>>>>>>> master
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
<<<<<<< HEAD
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "name",
                                    "storageKey": null
                                  },
=======
                                  (v7/*: any*/),
>>>>>>> master
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Series",
                                    "kind": "LinkedField",
                                    "name": "series",
                                    "plural": false,
<<<<<<< HEAD
                                    "selections": (v11/*: any*/),
                                    "storageKey": null
                                  },
                                  (v9/*: any*/)
=======
                                    "selections": (v8/*: any*/),
                                    "storageKey": null
                                  },
                                  (v5/*: any*/)
>>>>>>> master
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
<<<<<<< HEAD
                                "selections": (v11/*: any*/),
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
=======
                                "selections": (v8/*: any*/),
>>>>>>> master
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
<<<<<<< HEAD
                          (v9/*: any*/),
=======
                          (v5/*: any*/),
>>>>>>> master
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "notes",
                            "storageKey": null
                          },
<<<<<<< HEAD
                          (v8/*: any*/)
=======
                          (v4/*: any*/)
>>>>>>> master
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
<<<<<<< HEAD
                "args": (v10/*: any*/),
=======
                "args": (v6/*: any*/),
>>>>>>> master
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
<<<<<<< HEAD
    "id": "10c99719d0d0b1e6de15d290923dffb7",
=======
    "id": "422c803ce92d977af61493e208ea44fa",
>>>>>>> master
    "metadata": {},
    "name": "AuditLogsPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
<<<<<<< HEAD
(node: any).hash = '2a7defa328f720c02ce519209fd2ec32';
=======
(node: any).hash = '9ee7e0baa40cec68cbced30acbca8b46';
>>>>>>> master
module.exports = node;

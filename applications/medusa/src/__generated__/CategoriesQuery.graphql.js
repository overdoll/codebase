/**
 * @flow
 * @relayHash 367dffd92f0c7f7d05b758b46be11ced
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CategoriesQueryVariables = {|
  title?: ?string
|};
export type CategoriesQueryResponse = {|
  +categories: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +title: string,
        +thumbnail: any,
      |}
    |}>
  |}
|};
export type CategoriesQuery = {|
  variables: CategoriesQueryVariables,
  response: CategoriesQueryResponse,
|};


/*
query CategoriesQuery(
  $title: String
) {
  categories(title: $title) {
    edges {
      node {
        id
        title
        thumbnail
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "title"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
    "concreteType": "CategoryConnection",
    "kind": "LinkedField",
    "name": "categories",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CategoryEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Category",
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
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "thumbnail",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoriesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoriesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "367dffd92f0c7f7d05b758b46be11ced",
    "metadata": {},
    "name": "CategoriesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '4dbef2b069e47ba1a1b9289c910e1fdb';
module.exports = node;

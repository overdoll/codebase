/**
 * @flow
 * @relayHash 89bd7423a89efb2a1e9f8fb61e57b15e
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MediaQueryVariables = {|
  title?: ?string
|};
export type MediaQueryResponse = {|
  +medias: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +title: string,
        +thumbnail: any,
      |}
    |}>
  |}
|};
export type MediaQuery = {|
  variables: MediaQueryVariables,
  response: MediaQueryResponse,
|};


/*
query MediaQuery(
  $title: String
) {
  medias(title: $title) {
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
    "concreteType": "MediaConnection",
    "kind": "LinkedField",
    "name": "medias",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MediaEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Media",
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
    "name": "MediaQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MediaQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "89bd7423a89efb2a1e9f8fb61e57b15e",
    "metadata": {},
    "name": "MediaQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '628e576461798455e8e5f27e867fa866';
module.exports = node;

/**
 * @flow
 * @relayHash 8013fdfdc81e54de7f24b2e6069d97a9
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CharactersQueryVariables = {|
  name: string
|};
export type CharactersQueryResponse = {|
  +characters: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +name: string,
        +thumbnail: any,
        +media: {|
          +id: string,
          +title: string,
          +thumbnail: any,
        |},
      |}
    |}>
  |}
|};
export type CharactersQuery = {|
  variables: CharactersQueryVariables,
  response: CharactersQueryResponse,
|};


/*
query CharactersQuery(
  $name: String!
) {
  characters(name: $name) {
    edges {
      node {
        id
        name
        thumbnail
        media {
          id
          title
          thumbnail
        }
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
    "name": "name"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbnail",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "concreteType": "CharacterConnection",
    "kind": "LinkedField",
    "name": "characters",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CharacterEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Media",
                "kind": "LinkedField",
                "name": "media",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
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
    "name": "CharactersQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CharactersQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "8013fdfdc81e54de7f24b2e6069d97a9",
    "metadata": {},
    "name": "CharactersQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '98fac9c62ff0a1a2825fac9b3e6f969d';
module.exports = node;

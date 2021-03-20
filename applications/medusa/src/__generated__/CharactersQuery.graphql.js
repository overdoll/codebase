/**
 * @flow
 * @relayHash 95c7173f7ace68e89c3301fac043b20b
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SearchInput = {|
  search: string
|};
export type CharactersQueryVariables = {|
  data: SearchInput
|};
export type CharactersQueryResponse = {|
  +characters: $ReadOnlyArray<{|
    +id: string,
    +name: string,
    +thumbnail: string,
    +media: {|
      +id: string,
      +title: string,
      +thumbnail: ?string,
    |},
  |}>
|};
export type CharactersQuery = {|
  variables: CharactersQueryVariables,
  response: CharactersQueryResponse,
|};


/*
query CharactersQuery(
  $data: SearchInput!
) {
  characters(data: $data) {
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data"
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
        "name": "data",
        "variableName": "data"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "characters",
    "plural": true,
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
    "id": "95c7173f7ace68e89c3301fac043b20b",
    "metadata": {},
    "name": "CharactersQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'd8306e47d17867c6d5b96a46cc8abed4';
module.exports = node;

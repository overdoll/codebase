/**
 * @flow
 * @relayHash c580e2ec639f896f6891e72f4ce5bb53
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SearchInput = {|
  search: string
|};
export type MediaQueryVariables = {|
  data: SearchInput
|};
export type MediaQueryResponse = {|
  +media: $ReadOnlyArray<{|
    +id: string,
    +title: string,
    +thumbnail: string,
  |}>
|};
export type MediaQuery = {|
  variables: MediaQueryVariables,
  response: MediaQueryResponse,
|};


/*
query MediaQuery(
  $data: SearchInput!
) {
  media(data: $data) {
    id
    title
    thumbnail
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
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "data"
      }
    ],
    "concreteType": "Media",
    "kind": "LinkedField",
    "name": "media",
    "plural": true,
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
    "id": "c580e2ec639f896f6891e72f4ce5bb53",
    "metadata": {},
    "name": "MediaQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '23dc589863175c92283325a47d4ccaf6';
module.exports = node;

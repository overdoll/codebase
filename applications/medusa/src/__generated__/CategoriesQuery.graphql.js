/**
 * @flow
 * @relayHash 9c029d9eeba88719a2ec4eda2e6f1d8c
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SearchInput = {|
  search: string
|};
export type CategoriesQueryVariables = {|
  data: SearchInput
|};
export type CategoriesQueryResponse = {|
  +categories: $ReadOnlyArray<{|
    +id: string,
    +title: string,
    +thumbnail: string,
  |}>
|};
export type CategoriesQuery = {|
  variables: CategoriesQueryVariables,
  response: CategoriesQueryResponse,
|};


/*
query CategoriesQuery(
  $data: SearchInput!
) {
  categories(data: $data) {
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
    "concreteType": "Category",
    "kind": "LinkedField",
    "name": "categories",
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
    "id": "9c029d9eeba88719a2ec4eda2e6f1d8c",
    "metadata": {},
    "name": "CategoriesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '44a23aa48384eef3904ae581484afa88';
module.exports = node;

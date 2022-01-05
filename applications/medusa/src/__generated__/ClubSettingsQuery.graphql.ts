/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 8a38db8f1146856e5a6d7b6e996373f3 */

import { ConcreteRequest } from "relay-runtime";
export type ClubSettingsQueryVariables = {
    slug: string;
};
export type ClubSettingsQueryResponse = {
    readonly club: {
        readonly slug: string;
    } | null;
};
export type ClubSettingsQuery = {
    readonly response: ClubSettingsQueryResponse;
    readonly variables: ClubSettingsQueryVariables;
};



/*
query ClubSettingsQuery(
  $slug: String!
) {
  club(slug: $slug) {
    slug
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "ClubSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "8a38db8f1146856e5a6d7b6e996373f3",
    "metadata": {},
    "name": "ClubSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'c5328a8e6472be708276e7065f0edfb6';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 1dc71d4707357f3470380d573c6494ed */

import { ConcreteRequest } from "relay-runtime";
export type SelectClubsQueryVariables = {
    slug: string;
};
export type SelectClubsQueryResponse = {
    readonly club: {
        readonly slug: string;
    } | null;
};
export type SelectClubsQuery = {
    readonly response: SelectClubsQueryResponse;
    readonly variables: SelectClubsQueryVariables;
};



/*
query SelectClubsQuery(
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
    "name": "SelectClubsQuery",
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
    "name": "SelectClubsQuery",
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
    "id": "1dc71d4707357f3470380d573c6494ed",
    "metadata": {},
    "name": "SelectClubsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'd09889b462d89a63e681fe4a8fe23884';
export default node;

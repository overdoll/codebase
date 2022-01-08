/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 80fd39a7c74df6c30dae2d46258527ba */

import { ConcreteRequest } from "relay-runtime";
export type ClubHomeQueryVariables = {
    slug: string;
};
export type ClubHomeQueryResponse = {
    readonly club: {
        readonly name: string;
    } | null;
};
export type ClubHomeQuery = {
    readonly response: ClubHomeQueryResponse;
    readonly variables: ClubHomeQueryVariables;
};



/*
query ClubHomeQuery(
  $slug: String!
) {
  club(slug: $slug) {
    name
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
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubHomeQuery",
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
    "name": "ClubHomeQuery",
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
    "id": "80fd39a7c74df6c30dae2d46258527ba",
    "metadata": {},
    "name": "ClubHomeQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '7aa67f4e4beca70ab96545716540492b';
export default node;

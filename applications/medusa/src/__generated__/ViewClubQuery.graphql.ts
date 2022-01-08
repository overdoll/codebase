/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash cfb4aea99555226e2c867983cc672708 */

import { ConcreteRequest } from "relay-runtime";
export type ViewClubQueryVariables = {
    slug: string;
};
export type ViewClubQueryResponse = {
    readonly club: {
        readonly name: string;
    } | null;
};
export type ViewClubQuery = {
    readonly response: ViewClubQueryResponse;
    readonly variables: ViewClubQueryVariables;
};



/*
query ViewClubQuery(
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
    "name": "ViewClubQuery",
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
    "name": "ViewClubQuery",
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
    "id": "cfb4aea99555226e2c867983cc672708",
    "metadata": {},
    "name": "ViewClubQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'abac2ea50f697f9f31e82b00cd45c324';
export default node;

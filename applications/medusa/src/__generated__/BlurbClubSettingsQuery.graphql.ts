/**
 * @generated SignedSource<<9e706442e027c0caf91cdb01ebaf22be>>
 * @relayHash da3ad2fc9c67f2b5890e33e883961655
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID da3ad2fc9c67f2b5890e33e883961655

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BlurbClubSettingsQuery$variables = {
  slug: string;
};
export type BlurbClubSettingsQuery$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"ChangeClubBlurbFormFragment">;
  } | null;
};
export type BlurbClubSettingsQuery = {
  response: BlurbClubSettingsQuery$data;
  variables: BlurbClubSettingsQuery$variables;
};

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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BlurbClubSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeClubBlurbFormFragment"
          }
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
    "name": "BlurbClubSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
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
            "name": "blurb",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "da3ad2fc9c67f2b5890e33e883961655",
    "metadata": {},
    "name": "BlurbClubSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "13c84a2d5d39a8b8c0f340b3ead1bf45";

export default node;

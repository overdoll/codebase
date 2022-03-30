/**
 * @generated SignedSource<<fe47baac4599df9a27568d9d9ff1f632>>
 * @relayHash 603ca1bf6e641a74d200b5fdd7959a20
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 603ca1bf6e641a74d200b5fdd7959a20

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeClubNameQuery$variables = {
  slug: string;
};
export type ChangeClubNameQueryVariables = ChangeClubNameQuery$variables;
export type ChangeClubNameQuery$data = {
  readonly club: {
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ChangeClubNameFormFragment">;
  } | null;
};
export type ChangeClubNameQueryResponse = ChangeClubNameQuery$data;
export type ChangeClubNameQuery = {
  variables: ChangeClubNameQueryVariables;
  response: ChangeClubNameQuery$data;
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
    "name": "ChangeClubNameQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeClubNameFormFragment"
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
    "name": "ChangeClubNameQuery",
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
    "id": "603ca1bf6e641a74d200b5fdd7959a20",
    "metadata": {},
    "name": "ChangeClubNameQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "317659feaa77099e7b75b6b577af0439";

export default node;

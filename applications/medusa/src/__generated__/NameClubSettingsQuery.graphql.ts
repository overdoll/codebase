/**
 * @generated SignedSource<<5f88a63d75e04aaf79cb288790dbe45e>>
 * @relayHash 276f9fef59125ad01ecd84fdfb829c88
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 276f9fef59125ad01ecd84fdfb829c88

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NameClubSettingsQuery$variables = {
  slug: string;
};
export type NameClubSettingsQueryVariables = NameClubSettingsQuery$variables;
export type NameClubSettingsQuery$data = {
  readonly club: {
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ChangeClubNameFormFragment">;
  } | null;
};
export type NameClubSettingsQueryResponse = NameClubSettingsQuery$data;
export type NameClubSettingsQuery = {
  variables: NameClubSettingsQueryVariables;
  response: NameClubSettingsQuery$data;
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
    "name": "NameClubSettingsQuery",
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
    "name": "NameClubSettingsQuery",
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
    "id": "276f9fef59125ad01ecd84fdfb829c88",
    "metadata": {},
    "name": "NameClubSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "65c457639bf94998c17294bb6a7f5daf";

export default node;

/**
 * @generated SignedSource<<47bc5ec513534f28dd80cbf9eb8a60ab>>
 * @relayHash 9ab39a9618ed2b40cbc83ad6d985cb42
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9ab39a9618ed2b40cbc83ad6d985cb42

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubAliasesQuery$variables = {
  slug: string;
};
export type ClubAliasesQueryVariables = ClubAliasesQuery$variables;
export type ClubAliasesQuery$data = {
  readonly club: {
    readonly slug: string;
    readonly slugAliasesLimit: number;
    readonly slugAliases: ReadonlyArray<{
      readonly slug: string;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"ManageClubSlugAliasesFragment" | "AddClubSlugAliasFragment">;
  } | null;
};
export type ClubAliasesQueryResponse = ClubAliasesQuery$data;
export type ClubAliasesQuery = {
  variables: ClubAliasesQueryVariables;
  response: ClubAliasesQuery$data;
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
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slugAliasesLimit",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "ClubSlugAlias",
  "kind": "LinkedField",
  "name": "slugAliases",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubAliasesQuery",
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
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ManageClubSlugAliasesFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddClubSlugAliasFragment"
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
    "name": "ClubAliasesQuery",
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
          (v3/*: any*/),
          (v4/*: any*/),
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
    "id": "9ab39a9618ed2b40cbc83ad6d985cb42",
    "metadata": {},
    "name": "ClubAliasesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "8b28b15cf5a43ad8c514b32df5772b20";

export default node;

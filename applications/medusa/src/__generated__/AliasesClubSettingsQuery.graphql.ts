/**
 * @generated SignedSource<<9fd138343c775f6dc4aa20fb84ab9322>>
 * @relayHash 81ff3c7aef30c14da9f7aa1df29284da
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 81ff3c7aef30c14da9f7aa1df29284da

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AliasesClubSettingsQuery$variables = {
  slug: string;
};
export type AliasesClubSettingsQueryVariables = AliasesClubSettingsQuery$variables;
export type AliasesClubSettingsQuery$data = {
  readonly club: {
    readonly slug: string;
    readonly id: string;
    readonly slugAliasesLimit: number;
    readonly slugAliases: ReadonlyArray<{
      readonly slug: string;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"ManageClubSlugAliasesFragment" | "AddClubSlugAliasFragment">;
  } | null;
};
export type AliasesClubSettingsQueryResponse = AliasesClubSettingsQuery$data;
export type AliasesClubSettingsQuery = {
  variables: AliasesClubSettingsQueryVariables;
  response: AliasesClubSettingsQuery$data;
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slugAliasesLimit",
  "storageKey": null
},
v5 = {
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
    "name": "AliasesClubSettingsQuery",
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
          (v5/*: any*/),
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
    "name": "AliasesClubSettingsQuery",
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
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "81ff3c7aef30c14da9f7aa1df29284da",
    "metadata": {},
    "name": "AliasesClubSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "f161b1212134dfbce356fa7ec936ff0f";

export default node;
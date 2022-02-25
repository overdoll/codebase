/**
 * @generated SignedSource<<02197afc46288461482e2141da5d4429>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubAliasesFragment$data = {
  readonly slug: string;
  readonly slugAliasesLimit: number;
  readonly slugAliases: ReadonlyArray<{
    readonly __id: string;
    readonly slug: string;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"AddClubSlugAliasFragment" | "ManageClubSlugAliasesFragment">;
  readonly " $fragmentType": "ClubAliasesFragment";
};
export type ClubAliasesFragment = ClubAliasesFragment$data;
export type ClubAliasesFragment$key = {
  readonly " $data"?: ClubAliasesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubAliasesFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubAliasesFragment",
  "selections": [
    (v0/*: any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AddClubSlugAliasFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageClubSlugAliasesFragment"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slugAliasesLimit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubSlugAlias",
      "kind": "LinkedField",
      "name": "slugAliases",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "79706d183e0f31e97c014009407a3b24";

export default node;

/**
 * @generated SignedSource<<caa4b7f24b42c6422c3676e19e4bef6a>>
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
  readonly slugAliases: ReadonlyArray<{
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
      "concreteType": "ClubSlugAlias",
      "kind": "LinkedField",
      "name": "slugAliases",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "25c9e53a5c52d724475f9db85cf228ce";

export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClubAliasesFragment = {
    readonly slug: string;
    readonly slugAliases: ReadonlyArray<{
        readonly slug: string;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"AddClubSlugAliasFragment" | "ManageClubSlugAliasesFragment">;
    readonly " $refType": "ClubAliasesFragment";
};
export type ClubAliasesFragment$data = ClubAliasesFragment;
export type ClubAliasesFragment$key = {
    readonly " $data"?: ClubAliasesFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ClubAliasesFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AddClubSlugAliasFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageClubSlugAliasesFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();
(node as any).hash = '25c9e53a5c52d724475f9db85cf228ce';
export default node;

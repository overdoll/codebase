/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ManageClubSlugAliasesFragment = {
    readonly id: string;
    readonly slug: string;
    readonly slugAliases: ReadonlyArray<{
        readonly slug: string;
    }>;
    readonly " $refType": "ManageClubSlugAliasesFragment";
};
export type ManageClubSlugAliasesFragment$data = ManageClubSlugAliasesFragment;
export type ManageClubSlugAliasesFragment$key = {
    readonly " $data"?: ManageClubSlugAliasesFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ManageClubSlugAliasesFragment">;
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
  "name": "ManageClubSlugAliasesFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();
(node as any).hash = '9653bbe95b6a47d46fb35805caea7b12';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AddClubSlugAliasFragment = {
    readonly id: string;
    readonly slug: string;
    readonly slugAliases: ReadonlyArray<{
        readonly __typename: string;
    }>;
    readonly slugAliasesLimit: number;
    readonly " $refType": "AddClubSlugAliasFragment";
};
export type AddClubSlugAliasFragment$data = AddClubSlugAliasFragment;
export type AddClubSlugAliasFragment$key = {
    readonly " $data"?: AddClubSlugAliasFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AddClubSlugAliasFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddClubSlugAliasFragment",
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
      "name": "slug",
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slugAliasesLimit",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
(node as any).hash = '1961a61402df94890848debcd801e8db';
export default node;

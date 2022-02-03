/**
 * @generated SignedSource<<b2779b80c4745352ee064c7bd06e8d85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddClubSlugAliasFragment$data = {
  readonly id: string;
  readonly slug: string;
  readonly slugAliases: ReadonlyArray<{
    readonly __typename: string;
  }>;
  readonly slugAliasesLimit: number;
  readonly " $fragmentType": "AddClubSlugAliasFragment";
};
export type AddClubSlugAliasFragment = AddClubSlugAliasFragment$data;
export type AddClubSlugAliasFragment$key = {
  readonly " $data"?: AddClubSlugAliasFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddClubSlugAliasFragment">;
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

(node as any).hash = "1961a61402df94890848debcd801e8db";

export default node;

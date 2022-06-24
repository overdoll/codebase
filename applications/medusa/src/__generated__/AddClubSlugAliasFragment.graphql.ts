/**
 * @generated SignedSource<<08a55e6f6fbf3ee334d1f9bcac2058e6>>
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
  readonly " $fragmentType": "AddClubSlugAliasFragment";
};
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "4f851998905adff36bde147639e892cb";

export default node;

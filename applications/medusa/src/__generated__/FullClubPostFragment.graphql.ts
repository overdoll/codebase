/**
 * @generated SignedSource<<caeafef76da7d3ce1ffe0682b905f92d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullClubPostFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsFragment" | "PostGalleryPublicSimpleFragment" | "PostPrivateHeaderFragment">;
  readonly " $fragmentType": "FullClubPostFragment";
};
export type FullClubPostFragment$key = {
  readonly " $data"?: FullClubPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullClubPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullClubPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicSimpleFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostFooterButtonsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPrivateHeaderFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "3e286c12ce3c00a599045d211d90ce21";

export default node;

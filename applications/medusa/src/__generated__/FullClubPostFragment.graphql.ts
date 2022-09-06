/**
 * @generated SignedSource<<1652d41d24a351d304c4130b5ed61b7e>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsFragment" | "PostGalleryPublicSimpleFragment" | "PostPublicHeaderFragment">;
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
      "name": "PostPublicHeaderFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "f765eafa7e05a66c925925f2eed29e7d";

export default node;

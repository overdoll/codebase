/**
 * @generated SignedSource<<4ae5b319d52425ddda69c3233c7f482e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsFragment" | "PostGalleryPublicSimpleFragment" | "PostPublicHeaderFragment">;
  readonly " $fragmentType": "FullSimplePostFragment";
};
export type FullSimplePostFragment$key = {
  readonly " $data"?: FullSimplePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostFragment",
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

(node as any).hash = "4056ca8a04c63d8085f3a17354ae3631";

export default node;

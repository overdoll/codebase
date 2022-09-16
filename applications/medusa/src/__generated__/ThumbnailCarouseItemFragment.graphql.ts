/**
 * @generated SignedSource<<d4a66f321e358caac39eb8e8beab1daf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ThumbnailCarouseItemFragment$data = {
  readonly __typename: string;
  readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  readonly " $fragmentType": "ThumbnailCarouseItemFragment";
};
export type ThumbnailCarouseItemFragment$key = {
  readonly " $data"?: ThumbnailCarouseItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ThumbnailCarouseItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ThumbnailCarouseItemFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ThumbnailMediaFragment"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "Media",
  "abstractKey": "__isMedia"
};

(node as any).hash = "71dc3affba24d454e4a6d01575fdb6c4";

export default node;

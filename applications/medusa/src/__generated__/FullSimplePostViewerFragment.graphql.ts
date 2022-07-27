/**
 * @generated SignedSource<<842580cae6b4ff14f6c222137e916437>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsViewerFragment" | "PostGalleryPublicSimpleViewerFragment" | "PostPublicHeaderViewerFragment">;
  readonly " $fragmentType": "FullSimplePostViewerFragment";
};
export type FullSimplePostViewerFragment$key = {
  readonly " $data"?: FullSimplePostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicSimpleViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostFooterButtonsViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPublicHeaderViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "b028d703987fc41cab6678a6c468de28";

export default node;

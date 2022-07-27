/**
 * @generated SignedSource<<bdbe950773c30b889d0fb1afb7dfe052>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsViewerFragment" | "PostGalleryPublicDetailedViewerFragment" | "PostPublicHeaderViewerFragment">;
  readonly " $fragmentType": "FullDetailedPostViewerFragment";
};
export type FullDetailedPostViewerFragment$key = {
  readonly " $data"?: FullDetailedPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullDetailedPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullDetailedPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicDetailedViewerFragment"
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

(node as any).hash = "d77ca642daf83d2c429213f0a3ec9668";

export default node;

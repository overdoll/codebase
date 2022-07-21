/**
 * @generated SignedSource<<0703d4140af1c3971982fd0a52e34845>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsViewerFragment" | "PostGalleryPublicDetailedViewerFragment" | "PostHeaderViewerFragment">;
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
      "name": "PostHeaderViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicDetailedViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostFooterButtonsViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "faff20c46a9861bda62fe8fe9aaada7a";

export default node;

/**
 * @generated SignedSource<<c48a8044337e8ea4ff35ff2f18993680>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullClubPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsViewerFragment" | "PostGalleryPublicSimpleViewerFragment" | "PostPublicHeaderViewerFragment">;
  readonly " $fragmentType": "FullClubPostViewerFragment";
};
export type FullClubPostViewerFragment$key = {
  readonly " $data"?: FullClubPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullClubPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullClubPostViewerFragment",
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

(node as any).hash = "f6bc332466ee091cac93a7dc523335c8";

export default node;

/**
 * @generated SignedSource<<840f66bdd10ec0593e46f1b606dc96f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DescriptionPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsViewerFragment">;
  readonly " $fragmentType": "DescriptionPublicPostViewerFragment";
};
export type DescriptionPublicPostViewerFragment$key = {
  readonly " $data"?: DescriptionPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DescriptionPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DescriptionPublicPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostFooterButtonsViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "cc3c05ab73e81feebc8ee92aaedf7bfe";

export default node;

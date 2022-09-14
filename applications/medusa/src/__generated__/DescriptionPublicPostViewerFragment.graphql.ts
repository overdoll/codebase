/**
 * @generated SignedSource<<4d8085e691826d6783dce154b415d781>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DescriptionPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsViewerFragment" | "PostPublicHeaderViewerFragment">;
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

(node as any).hash = "01591e1043aac1e49ca47931a9fcd00f";

export default node;

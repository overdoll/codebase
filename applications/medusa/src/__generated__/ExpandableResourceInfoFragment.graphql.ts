/**
 * @generated SignedSource<<2146d6dd407d4a939cf9b8c922f6f949>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExpandableResourceInfoFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"InfoRawPostContentBannerFragment" | "MediaPreviewModalFragment">;
  readonly " $fragmentType": "ExpandableResourceInfoFragment";
};
export type ExpandableResourceInfoFragment$key = {
  readonly " $data"?: ExpandableResourceInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExpandableResourceInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExpandableResourceInfoFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InfoRawPostContentBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MediaPreviewModalFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "13b7251407cc43d3fca8fdd46583cf49";

export default node;

/**
 * @generated SignedSource<<49ac7684bf1c0f82333b098434c9ac98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicPostViewerFragment" | "DescriptionPublicPostViewerFragment" | "SuggestedPublicPostViewerFragment">;
  readonly " $fragmentType": "ContainerPublicPostViewerFragment";
};
export type ContainerPublicPostViewerFragment$key = {
  readonly " $data"?: ContainerPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerPublicPostViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DescriptionPublicPostViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SuggestedPublicPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "821d4d26a3823a9974c1eb4a8adbd249";

export default node;

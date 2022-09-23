/**
 * @generated SignedSource<<99a1ea41d43a318f48b6acac722b062e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicPostViewerFragment" | "DescriptionPublicPostViewerFragment">;
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "f2f18e311693cd30ec59b0b9c597ba07";

export default node;

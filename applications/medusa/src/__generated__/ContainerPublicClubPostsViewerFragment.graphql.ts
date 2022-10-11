/**
 * @generated SignedSource<<48d1efd52eddc4b8bb94096488d1ce6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubPostsViewerFragment" | "ScrollPublicClubPostsAccountFragment">;
  readonly " $fragmentType": "ContainerPublicClubPostsViewerFragment";
};
export type ContainerPublicClubPostsViewerFragment$key = {
  readonly " $data"?: ContainerPublicClubPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicClubPostsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerPublicClubPostsViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPublicClubPostsAccountFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "47d32f9aacf8e2e1adc41066b9a54bc6";

export default node;

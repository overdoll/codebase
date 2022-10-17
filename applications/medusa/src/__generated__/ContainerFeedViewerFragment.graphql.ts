/**
 * @generated SignedSource<<95f192343876dd367c524ceb0235ba14>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerFeedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CompleteFeedBannerFragment" | "HeaderFeedViewerFragment" | "ScrollPostsFeedFragment">;
  readonly " $fragmentType": "ContainerFeedViewerFragment";
};
export type ContainerFeedViewerFragment$key = {
  readonly " $data"?: ContainerFeedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerFeedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerFeedViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CompleteFeedBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HeaderFeedViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPostsFeedFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "be57299f17d0c8ab384b1333ebd0745d";

export default node;

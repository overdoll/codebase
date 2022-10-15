/**
 * @generated SignedSource<<8d84206f3b415437164fda0e9f056a39>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerLikesViewerFragment$data = {
  readonly hasClubSupporterSubscription: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPostsLikesFragment">;
  readonly " $fragmentType": "ContainerLikesViewerFragment";
};
export type ContainerLikesViewerFragment$key = {
  readonly " $data"?: ContainerLikesViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerLikesViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerLikesViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasClubSupporterSubscription",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPostsLikesFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "48dd61e19044b5f843657671557b4dfd";

export default node;

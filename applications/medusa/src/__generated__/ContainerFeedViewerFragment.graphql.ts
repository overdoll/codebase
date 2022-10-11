/**
 * @generated SignedSource<<96d07a41636245592717414385d03560>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerFeedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HeaderFeedViewerFragment" | "ScrollPostsFeedFragment">;
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

(node as any).hash = "b129d793d489d1b2fbcca91fe1123be0";

export default node;

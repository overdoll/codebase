/**
 * @generated SignedSource<<bc499dbd777b53821902472f8e6e04d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentLockedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentLockedButtonViewerFragment">;
  readonly " $fragmentType": "PostSupporterContentLockedViewerFragment";
};
export type PostSupporterContentLockedViewerFragment$key = {
  readonly " $data"?: PostSupporterContentLockedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentLockedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSupporterContentLockedViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostSupporterContentLockedButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "edd6190254cdca84c26f7b05744a5c36";

export default node;

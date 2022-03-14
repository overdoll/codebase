/**
 * @generated SignedSource<<e7ee515201d8ba79485038e1f12fc53d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubButtonViewerFragment">;
  readonly " $fragmentType": "PostHeaderViewerFragment";
};
export type PostHeaderViewerFragment = PostHeaderViewerFragment$data;
export type PostHeaderViewerFragment$key = {
  readonly " $data"?: PostHeaderViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinClubButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "70ead0bc9177c4e74cae47f6f9370f89";

export default node;

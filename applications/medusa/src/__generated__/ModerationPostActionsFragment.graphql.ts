/**
 * @generated SignedSource<<14cc1169309ee40a8a22209a4d9e13f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ModerationPostActionsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ModerationRemovePostFormFragment">;
  readonly " $fragmentType": "ModerationPostActionsFragment";
};
export type ModerationPostActionsFragment$key = {
  readonly " $data"?: ModerationPostActionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ModerationPostActionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ModerationPostActionsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ModerationRemovePostFormFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "3c0bd5250306b69f7f416ce8a5a91bba";

export default node;

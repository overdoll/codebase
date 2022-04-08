/**
 * @generated SignedSource<<c8b8577f62bd00626f4e04b69a2d4c68>>
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
export type ModerationPostActionsFragment = ModerationPostActionsFragment$data;
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

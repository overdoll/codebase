/**
 * @generated SignedSource<<cc7c26deb30c32313bf6b7c065eae6c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostFooterButtonsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostCopyLinkButtonFragment" | "PostLikeButtonFragment" | "PostMenuButtonFragment">;
  readonly " $fragmentType": "PostFooterButtonsFragment";
};
export type PostFooterButtonsFragment$key = {
  readonly " $data"?: PostFooterButtonsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostFooterButtonsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostMenuButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostCopyLinkButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "41c80ede024af80b9c22fefd7a35cb0b";

export default node;

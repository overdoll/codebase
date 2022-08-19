/**
 * @generated SignedSource<<ceda98dcd3f494621e93ce68de0ac5c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostFooterButtonsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostCopyLinkButtonFragment" | "PostLikeButtonFragment" | "PostMenuButtonFragment" | "PostShareDiscordButtonFragment" | "PostShareRedditButtonFragment" | "PostShareTwitterButtonFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostShareRedditButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostShareTwitterButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostShareDiscordButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "a1bc2c4ecd46f81d049ea609cdbeb505";

export default node;

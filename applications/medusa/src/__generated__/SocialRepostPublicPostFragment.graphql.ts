/**
 * @generated SignedSource<<11b4ebbee8682b9aa083f032b811b1f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SocialRepostPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostMenuButtonFragment" | "PostShareDiscordButtonFragment" | "PostShareRedditButtonFragment" | "PostShareTwitterButtonFragment">;
  readonly " $fragmentType": "SocialRepostPublicPostFragment";
};
export type SocialRepostPublicPostFragment$key = {
  readonly " $data"?: SocialRepostPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SocialRepostPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SocialRepostPublicPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostMenuButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostShareDiscordButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostShareTwitterButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostShareRedditButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "060e2091d5c64b6c7295773d6edd93f6";

export default node;

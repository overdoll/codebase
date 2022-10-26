/**
 * @generated SignedSource<<274a54ad254722de7d6523593d09dcc5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SharePublicClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubShareDiscordButtonFragment" | "ClubShareLinkButtonFragment" | "ClubShareRedditButtonFragment" | "ClubShareTwitterButtonFragment">;
  readonly " $fragmentType": "SharePublicClubFragment";
};
export type SharePublicClubFragment$key = {
  readonly " $data"?: SharePublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SharePublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SharePublicClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubShareLinkButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubShareTwitterButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubShareDiscordButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubShareRedditButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "fcbef3178fc813050e41e92a9bc0002e";

export default node;

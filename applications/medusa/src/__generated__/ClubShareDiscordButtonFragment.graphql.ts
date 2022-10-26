/**
 * @generated SignedSource<<fbbacd968400db897957411bf2e168eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubShareDiscordButtonFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "ClubShareDiscordButtonFragment";
};
export type ClubShareDiscordButtonFragment$key = {
  readonly " $data"?: ClubShareDiscordButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubShareDiscordButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubShareDiscordButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "ba3852b966bbc06a9957aef4aa8769f0";

export default node;

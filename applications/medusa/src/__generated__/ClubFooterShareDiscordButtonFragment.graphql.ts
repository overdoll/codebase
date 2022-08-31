/**
 * @generated SignedSource<<eb07eb059fe4e96a0412afd295697f53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubFooterShareDiscordButtonFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "ClubFooterShareDiscordButtonFragment";
};
export type ClubFooterShareDiscordButtonFragment$key = {
  readonly " $data"?: ClubFooterShareDiscordButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterShareDiscordButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubFooterShareDiscordButtonFragment",
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

(node as any).hash = "fdcb7b88787cb721b2b8297a8f195f87";

export default node;

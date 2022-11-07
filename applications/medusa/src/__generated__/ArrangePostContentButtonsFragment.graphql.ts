/**
 * @generated SignedSource<<3bb6e408bb70ac15dc8a237633f2f414>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangePostContentButtonsFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeDownPostContentButtonFragment" | "ArrangeFirstPostContentButtonFragment" | "ArrangeLastPostContentButtonFragment" | "ArrangeUpPostContentButtonFragment">;
  readonly " $fragmentType": "ArrangePostContentButtonsFragment";
};
export type ArrangePostContentButtonsFragment$key = {
  readonly " $data"?: ArrangePostContentButtonsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangePostContentButtonsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangePostContentButtonsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeUpPostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeDownPostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeFirstPostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeLastPostContentButtonFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "512c0c361c84b857095380e4220dda40";

export default node;

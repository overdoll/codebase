/**
 * @generated SignedSource<<5affd187efd81988dc985a2a71c5405e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullClubPostFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsFragment" | "PostPublicHeaderFragment" | "PreviewContentFragment">;
  readonly " $fragmentType": "FullClubPostFragment";
};
export type FullClubPostFragment$key = {
  readonly " $data"?: FullClubPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullClubPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullClubPostFragment",
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
      "name": "PreviewContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostFooterButtonsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPublicHeaderFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "d9ff94796451381f52be8de50333a2bb";

export default node;

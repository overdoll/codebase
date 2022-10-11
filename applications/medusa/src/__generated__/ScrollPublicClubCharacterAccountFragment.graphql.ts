/**
 * @generated SignedSource<<e27e1af05ee3d1ae311677aa89ec30a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollPublicClubCharacterAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsFiltersFragment">;
  readonly " $fragmentType": "ScrollPublicClubCharacterAccountFragment";
};
export type ScrollPublicClubCharacterAccountFragment$key = {
  readonly " $data"?: ScrollPublicClubCharacterAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPublicClubCharacterAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollPublicClubCharacterAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsFiltersFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "72b1df0d73d07cdc1bbab644bbb2a1d7";

export default node;

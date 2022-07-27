/**
 * @generated SignedSource<<d3f41b2e0126046b9efcabb24d4201d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LargeClubHeaderFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
  readonly " $fragmentType": "LargeClubHeaderFragment";
};
export type LargeClubHeaderFragment$key = {
  readonly " $data"?: LargeClubHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LargeClubHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubThumbnailFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "291a7596e8db318381bddd8eeac4752c";

export default node;

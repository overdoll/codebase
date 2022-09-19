/**
 * @generated SignedSource<<387883b07c25ada5e53171f0b4fc5b7d>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
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
      "name": "ClubIconFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "82a9165894278d21a0bcf22e5ac64f66";

export default node;

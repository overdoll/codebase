/**
 * @generated SignedSource<<ed019a603015abd74df46e96bbe53ea2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LargeClubHeaderFragment$data = {
  readonly id: string;
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
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "2a1c0adca0e1950c2c96971771ce2b43";

export default node;

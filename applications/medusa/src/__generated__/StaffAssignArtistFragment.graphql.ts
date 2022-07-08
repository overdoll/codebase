/**
 * @generated SignedSource<<f831011cc8fa3379369a4321192f447c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAssignArtistFragment$data = {
  readonly isArtist: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignArtistButtonFragment" | "StaffRevokeArtistButtonFragment">;
  readonly " $fragmentType": "StaffAssignArtistFragment";
};
export type StaffAssignArtistFragment$key = {
  readonly " $data"?: StaffAssignArtistFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignArtistFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAssignArtistFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isArtist",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffAssignArtistButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffRevokeArtistButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "a622bacc410cd914778e0f0221a9c98e";

export default node;

/**
 * @generated SignedSource<<63519879ee63c6a70e82287dac22040c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationProfileClubsButtonFragment$data = {
  readonly clubMembershipsCount: number;
  readonly " $fragmentType": "CurationProfileClubsButtonFragment";
};
export type CurationProfileClubsButtonFragment$key = {
  readonly " $data"?: CurationProfileClubsButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CurationProfileClubsButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurationProfileClubsButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsCount",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "3dbeb7a6b64745a1986e472a5d2dc295";

export default node;
